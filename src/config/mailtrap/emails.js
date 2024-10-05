import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Xác thực Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationToken}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Lỗi gửi mã xác thực tới email: ${error}`);
  }
};

const sendWelcomeEmail = async (email, fullName) => {
  const recipient = [{ email }];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Đăng ký tài khoản thành công",
      html: WELCOME_EMAIL_TEMPLATE.replace("{fullName}", fullName),
      category: "Email Verification",
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Lỗi gửi mã xác thực tới email: ${error}`);
  }
};

export { sendVerificationEmail, sendWelcomeEmail };
