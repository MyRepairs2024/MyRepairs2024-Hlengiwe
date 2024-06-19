import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const services = await prisma.Service.findMany(); // Replace 'service' with your Prisma model name

      res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching Services:', error.message);
      res.status(500).json({ error: 'Error fetching Services' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}
