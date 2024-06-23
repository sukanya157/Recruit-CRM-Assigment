require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const publicApiRoutes = require('./routes/publicApiRoutes');

app.use('/api', authRoutes);
app.use('/api', candidateRoutes);
app.use('/api', publicApiRoutes);

const MAIN_SERVICE_PORT = process.env.MAIN_SERVICE_PORT || 3000
app.listen(MAIN_SERVICE_PORT, () => {
  console.log(`Main Service running on http://localhost:${MAIN_SERVICE_PORT}`);
});
