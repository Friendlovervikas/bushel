import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= GET ALL STAFF =================

export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: {
        $in: [
  "admin",
  "subadmin",
  "delivery",
]
      },
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(staff);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET STAFF BY ID =================

export const getStaffById = async (
  req,
  res
) => {
  try {

    const staff = await User.findById(
      req.params.id
    ).select("-password");

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    if (
      ![
  "admin",
  "subadmin",
  "delivery",
].includes(staff.role)
    ) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.status(200).json(staff);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= CREATE STAFF =================

export const createStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Only allow staff roles
    if (
      ![
  "admin",
  "subadmin",
  "delivery",
].includes(role)
    ) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Check email
    const emailExists =
      await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check phone
    const phoneExists =
      await User.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create staff
    const staff =
      await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role,

        // Admin-created accounts are already verified
        isVerified: true,
      });

    res.status(201).json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      isVerified: staff.isVerified,
      createdAt: staff.createdAt,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= UPDATE STAFF =================

export const updateStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
    } = req.body;

    const staff = await User.findById(
      req.params.id
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    if (
      ![
  "admin",
  "subadmin",
  "delivery",
].includes(staff.role)
    ) {
      return res.status(400).json({
        message: "User is not staff",
      });
    }

    // Check email
    if (
      email &&
      email !== staff.email
    ) {
      const emailExists =
        await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    // Check phone
    if (
      phone &&
      phone !== staff.phone
    ) {
      const phoneExists =
        await User.findOne({ phone });

      if (phoneExists) {
        return res.status(400).json({
          message: "Phone number already exists",
        });
      }
    }

    staff.name = name || staff.name;
    staff.email = email || staff.email;
    staff.phone = phone || staff.phone;

    if (
      role &&
      [
  "admin",
  "subadmin",
  "delivery",
].includes(role)
    ) {
      staff.role = role;
    }

    const updatedStaff =
      await staff.save();

    res.status(200).json({
      _id: updatedStaff._id,
      name: updatedStaff.name,
      email: updatedStaff.email,
      phone: updatedStaff.phone,
      role: updatedStaff.role,
      isVerified:
        updatedStaff.isVerified,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE STAFF =================

export const deleteStaff = async (
  req,
  res
) => {
  try {

    const staff = await User.findById(
      req.params.id
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    if (
      ![
  "admin",
  "subadmin",
  "delivery",
].includes(staff.role)
    ) {
      return res.status(400).json({
        message: "User is not staff",
      });
    }

    await staff.deleteOne();

    res.status(200).json({
      message:
        "Staff deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= ACTIVATE / DEACTIVATE STAFF =================

export const toggleStaffStatus =
async (req, res) => {

  try {

    const staff = await User.findById(
      req.params.id
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    if (
      ![
  "admin",
  "subadmin",
  "delivery",
].includes(staff.role)
    ) {
      return res.status(400).json({
        message: "User is not staff",
      });
    }

    staff.isActive =
      !staff.isActive;

    await staff.save();

    res.status(200).json({
      message:
        `Staff ${
          staff.isActive
            ? "activated"
            : "deactivated"
        } successfully`,
      isActive:
        staff.isActive,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};