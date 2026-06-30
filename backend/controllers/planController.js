import Plan from "../models/Plan.js";

// ================= GET ALL PLANS =================
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(plans);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET SINGLE PLAN =================
export const getPlanById = async (req, res) => {
  try {

    const plan = await Plan.findById(req.params.id)
      .populate("createdBy", "name role");

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.status(200).json(plan);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= CREATE PLAN =================
export const createPlan = async (req, res) => {
  try {

    const {
      name,
      description,
      category,
      image,
      price,
      offerPrice,
      duration,
      deliveryTime,
      features,
      status,
    } = req.body;

    const plan = await Plan.create({
      name,
      description,
      category,
      image,
      price,
      offerPrice,
      duration,
      deliveryTime,
      features,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(plan);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= UPDATE PLAN =================
export const updatePlan = async (req, res) => {
  try {

    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    plan.name = req.body.name || plan.name;
    plan.description =
      req.body.description || plan.description;
    plan.category =
      req.body.category || plan.category;
    plan.image =
      req.body.image || plan.image;
    plan.price =
      req.body.price || plan.price;
    plan.offerPrice =
      req.body.offerPrice ?? plan.offerPrice;
    plan.duration =
      req.body.duration || plan.duration;
    plan.deliveryTime =
      req.body.deliveryTime || plan.deliveryTime;
    plan.features =
      req.body.features || plan.features;
    plan.status =
      req.body.status || plan.status;

    const updatedPlan = await plan.save();

    res.status(200).json(updatedPlan);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE PLAN =================
export const deletePlan = async (req, res) => {
  try {

    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      message: "Plan deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};