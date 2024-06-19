import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUserInfo(req, res) {
  try {
    const { userEmail } = req.query; // Extract userEmail from the request query

    const paidRequests = await prisma.paidrequests.findMany({
      where: {
        pro_email: userEmail // Assuming your pending requests are associated with user emails
      },
      select: {
        cus_email: true,
        sevice_description: true,
        price: true,
        date: true
      }
      // You can add additional conditions, filtering, sorting, etc., as needed
    });

    res.status(200).json(paidRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}