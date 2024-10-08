import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import { sendVerificationEmail } from '../config/mailtrap/emailService.js';

dotenv.config();

const EXPIRATION_TIME = 10 * 60 * 1000;

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email này đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationToken();

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + EXPIRATION_TIME,
    });

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    const {
      password: _,
      verificationToken: __,
      verificationTokenExpiresAt: ___,
      isVerified,
      ...userData
    } = user._doc;

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác thực',
      data: userData,
    });
  } catch (error) {
    console.log();
    res.status(500).json({ status: 'error', message: 'Có lỗi xảy ra trong quá trình đăng ký' });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: `Không tồn tại người dùng có email ${email}` });
    }

    if (user.verificationToken !== verificationToken) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Mã xác thực không đúng. Vui lòng kiểm tra lại' });
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Mã xác thực đã hết hạn. Vui lòng gửi lại' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json({ status: 'success', message: 'Xác thực thành công' });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Có lỗi xảy ra trong quá trình xác thực', error });
  }
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: `Không tồn tại người dùng có email ${email}` });
    }

    if (user.isVerified) {
      return res.status(400).json({ status: 'error', message: 'Tài khoản đã được xác thực' });
    }

    user.verificationToken = generateVerificationToken();
    user.verificationTokenExpiresAt = Date.now() + EXPIRATION_TIME;

    await user.save();
    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ status: 'success', message: 'Mã xác thực đã được gửi lại' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra trong quá trình gửi lại mã xác thực',
      error,
    });
  }
};

export { register, verifyEmail, resendVerificationEmail };
