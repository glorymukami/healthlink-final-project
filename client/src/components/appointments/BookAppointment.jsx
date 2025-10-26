import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const BookAppointment = ({ doctor, onAppointmentBooked }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !symptoms) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          doctorId: doctor._id,
          date: selectedDate,
          timeSlot: {
            startTime: selectedTime,
            endTime: `${parseInt(selectedTime.split(':')[0]) + 1}:00`
          },
          symptoms: symptoms
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        setSelectedDate('');
        setSelectedTime('');
        setSymptoms('');
        if (onAppointmentBooked) {
          onAppointmentBooked(data.data);
        }
      } else {
        alert(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Book Appointment with Dr. {doctor.user.name}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Date
          </label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select a time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms Description
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="input-field"
            rows="4"
            placeholder="Describe your symptoms..."
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;