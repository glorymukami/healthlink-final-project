import React, { useState, useEffect } from 'react';
import FeedbackModal from '../feedback/FeedbackModal';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/appointments/my-appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      const data = await response.json();
      
      if (data.success) {
        const doctorsMap = {};
        data.data.forEach(doctor => {
          doctorsMap[doctor._id] = doctor;
        });
        setDoctors(doctorsMap);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoctorInfo = (appointment) => {
    const doctorId = appointment.doctor?._id || appointment.doctor;
    
    if (doctors[doctorId]) {
      return {
        name: doctors[doctorId].user?.name || 'Doctor',
        specialization: doctors[doctorId].specialization || 'General Medicine'
      };
    }
    
    if (appointment.doctor?.user?.name) {
      return {
        name: appointment.doctor.user.name,
        specialization: appointment.doctor.specialization || 'General Medicine'
      };
    }
    
    return {
      name: 'Doctor',
      specialization: 'General Medicine'
    };
  };

  const handleFeedbackClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmitted = () => {
    fetchAppointments(); // Refresh the list
    alert('Thank you for your feedback! Your rating has been submitted.');
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="card mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          appointment={selectedAppointment}
          onClose={() => setShowFeedbackModal(false)}
          onFeedbackSubmitted={handleFeedbackSubmitted}
        />
      )}

      <h3 className="text-lg font-semibold mb-4">Your Appointments</h3>
      
      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments scheduled yet.</p>
          <a href="/doctors" className="btn-primary mt-4 inline-block">Book Your First Appointment</a>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map(appointment => {
            const doctorInfo = getDoctorInfo(appointment);
            const canGiveFeedback = appointment.status === 'completed' && !appointment.isRated;
            
            return (
              <div key={appointment._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      Dr. {doctorInfo.name}
                    </h4>
                    <p className="text-medical-600 capitalize font-medium">
                      {doctorInfo.specialization}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(appointment.date)} 
                      {appointment.timeSlot?.startTime && (
                        <span className="text-medical-600"> at {appointment.timeSlot.startTime}</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Symptoms</p>
                    <p className="font-medium text-gray-900">{appointment.symptoms}</p>
                  </div>
                </div>

                {/* Feedback Button - ALWAYS SHOW FOR TESTING */}
                <div className="flex justify-between items-center text-sm pt-3 border-t">
                  <span className="text-gray-500 text-xs">
                    ID: {appointment._id.slice(-6)} | Status: {appointment.status}
                  </span>
                  
                  <button 
                    onClick={() => handleFeedbackClick(appointment)}
                    disabled={!canGiveFeedback}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      canGiveFeedback 
                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canGiveFeedback ? 'Give Feedback' : 'Feedback Closed'}
                  </button>
                </div>

                {/* Help Text */}
                {!canGiveFeedback && appointment.status !== 'completed' && (
                  <p className="text-xs text-gray-500 mt-2">
                    Feedback available after appointment is completed
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
