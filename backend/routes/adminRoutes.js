const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// Placeholder — Epic 8 (Admin Panel)
router.get('/', protect, adminOnly, (req, res) => res.json({ message: 'Admin route — coming soon' }));

module.exports = router;
