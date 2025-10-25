import mongoose from 'mongoose';

const healthTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [200, 'Title too long']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [2000, 'Content too long']
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
      'first-aid'
    ]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('HealthTip', healthTipSchema);