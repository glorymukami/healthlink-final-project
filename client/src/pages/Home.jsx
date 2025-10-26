import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleLearnMore = () => {
    navigate('/health-tips');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">HealthLink</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your trusted healthcare platform connecting patients with specialized doctors for better medical care and healthier living.
          </p>
          <div className="space-x-4">
            <button 
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-3"
            >
              Get Started
            </button>
            <button 
              onClick={handleLearnMore}
              className="btn-secondary text-lg px-8 py-3"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-medical-600 text-3xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold mb-2">Find Specialized Doctors</h3>
            <p className="text-gray-600">Connect with qualified healthcare professionals across various specialties.</p>
          </div>
          
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-medical-600 text-3xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Easy Appointment Booking</h3>
            <p className="text-gray-600">Schedule your medical visits with just a few clicks, anytime anywhere.</p>
          </div>
          
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="text-medical-600 text-3xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">Health Education</h3>
            <p className="text-gray-600">Access comprehensive health tips and preventive care information.</p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">50+</div>
            <div className="text-gray-600">Doctors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">1,000+</div>
            <div className="text-gray-600">Patients Helped</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">98%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-6 opacity-90">Join thousands of satisfied patients today.</p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Start Your Health Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;