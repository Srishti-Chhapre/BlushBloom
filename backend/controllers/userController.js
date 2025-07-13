// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
import User from '../models/User.js'; // ✅ adjust path if needed

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // ✅ exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // ✅ returns name, email, phone, address, userType etc.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // ✅ req.user.id is from protect middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Update fields only if they are sent in request
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.businessName = req.body.businessName || user.businessName;
    user.gstNumber = req.body.gstNumber || user.gstNumber;
    user.document = req.body.document || user.document;

    const updatedUser = await user.save();

    // ✅ Return updated info (without password)
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      businessName: updatedUser.businessName,
      gstNumber: updatedUser.gstNumber,
      document: updatedUser.document,
      userType: updatedUser.userType,
      token: req.token, // Optional: reuse existing token or create new
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
