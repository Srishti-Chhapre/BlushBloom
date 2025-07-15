import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminProtect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the same secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin exists
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Attach admin to request object
    req.admin = admin;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminProtect;
