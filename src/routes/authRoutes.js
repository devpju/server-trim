import { Router } from "express";
import { register, verifyEmail } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);

export default router;
