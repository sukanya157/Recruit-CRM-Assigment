const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password_hash,
          api_key: crypto.randomBytes(16).toString('hex'),
        },
      });
      const { id,first_name: user_first_name, last_name: user_last_name, email: user_email, api_key } = user;
      const user_data = { id, first_name: user_first_name, last_name: user_last_name, email: user_email, api_key };
      res.json(user_data);
    } catch (error) {
      res.status(400).json({ error: 'User already exists' });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
