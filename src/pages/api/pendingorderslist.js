import { PrismaClient } from '@prisma/client';

let prismaInstance = null;
let lastPrismaInstantiation = null;
const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds

function getPrismaInstance() {
  const currentTime = new Date().getTime();

  if (prismaInstance === null || lastPrismaInstantiation === null || currentTime - lastPrismaInstantiation >= FIVE_MINUTES) {
    prismaInstance = new PrismaClient();
    lastPrismaInstantiation = currentTime;
    console.log('Prisma Client instantiated.');
  }

  return prismaInstance;
}

export default async function getUserInfo(req, res) {
  try {
    const { userEmail } = req.query;

    const prisma = getPrismaInstance();

    const pendingRequests = await prisma.pendingrequests.findMany({
      where: {
        pro_email: userEmail
      },
      select: {
        id: true,
        cus_email: true,
        sevice_description: true,
        price: true,
        date: true
      }
      // Additional conditions, filtering, sorting, etc. can be added here
    });
    await prisma.$disconnect(); 

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}