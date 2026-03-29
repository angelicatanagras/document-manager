const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Placeholder — Epic 3 (Upload & Manage Documents)
router.get('/', protect, (req, res) => res.json({ message: 'Documents route — coming soon' }));

module.exports = router;
