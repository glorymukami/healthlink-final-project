# HealthLink 🔗

## 🎯 Live Demo

🚀 **Live Application:** [https://glorymukami.github.io/healthlink-final-project/]  

**Frontend URL:** [https://healthlink-final-project-12kq.vercel.app/]  
**Backend API:** [https://healthlink-backend-lzm2.onrender.com]  
**Test Credentials:** [Patient: test.patient@healthlink.com / patient123

Doctor: test.doctor@healthlink.com / doctor123]

---

A comprehensive healthcare platform connecting patients with specialized doctors for seamless medical care management. HealthLink streamlines the entire patient journey from symptom checking to post-consultation follow-up.

## 🚀 Features

### Enhanced Patient Journey
1. **Register/Login** - Secure authentication with Google/GitHub OAuth
2. **Symptom Checker** - AI-powered symptom assessment
3. **Book Appointment** - Easy scheduling with specialized doctors
4. **Consultation** - Virtual or in-person appointments
5. **Medical Reports** - Digital prescription and report generation
6. **Feedback System** - Post-appointment reviews and ratings
7. **Health Guides** - Personalized wellness recommendations
8. **Progress Tracking** - Health metrics and appointment history

### Core Functionalities
- **Multi-role Dashboard** (Patient, Doctor, Admin)
- **Advanced Doctor Search** with filtering by specialization
- **Real-time Appointment Management**
- **Digital Medical Records**
- **Health Education Platform**
- **Prescription Tracking**
- **Secure Messaging System**

## 🛠️ Tech Stack

### Frontend
- **React** + Vite (Fast build tool)
- **Tailwind CSS** v4 (Modern styling)
- **Headless UI** (Accessible components)
- **React Router** (Navigation)
- **Axios** (API calls)
- **Context API** + useReducer (State management)

### Backend
- **Node.js** + Express.js (Server runtime)
- **MongoDB** + Mongoose (Database & ODM)
- **Passport.js** (OAuth authentication)
- **JWT** (Token-based authentication)
- **bcryptjs** (Password hashing)
- **CORS** (Cross-origin requests)

### Deployment
- **Vercel** (Frontend hosting)
- **Render/Railway** (Backend hosting)
- **MongoDB Atlas** (Cloud database)

## 📁 Project Structure
healthlink-final-project/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── contexts/ # Auth & App context
│ │ ├── pages/ # Route components
│ │ ├── utils/ # Helper functions
│ │ └── styles/ # Tailwind config
│ └── package.json
├── server/ # Express backend
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth & validation
│ ├── config/ # DB & passport config
│ └── package.json
└── README.md

text

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- GitHub OAuth app configured
- Google OAuth app configured

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/glorymukami/healthlink-final-project.git
cd healthlink-final-project
Backend Setup

bash
cd server
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Add your MongoDB URI, OAuth credentials, JWT secret
Frontend Setup

bash
cd ../client
npm install

# Create environment file
cp .env.example .env

# Configure API URL and other frontend variables
Environment Variables
Backend (.env)

env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
CLIENT_URL=http://localhost:3000
Frontend (.env)

env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
Running the Application
Start Backend Server

bash
cd server
npm run dev
Server runs on http://localhost:5000

Start Frontend Development Server

bash
cd client
npm run dev
Client runs on http://localhost:3000

📊 Database Schema
Key Models
Users - Base user model with role-based access

Patients - Extended patient profile

Doctors - Doctor specialization and availability

Appointments - Booking and consultation records

MedicalRecords - Digital health reports

HealthGuides - Wellness content and tips

SymptomsChecker - Symptom assessment data

🎯 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/google - Google OAuth

GET /api/auth/github - GitHub OAuth

GET /api/auth/logout - User logout

Appointments
GET /api/appointments - Get user appointments

POST /api/appointments - Book new appointment

PUT /api/appointments/:id - Update appointment status

DELETE /api/appointments/:id - Cancel appointment

Doctors
GET /api/doctors - List all doctors

GET /api/doctors/:id - Get doctor profile

POST /api/doctors/availability - Set doctor availability

🎨 UI/UX Features
Responsive Design - Mobile-first approach

Dark/Light Mode - Theme support

Accessible Components - WCAG compliant

Loading States - Enhanced user experience

Error Handling - User-friendly error messages

🚀 Deployment
Frontend (Vercel)
bash
cd client
npm run build
# Deploy to Vercel
Backend (Render/Railway)
Connect your GitHub repository

Set environment variables

Deploy automatically on push

🔐 Security Features
OAuth 2.0 integration

JWT Token authentication

Password hashing with bcrypt

CORS configuration

Input validation and sanitization

Role-based access control

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Glory Mukami - GitHub Profile

🙏 Acknowledgments
React and Express communities for excellent documentation

Tailwind CSS for the utility-first CSS framework

MongoDB for the flexible database solution

Vercel and Render for seamless deployment

<div align="center">
Built with ❤️ for better healthcare accessibility
</div> ```
Key improvements:

✅ Live Demo at the very top - First thing teachers/evaluators see

✅ Clear section separation with horizontal line

✅ Multiple demo links for frontend, backend, and test credentials

✅ Professional presentation while maintaining all technical details