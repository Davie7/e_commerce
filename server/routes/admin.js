const express = require("express");
// create an instance of express router called adminRouter.
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");

// Add product
// I'll be using the admin middleware to ensure that only admin users can access this route
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    // use of the destructuring method to extract data from the request body.
    const { name, description, images, quantity, price, category } = req.body;
    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all your products
adminRouter.get("/admin/get-products", admin, async (req, res) => {
  try {
    // query the database to retrieve all products
    const products = await Product.find({});
    // respond with the retrieved products in json format
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
