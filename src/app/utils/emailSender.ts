import nodemailer from 'nodemailer';
import config from '../config';

const to = config.email_sender.email;
// with date and exat time
const subject = `VisaVibe Notification -  ${new Date().toLocaleString()}`;
// Email template generator
const generateEmailTemplate = (bodyContent: string) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://cdn-icons-png.flaticon.com/512/2972/2972785.png" alt="VisaVibe Logo" style="height: 50px;" />
        <h1 style="margin: 0; font-size: 24px;">VisaVibe</h1>
        <p style="color: #1447E6; font-weight: 500; margin-top: 4px;">Your Trusted Study Visa Partner</p>
      </div>

      <div style="font-size: 16px; line-height: 1.6;">
        ${bodyContent}
      </div>

      <br/>
      <p style="font-size: 14px;">Kind regards,<br/><strong>The VisaVibe Team</strong></p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        This is an automated message from VisaVibe. Please do not reply to this email.
      </p>
    </div>
  `;
};

// Main email sender function
export const EmailSender = async (bodyContent: string) => {
  console.log('Sending email with content:', bodyContent);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email_sender.email,
      pass: config.email_sender.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const html = generateEmailTemplate(bodyContent);

  const info = await transporter.sendMail({
    from: `"VisaVibe" <${config.email_sender.email}>`,
    to,
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
};
