import express from "express";
import User from "../models/UserModel.js";
const router = express.Router();

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

router.post("/", (req, res) => {
  // console.log('req.body--->',req.body);
  try {
    const user = new User(req.body);
    user.save();
    res.status(200).send({ message: "User Added in db " });
  } catch (error) {
    res.status(400).status({ error });
  }
});
export default router;
