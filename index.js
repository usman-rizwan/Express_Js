import express from "express";
import router from "./routes/index.js";
import mongoose from "./db/index.js";

const app = express();

const PORT = process.env.PORT || 8000;

const db = mongoose.connection;
db.on("error", console.error.bind("connection error"));
db.once("open", function () {
  console.log("Connected to the database");
});

app.use("/api", router);
app.use(express.json()); //middleware to parse json
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const key = "3000";
// app.use("/", (req, res, next) => {
//   // console.log(req.query.apiKey)
//   if (req.query.apiKey === key) {
//     next();
//   } else {
//     res.status(401).send({ error: "Invalid API Key" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/users", (req, res) => {
//   res.send(users);
// });
// app.post("/users", (req, res) => {
//   // console.log("req---->" ,req.body)
//   users.push({ id: users.length + 1, ...req.body });
//   res.send({ message: "User added successfully!" });
// });

// app.delete("/users/:id", (req, res) => {
//   const findUser = users.findIndex((v) => v.id === Number(req.params.id));
//   if (findUser !== -1) {
//     users.splice(findUser, 1);
//     res.send({ message: "User deleted successfully!" });
//   } else {
//     res.send({ message: "No user found!" });
//   }
// });

// app.put("/users/:id", (req, res) => {
//     const findUser = users.findIndex(v=> v.id === Number(req.params.id));
//     if (findUser !== -1) {
//         users.splice(findUser, 1,{id:Number(req.params.id), ...req.body});
//         res.send({message:"User Updated Successfully!"})
//     }else{
//         res.send({message:"User Not Found!"})
//     }
// });
