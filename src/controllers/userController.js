import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra trong quá trình đăng ký." });
  }
};

export { register };
