import React, { useState } from 'react';
import { API_URL } from '../../config/api.js';  // ADD THIS IMPORT

const FeedbackForm = ({ appointmentId, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/appointments/${appointmentId}/feedback`, {  // CHANGED THIS LINE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: rating,
          feedback: feedback
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your feedback!');
        setRating(0);
        setFeedback('');
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted(data.data);
        }
      } else {
        alert(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate your appointment?
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Selected: {rating} star{rating !== 1 ? 's' : ''}
          </p>
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            id="feedback"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="input-field"
            placeholder="Share your experience with the doctor..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting || rating === 0}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting Feedback...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;