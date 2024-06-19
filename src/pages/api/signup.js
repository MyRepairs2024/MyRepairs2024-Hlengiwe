
// Import Prisma Client
import { PrismaClient } from '@prisma/client';

// Create an instance of Prisma Client
const prisma = new PrismaClient();
export default async function handler(req, res) {
    // Process signup form data and create ServiceProviderSignup
    try {
      const createdServiceProvider = await prisma.ServiceProviderSignup.create({
        data: {
          email: req.body.email,
          verificationKey: req.body.verificationKey,
          password: req.body.password,
        },
      });
  
      res.status(201).json({ serviceProviderId: createdServiceProvider.id });
    } catch (error) {
      console.error('Error creating ServiceProviderSignup:', error);
      res.status(500).json({ error: 'Something went wrong' });
    } finally {
      await prisma.$disconnect();
    }
 
  }
  