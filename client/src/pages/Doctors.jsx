import React, { useState, useEffect } from 'react';
import BookAppointment from '../components/appointments/BookAppointment';
import { API_URL } from '../config/api.js';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/api/doctors`);
      const data = await response.json();
      
      console.log('Doctors API Response:', data);
      
      if (data.success) {
        setDoctors(data.data || []);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get doctor name based on specialization
  const getDoctorName = (doctor) => {
    if (doctor.user?.name) return doctor.user.name;
    
    // Default names based on specialization
    const names = {
      'pediatrics': 'Lisa Johnson',
      'dermatology': 'Maria Rodriguez',
      'cardiology': 'John Wilson',
      'default': 'Medical Specialist'
    };
    
    return names[doctor.specialization?.toLowerCase()] || names.default;
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleAppointmentBooked = (appointment) => {
    setShowBookingForm(false);
    setSelectedDoctor(null);
    console.log('Appointment booked:', appointment);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="card">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Doctors</h1>
        
        {/* Booking Modal */}
        {showBookingForm && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Book Appointment</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <BookAppointment 
                  doctor={selectedDoctor} 
                  onAppointmentBooked={handleAppointmentBooked}
                />
              </div>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => {
            const doctorName = getDoctorName(doctor);
            
            return (
              <div key={doctor._id} className="card text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Dr. {doctorName}</h3>
                <p className="text-medical-600 mb-2 capitalize">{doctor.specialization}</p>
                <p className="text-gray-600 text-sm mb-2">{doctor.experience} years experience</p>
                <p className="text-gray-800 font-semibold mb-4">${doctor.fees} consultation</p>
                
                {doctor.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
                )}
                
                <button 
                  onClick={() => handleBookAppointment(doctor)}
                  className="btn-primary w-full"
                >
                  Book Appointment
                </button>
              </div>
            );
          })}
        </div>

        {doctors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later or contact administration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;