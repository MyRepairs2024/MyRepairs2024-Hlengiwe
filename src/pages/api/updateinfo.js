import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function updateUserInfo(req, res) {
  if (req.method === 'PUT') {
    try {
      const { userEmail } = req.query;
      const newData = req.body; // Assuming the body contains all fields to be updated

      const updatedUserInfo = await prisma.ServiceProviderSignup.update({
        where: {
          email: userEmail,
        },
        data: newData,
      });

      res.status(200).json({ message: 'User information updated successfully', updatedUserInfo });
    } catch (error) {
      console.error('Error updating user information:', error);
      res.status(500).json({ error: 'Something went wrong' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}