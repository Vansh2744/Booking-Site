import jwt from "jsonwebtoken";
import User from "../models/User.models.js";

const UserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        message: "Unauthorized Access",
        success: false,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};

export default UserAuth;
