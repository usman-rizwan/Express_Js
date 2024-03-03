import express from "express";
const router = express.Router();

const users = [
  {
    id: 1,
    name: "Usman",
    email: "usman@gmail.com",
  },
  {
    id: 2,
    name: "Ali",
    email: "ali@gmail.com",
  },
];
router.get("/", (req, res) => {
  res.status(200).send({ users });
});
export default router ;