import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AppointmentsList from '../components/appointments/AppointmentsList';
import MedicalRecords from '../components/medical/MedicalRecords';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-8">
          Here's your health overview and upcoming appointments.
        </p>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Appointments & Medical Records */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointments Section */}
            <div className="card">
              <AppointmentsList />
            </div>
            
            {/* Medical Records Section */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Medical Records</h3>
              <MedicalRecords />
            </div>
          </div>

          {/* Sidebar - Quick Actions & Health Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/doctors" className="btn-primary w-full block text-center">
                  📅 Book New Appointment
                </a>
                <a href="/health-tips" className="btn-secondary w-full block text-center">
                  💡 Health Tips
                </a>
                <a href="/doctors" className="btn-secondary w-full block text-center">
                  👨‍⚕️ Find Doctors
                </a>
              </div>
            </div>

            {/* Health Status Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Health Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600">📅</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Active Appointments</p>
                    <p className="text-sm text-green-600">Manage your scheduled visits</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600">🏥</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Medical History</p>
                    <p className="text-sm text-blue-600">View your health records</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium text-purple-800">Feedback</p>
                    <p className="text-sm text-purple-600">Rate completed appointments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Tips Preview */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Health Tip of the Day</h3>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">💧 Stay Hydrated:</span> Drink at least 8 glasses of water daily to maintain proper hydration and support bodily functions.
                </p>
                <a href="/health-tips" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View more tips →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;