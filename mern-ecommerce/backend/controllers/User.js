const User = require('../models/User');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = (await User.findById(id)).toObject();
    delete result.password;
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting your details, please try again later' });
  }
};
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = (await User.findByIdAndUpdate(id, req.body, { new: true })).toObject();
    delete updated.password;
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting your details, please try again later' });
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting user, please try again later' });
  }
};
