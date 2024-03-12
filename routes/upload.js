import express from "express";
import multer from "multer";
import fs from 'fs-extra';

const router = express.Router();
// router.post('/' ,(req , res)=>{
// console.log(res.status(200).send({mesage: "working  "}))
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    console.log("file -->" , file)
    console.log("cb -->" , cb)
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  fs.remove('images/835054313logo-removebg-preview.png', err => {
    if (err) return console.error(err)
    console.log('success!')
  })
  
  res.send({ message: "File uploaded successfully" });
});

export default router;
