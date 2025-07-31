require('dotenv').config();

exports.verifyAdmin = async (req, res, next) => {
  try {
    // Check if user exists in request (should be set by verifyToken middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    // If admin, proceed to next middleware/controller
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
