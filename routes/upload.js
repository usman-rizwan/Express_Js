import express from "express";
import multer from "multer";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";
const { CLOUDINARY_Cloud_Name, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_Cloud_Name,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
    // console.log("file -->" , file)
    // console.log("cb -->" , cb)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  fs.readdir("images", (err, files) => {
    files.forEach((file) => {
      console.log(file);
      const fileName = file.lastIndexOf(".");
      const onlyFileName = fileName !== -1 ? file.slice(0, fileName) : fileName;
      cloudinary.uploader.upload(
        `images/${file}`,
        { public_id: onlyFileName },
        (error, result) => {
          // console.log("result-->", result);
          fs.remove(`images/${file}`, (err) => {
            if (err) return console.error(err);
            console.log("success!");
          });
          if (error) {
            return res.status(7).send({ error });
          }

          res.send({ message: "File uploaded successfully" , url : result.url});
        }
      );
    });
  });
  // fs.remove('images/835054313logo-removebg-preview.png', err => {
  //   if (err) return console.error(err)
  //   console.log('success!')
  // })
});

export default router;
