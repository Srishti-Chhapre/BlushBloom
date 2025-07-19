import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateTokenResponse from '../utils/generateToken.js';

// @desc    Register new user (Customer or Seller)
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      userType = 'customer', // Default to customer if not provided
      businessName,
      gstNumber,
      document,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = {
      name,
      email,
      password: hashedPassword,
      userType,
    };

    // 👤 Add customer fields
    if (userType === 'customer') {
      newUserData.phone = phone;
      newUserData.address = address;
    }

    // 🧾 Add seller fields
    if (userType === 'seller') {
      newUserData.businessName = businessName;
      newUserData.gstNumber = gstNumber;
      newUserData.document = document;
      newUserData.approvalStatus = 'pending'; // Optional for admin control
    }

    const newUser = new User(newUserData);
    const savedUser = await newUser.save();

    generateTokenResponse(savedUser, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
       console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
console.log("Password match:", isMatch);
    generateTokenResponse(user, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;

    // Customer fields
    if (user.userType === 'customer') {
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
    }

    // Seller fields
    if (user.userType === 'seller') {
      user.businessName = req.body.businessName || user.businessName;
      user.gstNumber = req.body.gstNumber || user.gstNumber;
      user.document = req.body.document || user.document;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || '',
      address: updatedUser.address || '',
      businessName: updatedUser.businessName || '',
      gstNumber: updatedUser.gstNumber || '',
      document: updatedUser.document || '',
      userType: updatedUser.userType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change user password
export const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!user || !user.password) {
      return res.status(400).json({ message: 'User not found or password missing' });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error in changePassword:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
