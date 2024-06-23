const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authenticateAPIKey = async (req, res, next) => {
  console.log("authencation api key called")    
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'API key required' });
  const user = await prisma.user.findUnique({ where: { api_key: apiKey } });
  if (!user) return res.status(403).json({ error: 'Invalid API key' });
  req.user = user;
  next();
};

module.exports = authenticateAPIKey;
