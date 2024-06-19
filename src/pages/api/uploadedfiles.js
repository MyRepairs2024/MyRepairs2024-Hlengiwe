
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUserInfo(req, res) {
  if (req.method === 'GET') {
    try {
      const { userEmail } = req.query;

      const providerfiles = await prisma.serviceProviderSignup.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!userInfo) {
        return res.status(404).json({ error: 'User information not found' });
      }
      await prisma.$disconnect(); 

      res.status(200).json(userInfo);
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Something went wrong' });
    } 
  } else {
    res.status(405).end();
  }
}