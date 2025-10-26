import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const FeedbackModal = ({ appointment, onClose, onFeedbackSubmitted }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Rate Your Appointment</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">Appointment with Dr. {appointment.doctor?.user?.name || 'Doctor'}</p>
            <p className="text-sm text-gray-600">
              {new Date(appointment.date).toLocaleDateString()} at {appointment.timeSlot?.startTime}
            </p>
          </div>

          <FeedbackForm 
            appointmentId={appointment._id}
            onFeedbackSubmitted={() => {
              onFeedbackSubmitted();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;