import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  verifyEmail
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/google-login", googleLogin);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.get("/verify-email/:token", verifyEmail);

export default router;