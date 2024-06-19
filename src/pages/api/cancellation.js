// Import necessary modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const supabase = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Endpoint for handling payment cancellation and user redirection
app.get('/cancel-payment', async (req, res) => {
  const token = req.query.token;

  try {
    // Verify the token and extract user identity
    const decoded = jwt.verify(token, 'your-secret-key');

    // Assuming the token contains user information
    const userId = decoded.userId;

    // Check if the user exists in your Prisma database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Redirect the user back to their dashboard (e.g., using Express route)
    res.redirect(`/user-dashboard?username=${user.username}`);
  } catch (error) {
    // Handle token verification error (e.g., invalid or expired token)
    console.error('Token verification error:', error);
    res.status(401).send('Unauthorized');
  }
});

// Other routes and server setup...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});