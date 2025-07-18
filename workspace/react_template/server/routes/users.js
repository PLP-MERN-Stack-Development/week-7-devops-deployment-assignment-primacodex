const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Import user controller (we'll create a placeholder for now)
const userController = {
  getAllUsers: (req, res) => {
    res.status(200).json({
      success: true,
      message: 'This would return all users in a real application',
      data: []
    });
  },
  getUserById: (req, res) => {
    res.status(200).json({
      success: true,
      message: `This would return user with id ${req.params.id} in a real application`,
      data: {
        id: req.params.id,
        name: 'Sample User',
        email: 'sample@example.com',
        role: 'user'
      }
    });
  }
};

// Admin routes
router.get('/', protect, restrictTo('admin'), userController.getAllUsers);
router.get('/:id', protect, restrictTo('admin'), userController.getUserById);

module.exports = router;