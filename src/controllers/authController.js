import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../config/mailtrap/emails.js';

dotenv.config();

const TOKEN_EXPIRATION_TIME = 10 * 60 * 1000; // 10 phút

const register = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Email đã được sử dụng.',
      });
    }

    const hashPassword = await hashUserPassword(password);
    const code = generateVerificationToken();

    const newUser = await createUser({
      fullName,
      email,
      hashPassword,
      verificationToken: code,
    });

    await sendVerificationEmail(newUser.email, code);

    const {
      password: _,
      verificationToken: __,
      verificationTokenExpiresAt: ___,
      isVerified: ____,
      ...userData
    } = newUser.toObject();

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký tài khoản thành công',
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Có lỗi xảy ra trong quá trình đăng ký.',
      details: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { code, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 400,
          message: `Không tìm thấy người dùng`,
        },
      });
    }

    if (user.verificationToken !== code) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 400,
          message: `Mã xác thực không đúng`,
        },
      });
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 400,
          message: `Mã này đã hết hạn. Vui lòng gửi lại yêu cầu khác`,
        },
      });
    }

    await confirmUser(user);
    generateTokenAndSetCookie(res, user._id);
    await sendWelcomeEmail(user.email, user.fullName);

    res.status(200).json({
      status: 'success',
      message: 'Xác thực tài khoản thành công',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Có lỗi xảy ra trong quá trình đăng ký.',
      details: error.message,
    });
  }
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 400,
          message: `Không tìm thấy người dùng`,
        },
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 400,
          message: `Tài khoản đã được xác thực`,
        },
      });
    }

    await resendVerificationToken(user);

    res.status(200).json({ status: 'success', message: 'Mã xác thực đã được gửi lại.' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Có lỗi xảy ra trong quá trình gửi lại mã xác thực',
      details: error.message,
    });
  }
};

const resendVerificationToken = async user => {
  const newVerificationToken = generateVerificationToken();
  user.verificationToken = newVerificationToken;
  user.verificationTokenExpiresAt = Date.now() + TOKEN_EXPIRATION_TIME;

  await user.save();
  await sendVerificationEmail(user.email, newVerificationToken);
};

// Helper functions
const hashUserPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const createUser = async ({ fullName, email, hashPassword, verificationToken }) => {
  const user = new User({
    fullName,
    email,
    password: hashPassword,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + TOKEN_EXPIRATION_TIME,
  });
  return await user.save();
};

const confirmUser = async user => {
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();
};

export { register, verifyEmail, resendVerificationEmail };
