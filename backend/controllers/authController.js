import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const phoneExists = await User.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate Email Verification Token
const verifyToken = crypto
  .randomBytes(32)
  .toString("hex");

const hashedVerifyToken = crypto
  .createHash("sha256")
  .update(verifyToken)
  .digest("hex");

    const user = await User.create({
  name,
  email,
  phone,
  password: hashedPassword,

  emailVerificationToken:
    hashedVerifyToken,

  emailVerificationExpire:
    Date.now() + 24 * 60 * 60 * 1000,
});
const verifyUrl =
  `${process.env.FRONTEND_URL}/verify-email/${verifyToken}`;

const message = `
<h2>Welcome to Bushel 🌿</h2>

<p>Thank you for creating your account.</p>

<p>Please verify your email by clicking the button below.</p>

<a href="${verifyUrl}"
style="
background:#16a34a;
padding:12px 20px;
color:white;
text-decoration:none;
border-radius:8px;
display:inline-block;
">
Verify Email
</a>

<p>This link expires in 24 hours.</p>
`;

await sendEmail({
  email: user.email,
  subject: "Verify your Bushel Account",
  message,
});

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= LOGIN (Email OR Mobile) =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({
      $or: [
        { email },
        { phone: email },
      ],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email/mobile or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message:
          "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email/mobile or password",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= GOOGLE LOGIN =================

export const googleLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const googleUser = await response.json();

    const {
      name,
      email,
      picture,
      email_verified,
    } = googleUser;

    if (!email_verified) {
      return res.status(400).json({
        message: "Google account is not verified.",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
    name,
    email,
    phone: `google_${Date.now()}`,

    password: await bcrypt.hash(
        crypto.randomBytes(16).toString("hex"),
        10
    ),

    isVerified: true,
});
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      picture,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Google Login Failed",
    });

  }
};
// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({
  validateBeforeSave: false,
});

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Bushel Password Reset</h2>
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">
        ${resetUrl}
      </a>
      <br/><br/>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Bushel Password Reset",
      message,
    });

    res.json({
      message: "Password reset email sent successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset token is invalid or has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= VERIFY EMAIL =================
export const verifyEmail = async (req, res) => {
  try {

    const verifyToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: verifyToken,
      emailVerificationExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Verification link is invalid or has expired.",
      });
    }

    user.isVerified = true;

    user.emailVerificationToken = undefined;

    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};