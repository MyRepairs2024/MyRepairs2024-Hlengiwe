import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function acceptService(req, res) {
  try {
    const { requestId } = req.body; // Extract the request ID from the request body

    // Fetch the pending request by its ID
    const pendingRequest = await prisma.pendingrequests.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!pendingRequest) {
      return res.status(404).json({ error: 'Pending request not found' });
    }

    // Create a new entry in the paid requests table
    const paidRequest = await prisma.paidrequests.create({
      data: {
        pro_email: pendingRequest.pro_email,
        cus_email: pendingRequest.cus_email,
        service: pendingRequest.service,
        cus_address: pendingRequest.cus_address,
        pro_address: pendingRequest.pro_address,
        sevice_description: pendingRequest.sevice_description,
        price: pendingRequest.price,
        date: pendingRequest.date,
        // Include any other fields you want to move to the paid requests table
      },
    });

    // Delete the accepted service request from the pending requests table
    await prisma.pendingrequests.delete({
      where: {
        id: requestId,
      },
    });

    res.status(200).json({ message: 'Service accepted and moved to paid requests', paidRequest });
  } catch (error) {
    console.error('Error accepting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 finally {
  await prisma.$disconnect();
}

}