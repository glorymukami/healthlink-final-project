import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api.js';  // ADD THIS IMPORT

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/medical-records/patient`, {  // CHANGED THIS LINE
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setRecords(data.data);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        {[1, 2].map(i => (
          <div key={i} className="card mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Medical Records</h3>
      
      {records.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No medical records available yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Your medical records will appear here after doctor consultations.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map(record => (
            <div key={record._id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">
                    Consultation with Dr. {record.doctor?.user?.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {record.doctor?.specialization}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
                <p className="font-medium">{record.diagnosis}</p>
              </div>

              {record.prescriptions && record.prescriptions.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Prescriptions</p>
                  <div className="space-y-2">
                    {record.prescriptions.map((prescription, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">{prescription.medicine}</p>
                        <p className="text-sm text-gray-600">
                          {prescription.dosage} - {prescription.frequency} for {prescription.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {record.followUpDate && (
                <div className="mt-4 pt-3 border-t">
                  <p className="text-sm text-gray-600">Follow-up Date</p>
                  <p className="font-medium">
                    {new Date(record.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;