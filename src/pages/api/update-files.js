import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function updateFiles(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, uploadedFileNames } = req.body;

      const user = await prisma.serviceProviderSignup.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updatedUser = await prisma.serviceProviderSignup.update({
        where: {
          email: email,
        },
        data: uploadedFileNames.reduce((acc, file) => {
          return {
            ...acc,
            ...file,
          };
        }, {}),
      });

      console.log('Updated User:', updatedUser);
      res.status(200).json({ message: 'Files updated successfully' });
    } catch (error) {
      console.error('Error updating files:', error);
      res.status(500).json({ error: 'Something went wrong' });
   } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
}