const express = require('express');
const { addCandidate, getCandidates } = require('../controllers/candidateController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/candidate', authenticateJWT, addCandidate);
router.get('/candidate', authenticateJWT, getCandidates);

module.exports = router;
