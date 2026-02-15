const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed or expired" });
  }
};

module.exports = protect;