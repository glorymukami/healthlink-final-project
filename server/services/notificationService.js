import { sendEmail, emailTemplates } from '../utils/emailService.js';
import User from '../models/User.js';

export const NotificationService = {
  async sendAppointmentBooked(appointment, patient) {
    const subject = '🏥 HealthLink - Appointment Booked Successfully';
    const html = emailTemplates.appointmentBooked(appointment, patient);
    return await sendEmail(patient.email, subject, html);
  },

  async sendAppointmentConfirmed(appointment, patient) {
    const subject = '🏥 HealthLink - Appointment Confirmed';
    const html = emailTemplates.appointmentConfirmed(appointment, patient);
    return await sendEmail(patient.email, subject, html);
  },

  async sendMedicalRecordCreated(medicalRecord, patient) {
    const subject = '🏥 HealthLink - Medical Record Available';
    const html = emailTemplates.medicalRecordCreated(medicalRecord, patient);
    return await sendEmail(patient.email, subject, html);
  }
};

export default NotificationService;