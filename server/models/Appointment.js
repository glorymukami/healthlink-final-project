import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', 
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add appointment date']
  },
  timeSlot: {
    startTime: String,
    endTime: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  symptoms: {
    type: String,
    required: [true, 'Please describe your symptoms'],
    maxlength: [1000, 'Symptoms description too long']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes too long']
  },
  // Medical feedback after appointment
  diagnosis: String,
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    instructions: String
  }],
  labTests: [String],
  followUpDate: Date,
  // Patient feedback - ADDED THESE FIELDS
  patientRating: {
    type: Number,
    min: 1,
    max: 5
  },
  patientFeedback: {
    type: String,
    maxlength: [500, 'Feedback too long']
  },
  isRated: {
    type: Boolean,
    default: false
  },
  // Additional fields for better tracking
  appointmentType: {
    type: String,
    enum: ['consultation', 'follow-up', 'checkup', 'emergency'],
    default: 'consultation'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ date: 1 }); // For finding today's appointments

export default mongoose.model('Appointment', appointmentSchema);