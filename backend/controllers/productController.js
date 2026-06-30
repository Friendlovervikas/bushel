import Product from "../models/Product.js";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET SINGLE PRODUCT =================
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("createdBy", "name role");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      category,
      image,
      price,
      offerPrice,
      stock,
      unit,
      status,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      category,
      image,
      price,
      offerPrice,
      stock,
      unit,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= GET MY PAYMENTS =================

export const getMyPayments = async (
  req,
  res
) => {
  try {

    const payments =
      await Payment.find({
        userId: req.user._id,
      })
        .populate("orderId");

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name || product.name;
    product.description =
      req.body.description || product.description;
    product.category =
      req.body.category || product.category;
    product.image =
      req.body.image || product.image;
    product.price =
      req.body.price || product.price;
    product.offerPrice =
      req.body.offerPrice ?? product.offerPrice;
    product.stock =
      req.body.stock ?? product.stock;
    product.unit =
      req.body.unit || product.unit;
    product.status =
      req.body.status || product.status;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};