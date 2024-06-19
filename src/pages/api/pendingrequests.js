import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // You can add authentication here to ensure the user is authorized to access this endpoint

  try {
    const userEmail = req.query.userEmail; // Get the userEmail from the query parameter

    const pendingRequests = await prisma.pendingrequests.findMany({
      where: {
        cus_email: userEmail,
      },
    });

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }

}