import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import Delivery from "../models/Delivery.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket.js";

// ================= CREATE SUBSCRIPTION =================

export const createSubscription = async (req, res) => {
  try {

    const {
      planId,
      paymentId,
      deliveryAddress,
      deliveryTime,
      autoRenew,
      notes,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const plan = await Plan.findById(planId);
    console.log("========== PLAN ==========");
console.log(plan);
console.log("plan.duration =", plan?.duration);
console.log("typeof =", typeof plan?.duration);
console.log("==========================");

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

const startDate = new Date();

console.log("Plan:", plan);
console.log("Duration:", plan.duration);
console.log("Type:", typeof plan.duration);

const duration = Number(plan.duration);

if (!Number.isFinite(duration) || duration <= 0) {
  return res.status(400).json({
    message: "Invalid plan duration",
    duration: plan.duration,
  });
}

const endDate = new Date(startDate);

endDate.setDate(
  endDate.getDate() + duration
);

console.log("Start Date:", startDate);
console.log("End Date:", endDate);

    const subscription =
      await Subscription.create({
        userId: req.user._id,
        planId,
        paymentId,

        startDate,
        endDate,

        deliveryAddress:
          deliveryAddress ||
          user.address,

        deliveryTime:
          deliveryTime ||
          user.deliveryTime,

        autoRenew:
          autoRenew || false,

        notes,

        status: "Active",
      });

    const deliveries = [];

    for (
      let i = 0;
      i < plan.duration;
      i++
    ) {
      const deliveryDate = new Date(startDate);

      deliveryDate.setDate(
        startDate.getDate() + i
      );

      deliveries.push({
        userId: req.user._id,
        subscriptionId:
          subscription._id,

        deliveryDate,

        deliveryAddress:
          subscription.deliveryAddress,

        deliveryTime:
          subscription.deliveryTime,

        status: "Pending",
      });
    }

    await Delivery.insertMany(deliveries);

    const notification = await Notification.create({
      userId: req.user._id,

      title:
        "Subscription Activated",

      message:
        `${plan.name} subscription activated successfully.`,

      type: "Subscription",
    });

    sendNotification(
      req.user._id,
      notification
    );

    res.status(201).json(
      subscription
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET ALL SUBSCRIPTIONS =================

export const getSubscriptions =
async (req, res) => {

  try {

    const subscriptions =
      await Subscription.find()

        .populate(
          "userId",
          "name email phone"
        )

        .populate("planId")

        .populate("paymentId")

        .sort({
          createdAt: -1,
        });

    res.json(subscriptions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= GET SINGLE SUBSCRIPTION =================

export const getSubscriptionById =
async (req, res) => {

  try {

    const subscription =
      await Subscription.findById(
        req.params.id
      )

        .populate("userId")

        .populate("planId")
        

        .populate("paymentId");

    if (!subscription) {

      return res.status(404).json({
        message:
          "Subscription not found",
      });

    }

    res.json(subscription);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// ================= MY SUBSCRIPTIONS =================

export const getMySubscriptions = async (
  req,
  res
) => {
  try {

    const subscriptions =
      await Subscription.find({
        userId: req.user._id,
      })
        .populate("planId")
        .populate("paymentId")
        .sort({
          createdAt: -1,
        });

    res.json(subscriptions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= RENEW SUBSCRIPTION =================

export const renewSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(
      req.params.id
    )
      .populate("planId")
      .populate("userId");

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    // Customer can renew only their own subscription
    if (
      req.user.role !== "admin" &&
      subscription.userId._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

 // Extend subscription

const today = new Date();

const currentEndDate = new Date(
  subscription.endDate
);

const renewFrom =
  currentEndDate > today
    ? currentEndDate
    : today;

const duration = Number(
  subscription.planId.duration
);

if (
  !Number.isFinite(duration) ||
  duration <= 0
) {
  return res.status(400).json({
    message: "Invalid plan duration",
  });
}

const newEndDate = new Date(
  renewFrom
);

newEndDate.setDate(
  newEndDate.getDate() + duration
);

subscription.endDate = newEndDate;
subscription.status = "Active";
subscription.isPaused = false;

await subscription.save();

    // Create new deliveries
    const deliveries = [];

   for (
  let i = 0;
  i < duration;
  i++
)  {
      const deliveryDate = new Date(renewFrom);

      deliveryDate.setDate(
        deliveryDate.getDate() + i + 1
      );

      deliveries.push({
        userId: subscription.userId._id,
        subscriptionId: subscription._id,
        deliveryDate,
        deliveryAddress:
          subscription.deliveryAddress,
        deliveryTime:
          subscription.deliveryTime,
        status: "Pending",
      });
    }

    await Delivery.insertMany(deliveries);

    const notification =
      await Notification.create({
        userId: subscription.userId._id,
        title: "Subscription Renewed",
        message: `${subscription.planId.name} subscription renewed successfully.`,
        type: "Subscription",
      });

    sendNotification(
      subscription.userId._id,
      notification
    );

    res.json({
      message:
        "Subscription renewed successfully",
      subscription,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// ================= PAUSE SUBSCRIPTION =================

export const pauseSubscription = async (
  req,
  res
) => {
  try {

    const subscription =
      await Subscription.findById(
        req.params.id
      );

    if (!subscription) {
      return res.status(404).json({
        message:
          "Subscription not found",
      });
    }

    subscription.status = "Paused";
    subscription.isPaused = true;

    await subscription.save();

    await Delivery.updateMany(
      {
        subscriptionId:
          subscription._id,
        status: "Pending",
      },
      {
        status: "Paused",
      }
    );

    await Notification.create({
      userId:
        subscription.userId,
      title:
        "Subscription Paused",
      message:
        "Your subscription has been paused.",
      type:
        "Subscription",
    });

    res.json({
      message:
        "Subscription paused successfully.",
      subscription,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

// ================= RESUME SUBSCRIPTION =================

export const resumeSubscription =
async (req, res) => {

  try {

    const subscription =
      await Subscription.findById(
        req.params.id
      );

    if (!subscription) {
      return res.status(404).json({
        message:
          "Subscription not found",
      });
    }

    subscription.status = "Active";
    subscription.isPaused = false;

    await subscription.save();

    await Delivery.updateMany(
      {
        subscriptionId:
          subscription._id,
        status: "Paused",
      },
      {
        status: "Pending",
      }
    );

    await Notification.create({
      userId:
        subscription.userId,
      title:
        "Subscription Resumed",
      message:
        "Your subscription has been resumed.",
      type:
        "Subscription",
    });

    res.json({
      message:
        "Subscription resumed successfully.",
      subscription,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

// ================= CANCEL SUBSCRIPTION =================

export const cancelSubscription =
async (req, res) => {

  try {

    const subscription =
      await Subscription.findById(
        req.params.id
      );

    if (!subscription) {
      return res.status(404).json({
        message:
          "Subscription not found",
      });
    }

    subscription.status =
      "Cancelled";

    subscription.isPaused =
      false;

    await subscription.save();

    await Delivery.updateMany(
      {
        subscriptionId:
          subscription._id,
        status: {
          $in: [
            "Pending",
            "Paused",
          ],
        },
      },
      {
        status:
          "Cancelled",
      }
    );

    await Notification.create({
      userId:
        subscription.userId,
      title:
        "Subscription Cancelled",
      message:
        "Your subscription has been cancelled successfully.",
      type:
        "Subscription",
    });

    res.json({
      message:
        "Subscription cancelled successfully.",
      subscription,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};