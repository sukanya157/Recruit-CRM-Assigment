const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.addCandidate = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const candidate = await prisma.candidate.create({
    data: {
      first_name,
      last_name,
      email,
      user_id: req.user.userId,
    },
  });
  res.json(candidate);
};

exports.getCandidates = async (req, res) => {
  const candidates = await prisma.candidate.findMany({
    where: { user_id: req.user.userId },
  });
  res.json(candidates);
};
