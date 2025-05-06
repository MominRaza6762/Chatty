const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token Provided.",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(verifyToken.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in the auth middleware : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = authMiddleware;
