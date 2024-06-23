const express = require('express');
const { getUserProfile, getCandidates } = require('../controllers/publicApiController');
const authenticateAPIKey = require('../middleware/authenticateAPIKey');

const router = express.Router();

router.get('/public/profile', authenticateAPIKey, getUserProfile);
router.get('/public/candidate', authenticateAPIKey, getCandidates);

module.exports = router;
