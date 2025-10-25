 🏥 HealthLink - Medical Appointment System

A full-stack MERN application for healthcare management with appointment booking, medical records, and patient-doctor communication.

## 🚀 Features

- **User Authentication** - JWT-based auth with role management
- **Doctor Management** - Specialized profiles with filtering
- **Appointment System** - Booking, status updates, notifications
- **Medical Records** - Patient history, prescriptions, lab tests
- **Patient Feedback** - Rating and review system
- **Email Notifications** - Automated appointment reminders
- **RESTful API** - Well-documented endpoints

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs, Passport.js
- **Email**: Nodemailer
- **Environment**: Dotenv, CORS

## 📁 Project Structure
server/
├── models/ # MongoDB schemas
├── routes/ # API routes
├── middleware/ # Authentication
├── services/ # Business logic
├── utils/ # Utilities
└── server.js # Entry point

text

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/healthlink-final-project.git
cd healthlink-final-project/server
Install dependencies

bash
npm install
Environment setup

bash
cp .env.example .env
# Add your environment variables
Start development server

bash
npm run dev
📚 API Documentation
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

Doctors
GET /api/doctors - List all doctors

POST /api/doctors - Create doctor profile

Appointments
POST /api/appointments - Book appointment

GET /api/appointments/my-appointments - User's appointments

Medical Records
POST /api/medical-records - Create medical record

GET /api/medical-records/patient - Patient's records

🎯 Future Enhancements
React frontend development

Real-time chat with Socket.io

Video consultation integration

Payment gateway integration

Mobile app development

👥 Contributors
[Your Name] - Full-stack developer

📄 License
This project is licensed under the MIT License.

text

## 🚀 **FINAL PUSH COMMANDS**

Run these commands in order:

```bash
# 1. Check what will be committed
git status

# 2. Add all files
git add .

# 3. Commit with professional message
git commit -m "feat: Complete HealthLink healthcare platform backend

- Full user authentication system with JWT
- Doctor management with specializations
- Complete appointment booking workflow
- Medical records with prescriptions
- Patient feedback and rating system
- Email notification service
- RESTful API with comprehensive documentation
- MongoDB database with proper relationships
- Ready for production deployment"

# 4. Push to GitHub