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

    // Fetch pending requests with cus_email
    const pendingRequests = await prisma.paidrequests.findMany({
      where: {
        pro_email: userEmail,
      },
      select: {
        cus_email: true,
     
      },
    });

    const currentOrders = await Promise.all(
      pendingRequests.map(async (order) => {
        try {
          // Fetch profile picture name using the cus_email
          const userData = await prisma.user.findUnique({
            where: {
              email: order.cus_email,
            },
            select: {
              profilePicture: true,
            },
          });

          const profilePictureName = userData?.profilePicture || 'default.jpg'; // Use a default image name if not found

          return {
            ...order,
            profilePictureName,
            
          };

        } catch (error) {
          console.error('Error fetching profile picture name:', error);
          throw error;
        }
   
      })
    );
    await prisma.$disconnect(); 

    res.status(200).json(currentOrders);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}