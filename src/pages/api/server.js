// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const { Storage } = require('@supabase/storage');
const app = express();
app.use(cors()); // Use cors middleware
const port = 3000;
app.use(bodyParser.json());

let verificationCodes = {}; // In-memory store for demo purposes
app.post('/send-verification', (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
  verificationCodes[email] = verificationCode;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });
// Send email
const mailOptions = {
  from: 'your-email@gmail.com',
  to: email,
  subject: 'Your Verification Code',
  text: `Your verification code is ${verificationCode}`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    return res.status(500).send('Error sending email');
  }
  console.log('Email sent:', info.response);
  res.status(200).send('Verification code sent');
});
});

app.post('/verify-code', (req, res) => {
  const { email, verificationKey } = req.body;

  if (verificationCodes[email] === verificationKey) {
    res.status(200).send('Verification successful');
  } else {
    res.status(400).send('Invalid verification code');
  }
});
const verifyCode = async () => {
  try {
    const response = await axios.post('/verify-code', {
      email: formData.email,
      verificationKey: formData.verificationKey,
    });
    console.log(response.data); // Handle successful verification
  } catch (error) {
    console.error('Verification failed', error); // Handle failed verification
  }
};



app.listen(3000, () => {
console.log('Server is running on port 3000');
});


// Supabase credentials
const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
const supabase = createClient(supabaseUrl, supabaseKey);
const storage = new Storage(supabase);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/electrician-requests', async (req, res) => {
  try {
    const { data, error } = await storage.from('files').upload(req.files.file.name, req.files.file.data);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'File upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})