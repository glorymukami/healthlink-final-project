import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization'],
    enum: [
      'Cardiology',
      'Dermatology', 
      'Pediatrics',
      'Orthopedics',
      'Neurology',
      'Psychiatry',
      'Dentistry',
      'General Medicine',
      'Gynecology',
      'Ophthalmology'
    ]
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience'],
    min: [0, 'Experience cannot be negative']
  },
  qualifications: [{
    degree: String,
    university: String,
    year: Number
  }],
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  fees: {
    type: Number,
    required: [true, 'Please add consultation fees']
  },
  availableSlots: [{
    date: Date,
    startTime: String,
    endTime: String,
    isBooked: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 4.5
  },
  reviews: [{
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create index for better search performance
doctorSchema.index({ specialization: 1, rating: -1 });

export default mongoose.model('Doctor', doctorSchema);