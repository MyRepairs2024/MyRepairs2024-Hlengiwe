import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, surname, username, email, password, key, role } = req.body;

  try {
    if (role === 'user') {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
      }

      const user = await prisma.user.create({
        data: {
          name,
          surname,
          username,
          email,
          password,
        },
      });

      res.status(201).json({ message: 'User registered successfully', user });
    }  else if (role === 'service_provider') {
      const existingServiceProvider = await prisma.serviceProviderSignup.findUnique({
        where: { email },
      });

      if (existingServiceProvider) {
        return res.status(409).json({ error: 'Email already exists for service provider.' });
      }

      const serviceProvider = await prisma.serviceProviderSignup.create({
        data: {
          email,
          password,
          verificationKey: key,
        },
      });

      return res.status(201).json({ message: 'Service provider registered successfully', serviceProvider });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }

}