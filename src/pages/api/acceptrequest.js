// Create a new API route for accepting requests
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // You can add authentication here to ensure the user is authorized to access this endpoint

  try {
    const requestId = req.body.requestId; // Get the request ID from the request body

    // Retrieve the pending request by ID
    const pendingRequest = await prisma.pendingrequests.findUnique({
      where: {
        pro_email: userEmail,
      },
    });

    if (!pendingRequest) {
      return res.status(404).json({ error: 'Pending request not found' });
    }

    // Move the pending request to the "services done" table
    const serviceDone = await prisma.paidrequests.create({
      data: {
        pro_email: pendingRequest.pro_email,
        service: pendingRequest.service,
        price: pendingRequest.price,
      },
    });

    // Delete the pending request from the "pending requests" table
    await prisma.pendingrequests.delete({
      where: {
        pro_email: userEmail,
      },
    });

    res.status(200).json(serviceDone);
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }

}