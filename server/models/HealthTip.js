import mongoose from 'mongoose';

const healthTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [200, 'Title too long']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'nutrition',
      'exercise',
      'mental-health',
      'preventive-care',
      'chronic-diseases',
      'child-health',
      'women-health',
      'men-health',
      'senior-health'
    ]
  },
  targetAudience: {
    type: [String],
    enum: ['children', 'adults', 'seniors', 'pregnant-women', 'all'],
    default: ['all']
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number, // in minutes
    default: 3
  }
}, {
  timestamps: true
});

export default mongoose.model('HealthTip', healthTipSchema);