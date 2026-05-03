const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================
// AUTH MIDDLEWARE
// =====================
const protect = async (req, res, next) => {
  let token;

  // Check token exists in headers
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get full user from DB (SAFE VERSION)
      req.user = await User.findById(decoded.id).select("-password");

      // If user not found
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();

    } catch (error) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;