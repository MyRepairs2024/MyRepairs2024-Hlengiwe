import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, key } = req.body;

  try {
    const serviceProvider = await prisma.ServiceProviderSignup.create({
      data: {
        email,
        password,
        verificationKey: key,

      },
    });

    return res.status(201).json({ message: 'Service provider registered successfully', serviceProvider });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }

}