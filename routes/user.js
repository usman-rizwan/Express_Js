import express from "express";
import User from "../models/UserModel.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import chalk from 'chalk';

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "any.empty": "Email field cannot be empty",
      "string.email": "Invalid Email",
    }),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,32}$/)
    .required()
    .messages({
      "any.empty": "Password field cannot be empty",
      "string.pattern.base":
        "Password must contain only alphan.label('Password')",
    }),
    phoneNumber : Joi.number().integer().positive().greater(1e7)
});

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
    await schema.validateAsync(req.body);
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ ...req.body, password });
    const newUser = await user.save();
    const token = jwt.sign({ _id: newUser._id }, "practicehaisab");

    return res.status(200).send({
      status: 200,
      message: "User added to the database",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ status: 400, message: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await User.findOne({ email }).then(res => res.toObject());
    const findUser = await User.findOne({ email });
    const user = findUser.toObject();

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).send({ message: "Incorrect password" });
    }
    delete user.password;
    const token = jwt.sign({ _id: user._id }, "practicehaisab");
    return res
      .status(200)
      .send({ message: "User found successfully", user, token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ status: 500, message: error.message });
  }
});


router.get("/get", async (req, res) => {
  try {
    const user =await User.find()
    return res.status(200).send({user })
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
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
