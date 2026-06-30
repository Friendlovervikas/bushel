import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ================= EMAIL VERIFICATION =================

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      default: "",
    },

    emailVerificationExpire: {
      type: Date,
    },

    // ================= RESET PASSWORD =================

    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpire: {
      type: Date,
    },

    // ================= ROLE =================

    role: {
      type: String,
      enum: [
        "user",
        "delivery",
        "subadmin",
        "admin",
      ],
      default: "user",
    },

    // ================= STAFF STATUS =================

    isActive: {
      type: Boolean,
      default: true,
    },

    // ================= PROFILE =================

    address: {
      type: String,
      default: "",
    },

    deliveryTime: {
      type: String,
      enum: ["Morning", "Evening"],
      default: "Morning",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;