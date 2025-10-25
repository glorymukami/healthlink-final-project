import express from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialization, search } = req.query;
    
    let query = {};
    
    // Filter by specialization
    if (specialization) {
      query.specialization = specialization;
    }
    
    // Search by doctor name
    if (search) {
      const users = await User.find({
        name: { $regex: search, $options: 'i' },
        role: 'doctor'
      });
      const userIds = users.map(user => user._id);
      query.user = { $in: userIds };
    }

    const doctors = await Doctor.find(query)
      .populate('user', 'name email phone avatar')
      .sort({ rating: -1 });

    res.json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public  
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('reviews.patient', 'name');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private (Doctor/Admin)
router.post('/', protect, authorize('doctor', 'admin'), async (req, res) => {
  try {
    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ user: req.user.id });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor profile already exists' });
    }

    const doctor = await Doctor.create({
      ...req.body,
      user: req.user.id
    });

    // Update user role to doctor if not already
    await User.findByIdAndUpdate(req.user.id, { role: 'doctor' });

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid doctor data' });
  }
});

export default router;