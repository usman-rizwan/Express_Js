import express from "express";
import User from "../models/UserModel.js";
const router = express.Router();


router.post("/", async(req, res) => {
  // console.log('req.body--->',req.body);
  try {
    const user = new User(req.body);
    const newUser = await user.save();
//     const data = req.body
// const user = User.create(data)
// user.save();
   return res.status(200).send({status:200, message: "User Added in db " ,user:newUser})
  } catch (error) {
    res.status(400).status({status:400,message: error.message });
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
