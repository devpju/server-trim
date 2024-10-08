import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrapClient.js';

const EMAIL_SUBJECTS = {
  VERIFICATION: 'Xác thực Email',
  WELCOME: 'Đăng ký tài khoản thành công',
};

const sendEmail = async (recipient, subject, htmlContent, category) => {
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: subject,
      html: htmlContent,
      category: category,
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(`Lỗi gửi email tới ${recipient[0].email}: ${error.message}`);
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationToken}', verificationToken);
  await sendEmail(recipient, EMAIL_SUBJECTS.VERIFICATION, htmlContent, 'Email Verification');
};

const sendWelcomeEmail = async (email, fullName) => {
  const recipient = [{ email }];
  const htmlContent = WELCOME_EMAIL_TEMPLATE.replace('{fullName}', fullName);
  await sendEmail(recipient, EMAIL_SUBJECTS.WELCOME, htmlContent, 'Email Welcome');
};

export { sendVerificationEmail, sendWelcomeEmail };
