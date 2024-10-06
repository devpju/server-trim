import { Router } from "express";
import {
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

export default router;
