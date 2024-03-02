console.log("hello world");
import express from "express";
const app = express();
const PORT = 3000;
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
app.use(express.json()); //middleware to parse json
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  // console.log("req---->" ,req.body)
  users.push({ id: users.length + 1, ...req.body });
  res.send({ message: "User added successfully!" });
});

app.delete("/users/:id", (req, res) => {
  const findUser = users.findIndex((v) => v.id === Number(req.params.id));
  if (findUser !== -1) {
    users.splice(findUser, 1);
    res.send({ message: "User deleted successfully!" });
  } else {
    res.send({ message: "No user found!" });
  }
});

app.put("/users/:id", (req, res) => {
    const findUser = users.findIndex(v=> v.id === Number(req.params.id));
    if (findUser !== -1) {
        users.splice(findUser, 1,{id:Number(req.params.id), ...req.body});
        res.send({message:"User Updated Successfully!"})
    }else{
        res.send({message:"User Not Found!"})
    }
});
