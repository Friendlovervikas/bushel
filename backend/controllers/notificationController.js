import Notification from "../models/Notification.js";

// ================= CREATE NOTIFICATION =================

export const createNotification = async (
  req,
  res
) => {
  try {
    const notification =
      await Notification.create(req.body);

    res.status(201).json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET ALL NOTIFICATIONS =================

export const getNotifications = async (
  req,
  res
) => {
  try {

    const notifications =
      await Notification.find()
        .populate("userId", "name email")
        .sort({
          createdAt: -1,
        });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET USER NOTIFICATIONS =================

export const getUserNotifications =
  async (req, res) => {
    try {

      const notifications =
        await Notification.find({
          userId: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(notifications);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

// ================= MARK AS READ =================

export const markAsRead = async (
  req,
  res
) => {
  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {
      return res.status(404).json({
        message:
          "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE NOTIFICATION =================

export const deleteNotification =
  async (req, res) => {
    try {

      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          message:
            "Notification not found",
        });
      }

      await notification.deleteOne();

      res.json({
        message:
          "Notification deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };