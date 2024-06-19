/*// Import necessary modules and initialize Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // You can add authentication here to ensure the user is authorized to access this endpoint

  try {
    const { pro_email, service, price } = req.body;

    // Create a new entry in the "paidrequests" table
    const serviceDone = await prisma.paidrequests.create({
      data: {
        cus_email,
        pro_email,
        service,
        price,
      },
    });

    res.status(201).json(serviceDone); // Respond with a 201 status code for successful creation
  } catch (error) {
    console.error('Error populating paid requests:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}*/