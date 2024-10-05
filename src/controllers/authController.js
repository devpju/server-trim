import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateVerificationToken from "../utils/generateVerificationToken.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import sendVerificationEmail from "../config/mailtrap/emails.js";

dotenv.config();

const register = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateVerificationToken();

    const user = new User({
      fullName,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 3600 * 1000,
    });
    console.log(user);
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    const { password: _, ...userData } = user.toObject();
    res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Có lỗi xảy ra trong quá trình đăng ký." });
  }
};

export { register };
