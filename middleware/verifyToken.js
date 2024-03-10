import "dotenv/config.js";
import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {

  try {
    const { SECRET } = process.env;
    // console.log(req.headers.authorization.split(" ")[1])
    const { authorization } = req.headers;
    const token = (authorization && authorization.split(" ")[1]) || ""; //Bearer <token>
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .send({
            auth: false,
            message: `Failed to authenticate token. Error ->${err}`,
          });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    
      return res.status(500).send({message : "unauthorized" , error})
  }

};

export default verifyToken;
