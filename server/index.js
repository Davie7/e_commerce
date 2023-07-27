// IMPORTS FROM PACKAGES
// import express
const express = require("express");
const mongoose = require("mongoose");

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");

// INITIALIZATION
const PORT = 3000;
const app = express();
const DB = "mongodb+srv://Dave:Ke1365108@cluster0.bhlxso2.mongodb.net/?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(authRouter);

// CONNECTIONS
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

// the listen has the parameters,PORT,IP address and a callback function
app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});

// CREATING AN API
// GET, PUT, POST, DELETE, UPDATE -> CRUD
// http://<yourIPaddress>/hello-world
// Creating a GET request giving a json response with key of name and value of my name
// app.get("/", (req, res) => {
//   res.json({ name: "Otieno Dave Emery" });
// });
// app.get("/hello-world", (req, res) => {
//   res.json({ hi: "hello-world" });
// });
