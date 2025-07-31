/**
 * Utility function to check if a user has admin role
 * @param {Object} user - User object from request
 * @returns {boolean} - True if user is admin, false otherwise
 */
exports.isAdmin = (user) => {
  return user && user.role === 'admin';
};

/**
 * Utility function to check if a user has user role
 * @param {Object} user - User object from request
 * @returns {boolean} - True if user has user role, false otherwise
 */
exports.isUser = (user) => {
  return user && user.role === 'user';
};
