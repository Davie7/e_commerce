const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new Express Router instance
const authRouter = express.Router();

// Define a POST route "/api/signup"
authRouter.post("/api/signup", async (req, res) => {
  try {
    // Extract the 'name', 'email', and 'password' from the request body
    const { name, email, password } = req.body;

    // Check if a user with the provided 'email' already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user with the same email exists, return a 400 (Bad Request) status and an error message
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    // const hashedPassword = await bcryptjs.hash(password,8);

    // If no existing user is found, create a new 'User' object with the provided data
    let user = new User({
      name,
      email,
      // password: hashedPassword
      password,
    });

    // Save the newly created user to the database
    user = await user.save();
    // Respond with the JSON representation of the 'user' object
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign in route
// Exercise
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign({id: user._id}, "passwordKey");
    res.json({token, ...user._doc});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// checking tokens
authRouter.post("/tokenIsValid", async (req, res)=>{
  try {
    // first get the token
    const token = req.header('x-auth-token');
    if(!token) return res.json(false);
    jwt.verify(token, 'passwordKey');
    if(!verified) return res.json(false);
    const user  = await User.findById(verified.id);
    if(!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

module.exports = authRouter;
