// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateTokenResponse = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      token,
    }); // ✅ Only return token
};

export default generateTokenResponse;
