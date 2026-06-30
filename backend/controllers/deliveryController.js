import Delivery from "../models/Delivery.js";
import Notification from "../models/Notification.js";
import { sendNotification } from "../socket.js";

// ================= GET ALL DELIVERIES =================

export const getDeliveries = async (
  req,
  res
) => {
  try {

    const deliveries =
      await Delivery.find()

        .populate(
          "userId",
          "name phone"
        )

        .populate(
          "deliveryBoy",
          "name phone"
        )

        .populate(
          "shopOwner",
          "name"
        )

        .populate("subscriptionId")

        .populate("orderId")

        .sort({
          deliveryDate: 1,
        });

    res.json(deliveries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// ================= ASSIGN DELIVERY BOY =================

export const assignDeliveryBoy =
async (req, res) => {

  try {

    const delivery =
      await Delivery.findById(
        req.params.id
      );

    if (!delivery) {

      return res.status(404).json({
        message:
          "Delivery not found",
      });

    }
delivery.deliveryBoy = req.body.deliveryBoy;

if (delivery.status === "Pending") {
  delivery.status = "Assigned";
}
    await delivery.save();
    const notification = await Notification.create({
  userId: delivery.userId,
  title: "Delivery Assigned",
  message: "Your delivery has been assigned to a delivery boy.",
  type: "Delivery",
});

sendNotification(delivery.userId, notification);

    res.json(delivery);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};
// ================= UPDATE DELIVERY STATUS =================

export const updateDeliveryStatus =
async (req, res) => {

  try {

    const delivery =
      await Delivery.findById(
        req.params.id
      );

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    delivery.status =
      req.body.status ||
      delivery.status;

    if (
      req.body.status ===
      "Delivered"
    ) {
      delivery.deliveredAt =
        new Date();
    }

    if (
      req.body.notes
    ) {
      delivery.notes =
        req.body.notes;
    }

    await delivery.save();

    const notification = await Notification.create({
      userId: delivery.userId,

      title: "Delivery Update",

      message:
        `Your delivery status is now "${delivery.status}".`,

      type: "Delivery",
    });

    sendNotification(
      delivery.userId,
      notification
    );

    res.json(delivery);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
export const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      deliveryBoy: req.user._id,
    })
      .populate("userId", "name phone email address")
      .populate({
        path: "subscriptionId",
        populate: {
          path: "planId",
          select: "name price",
        },
      })
      .sort({
        deliveryDate: 1,
        deliveryTime: 1,
      });

    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch deliveries",
    });
  }
};
// ================= CUSTOMER MY DELIVERIES =================

export const getCustomerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      userId: req.user._id,
    })
      .populate("deliveryBoy", "name phone")
      .populate({
        path: "subscriptionId",
        populate: {
          path: "planId",
          select: "name price",
        },
      })
      .sort({
        deliveryDate: -1,
      });

    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch deliveries",
    });
  }
};