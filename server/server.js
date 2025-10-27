import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enhanced CORS for production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://healthlink-final-project-12kq.vercel.app',  // ← YOUR EXACT URL
    'https://healthlink-final-project-3v61dgkls-glory-mukamis-projects.vercel.app',
    'https://healthlink-final-project.vercel.app',
    'https://healthlink-glory.vercel.app',
    'https://healthlink-mukami.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());

// Import routes (ONLY THE ONES THAT EXIST)
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import medicalRecordRoutes from './routes/medicalRecords.js';

// Routes middleware (ONLY THE ONES THAT EXIST)
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🏥 HealthLink Backend API is running!',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: {
      authentication: 'JWT with role-based access',
      appointments: 'Booking, status updates, feedback',
      medicalRecords: 'Patient history, prescriptions, lab tests',
      doctors: 'Specialized profiles with filtering and ratings'
    },
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        test: 'GET /api/auth/test'
      },
      doctors: {
        list: 'GET /api/doctors',
        single: 'GET /api/doctors/:id',
        create: 'POST /api/doctors'
      },
      appointments: {
        create: 'POST /api/appointments',
        myAppointments: 'GET /api/appointments/my-appointments',
        single: 'GET /api/appointments/:id',
        updateStatus: 'PUT /api/appointments/:id/status',
        updateMedical: 'PUT /api/appointments/:id/medical',
        feedback: 'POST /api/appointments/:id/feedback'
      },
      medicalRecords: {
        create: 'POST /api/medical-records',
        patientRecords: 'GET /api/medical-records/patient',
        doctorRecords: 'GET /api/medical-records/doctor',
        single: 'GET /api/medical-records/:id'
      }
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ OK', 
    service: 'HealthLink API',
    version: '2.0.0',
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)} seconds`,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test route for auth
app.get('/api/auth/test', (req, res) => {
  res.json({ 
    message: '✅ Auth routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Simple 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: '❌ Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/doctors',
      'POST /api/appointments'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
    timestamp: new Date().toISOString()
  });
});

// Enhanced Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthlink';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'healthlink'}`);
  })
  .catch(err => {
    console.log('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                🏥 HEALTHLINK API v2.0.0               ║
║                 Medical Platform Backend              ║
╚═══════════════════════════════════════════════════════╝

🚀 Server running on port ${PORT}
📍 Local: http://localhost:${PORT}
🌐 Network: http://0.0.0.0:${PORT}
📊 Health: http://localhost:${PORT}/api/health

🔐 AUTHENTICATION
   Register: POST http://localhost:${PORT}/api/auth/register
   Login:    POST http://localhost:${PORT}/api/auth/login

👨‍⚕️ DOCTORS
   List:     GET http://localhost:${PORT}/api/doctors
   Create:   POST http://localhost:${PORT}/api/doctors

📅 APPOINTMENTS  
   Book:     POST http://localhost:${PORT}/api/appointments
   My Apps:  GET http://localhost:${PORT}/api/appointments/my-appointments

🏥 MEDICAL RECORDS
   Create:   POST http://localhost:${PORT}/api/medical-records
   Patient:  GET http://localhost:${PORT}/api/medical-records/patient

🔄 Mode: ${process.env.NODE_ENV || 'development'}
⏰ Started: ${new Date().toLocaleString()}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    console.log('💤 Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    console.log('💤 Process terminated');
    process.exit(0);
  });
});