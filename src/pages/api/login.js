import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, key, password, role } = req.body;

  try {
    if (role === 'user') {
      // Check if the user exists in the database based on email and password
      const user = await prisma.User.findUnique({
        where: { email },
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'The email or password is invalid.' });
      }

      // Generate a JSON Web Token (JWT) to send to the client for authentication
      const token = jwt.sign({ userId: user.id, user }, '2WMVJ8eLktJP7joZ6cf5I5h++9Vn1nwEdvNR0mDYbtAyZlfZu2+OZqhqVpBa4t+kGEowZRL8Ecjuvx3iznRBEQ==', {
        expiresIn: '1d', // Set the token expiration time (optional)
      });

      // Send the token and user data (optional) in the response
      res.status(200).json({ token, user });
    } else if (role === 'service_provider') {
      // Check if the service provider exists in the database based on email, key, and password
      const serviceProvider = await prisma.ServiceProviderSignup.findUnique({
        where: { email, verificationKey: key },
      });

      if (!serviceProvider || serviceProvider.password !== password) {
        return res.status(401).json({ error: 'The Email, Key, or Password is invalid.' });
      }

      // Generate a JSON Web Token (JWT) to send to the client for authentication
      const token = jwt.sign({ userId: serviceProvider.id, email: serviceProvider.email }, '2WMVJ8eLktJP7joZ6cf5I5h++9Vn1nwEdvNR0mDYbtAyZlfZu2+OZqhqVpBa4t+kGEowZRL8Ecjuvx3iznRBEQ==', {
        expiresIn: '1d', // Set the token expiration time (optional)
      });

      // Send the token and service provider data (optional) in the response
      res.status(200).json({ token, serviceProvider });
    } else {
      res.status(400).json({ error: 'Invalid role' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }

 
}