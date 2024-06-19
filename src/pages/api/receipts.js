import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userEmail = req.query.userEmail; // Get the userEmail from the query parameter

  if (!userEmail) {
    return res.status(400).json({ error: 'Missing userEmail parameter' });
  }

  try {
    const receipts = await prisma.paidrequests.findMany({
      where: {
        cus_email: userEmail,
      },
    });

    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }

}