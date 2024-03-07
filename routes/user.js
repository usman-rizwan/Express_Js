import express from "express";
import User from "../models/UserModel.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.use(bodyParser.json()); // Middleware to parse request body to JSON

router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({
        status: 400,
        message: "User with the same email already exists",
      });
    }
    const saltRounds = 10;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password });
    
    const newUser = await user.save();
    const token = jwt.sign({_id:newUser._id},"practicehaisab")

    return res.status(200).send({
      status: 200,
      message: "User added to the database",
      user: newUser,
      token
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const {email , password } = req.body
    // const user = await User.findOne({ email }).then(res => res.toObject());
    const findUser = await User.findOne({ email });
    const user =  findUser.toObject();

    if (!user) {
      return res.status(401).send({message:"User not found"})
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).send({message:"Incorrect password"})
    }
    delete  user.password;
    const token = jwt.sign({_id:user._id},"practicehaisab")
      return res.status(200).send({ message: "User found successfully" , user , token });
   
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ status: 500, message: error.message });
  }
});

// const users = [
//   {
//     id: 1,
//     name: "Usman",
//     email: "usman@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Ali",
//     email: "ali@gmail.com",
//   },
// ];
// router.get("/", (req, res) => {
//   res.status(200).send({ users });
// });
export default router;
