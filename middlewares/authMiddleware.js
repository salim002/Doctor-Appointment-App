import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).json({ message: "Authentication Failed", success: false });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(200).json({ message: `${error}`, success: false });
  }
};

export default middleware;
