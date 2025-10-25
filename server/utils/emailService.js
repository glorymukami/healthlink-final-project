import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

export const emailTemplates = {
  appointmentBooked: (appointment, user) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">🏥 HealthLink - Appointment Confirmation</h2>
      <p>Dear ${user.name},</p>
      <p>Your appointment has been successfully booked!</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Appointment Details:</h3>
        <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}</p>
        <p><strong>Status:</strong> <span style="color: #f59e0b;">${appointment.status}</span></p>
      </div>
      
      <p>Please arrive 10 minutes before your scheduled time.</p>
      <p>Best regards,<br>HealthLink Team</p>
    </div>
  `,

  appointmentConfirmed: (appointment, user) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">🏥 HealthLink - Appointment Confirmed</h2>
      <p>Dear ${user.name},</p>
      <p>Your appointment has been confirmed by the doctor!</p>
      
      <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Appointment Details:</h3>
        <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}</p>
        <p><strong>Status:</strong> <span style="color: #10b981;">Confirmed</span></p>
      </div>
      
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br>HealthLink Team</p>
    </div>
  `,

  medicalRecordCreated: (medicalRecord, user) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8b5cf6;">🏥 HealthLink - Medical Record Available</h2>
      <p>Dear ${user.name},</p>
      <p>Your medical record from your recent appointment is now available.</p>
      
      <div style="background: #faf5ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Record Summary:</h3>
        <p><strong>Diagnosis:</strong> ${medicalRecord.diagnosis}</p>
        <p><strong>Follow-up:</strong> ${medicalRecord.followUpDate ? new Date(medicalRecord.followUpDate).toLocaleDateString() : 'Not scheduled'}</p>
      </div>
      
      <p>Login to your account to view complete details.</p>
      <p>Best regards,<br>HealthLink Team</p>
    </div>
  `
};

export const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 Email credentials not set - skipping email send');
      return { success: true, skipped: true };
    }

    const mailOptions = {
      from: `"HealthLink" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default transporter;