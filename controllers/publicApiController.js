const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserProfile = (req, res) => {
  const { id, first_name, last_name, email } = req.user;
  const user_data = { id, first_name, last_name, email };
  res.json(user_data);
};

exports.getCandidates = async (req, res) => {
  const candidates = await prisma.candidate.findMany({
    where: { user_id: req.user.id },
  });
  res.json(candidates);
};
