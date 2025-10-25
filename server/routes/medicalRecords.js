import express from 'express';
import MedicalRecord from '../models/MedicalRecord.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import NotificationService from '../services/notificationService.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('doctor', 'admin'), async (req, res) => {
  try {
    const { appointmentId, diagnosis, prescriptions, vitalSigns, labTests, notes, followUpDate } = req.body;

    const appointment = await Appointment.findById(appointmentId)
      .populate('doctor', 'user');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctor.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to create record for this appointment' });
    }

    const existingRecord = await MedicalRecord.findOne({ appointment: appointmentId });
    if (existingRecord) {
      return res.status(400).json({ message: 'Medical record already exists for this appointment' });
    }

    const medicalRecord = await MedicalRecord.create({
      patient: appointment.patient,
      doctor: appointment.doctor._id,
      appointment: appointmentId,
      diagnosis,
      prescriptions,
      vitalSigns,
      labTests,
      notes,
      followUpDate
    });

    await Appointment.findByIdAndUpdate(appointmentId, { status: 'completed' });

    try {
      const patient = await User.findById(appointment.patient);
      if (patient) {
        await NotificationService.sendMedicalRecordCreated(
          medicalRecord,
          { name: patient.name, email: patient.email }
        );
        console.log('✅ Medical record notification email sent');
      }
    } catch (emailError) {
      console.log('⚠️ Medical record email notification failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      data: medicalRecord,
      emailSent: true
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid medical record data' });
  }
});

router.get('/patient', protect, authorize('patient'), async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.user.id })
      .populate('doctor', 'user specialization')
      .populate('appointment', 'date timeSlot')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const records = await MedicalRecord.find({ doctor: doctor._id })
      .populate('patient', 'name email phone')
      .populate('appointment', 'date timeSlot')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('doctor', 'user specialization')
      .populate('patient', 'name email phone')
      .populate('appointment', 'date timeSlot symptoms');

    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    if (req.user.role === 'patient' && record.patient._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this record' });
    }

    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      if (!doctor || record.doctor._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this record' });
      }
    }

    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;