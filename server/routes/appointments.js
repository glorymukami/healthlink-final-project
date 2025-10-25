import express from 'express';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import NotificationService from '../services/notificationService.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, symptoms, notes, appointmentType, priority } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      symptoms,
      notes: notes || '',
      appointmentType: appointmentType || 'consultation',
      priority: priority || 'medium'
    });

    await appointment.populate('doctor', 'user specialization fees');
    await appointment.populate('patient', 'name email phone');

    try {
      await NotificationService.sendAppointmentBooked(
        appointment, 
        { name: req.user.name, email: req.user.email }
      );
      console.log('✅ Appointment confirmation email sent');
    } catch (emailError) {
      console.log('⚠️ Email notification failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      data: appointment,
      emailSent: true
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid appointment data' });
  }
});

router.get('/my-appointments', protect, async (req, res) => {
  try {
    let appointments;
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (req.user.role === 'patient') {
      query.patient = req.user.id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      query.doctor = doctor._id;
    }

    if (status) {
      query.status = status;
    }

    appointments = await Appointment.find(query)
      .populate('doctor', 'user specialization fees')
      .populate('patient', 'name email phone')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      count: appointments.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/status', protect, authorize('doctor', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'user');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctor.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    const oldStatus = appointment.status;
    appointment.status = status;
    await appointment.save();

    await appointment.populate('patient', 'name email phone');

    if (status === 'confirmed' && oldStatus !== 'confirmed') {
      try {
        await NotificationService.sendAppointmentConfirmed(
          appointment, 
          { name: appointment.patient.name, email: appointment.patient.email }
        );
        console.log('✅ Appointment confirmation email sent');
      } catch (emailError) {
        console.log('⚠️ Email notification failed:', emailError.message);
      }
    }

    res.json({
      success: true,
      data: appointment,
      emailSent: status === 'confirmed'
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid status update' });
  }
});

router.post('/:id/feedback', protect, authorize('patient'), async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to rate this appointment' });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed appointments' });
    }

    if (appointment.isRated) {
      return res.status(400).json({ message: 'Appointment already rated' });
    }

    appointment.patientRating = rating;
    appointment.patientFeedback = feedback;
    appointment.isRated = true;

    await appointment.save();

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid feedback data' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'user specialization fees bio')
      .populate('patient', 'name email phone dateOfBirth gender');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (req.user.role === 'patient' && appointment.patient._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }

    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      if (!doctor || appointment.doctor._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this appointment' });
      }
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/medical', protect, authorize('doctor', 'admin'), async (req, res) => {
  try {
    const { diagnosis, prescription, labTests, followUpDate } = req.body;
    
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'user');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctor.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    if (diagnosis) appointment.diagnosis = diagnosis;
    if (prescription) appointment.prescription = prescription;
    if (labTests) appointment.labTests = labTests;
    if (followUpDate) appointment.followUpDate = followUpDate;

    await appointment.save();

    await appointment.populate('patient', 'name email phone');

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid medical data' });
  }
});

export default router;