// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000

//moddleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

//store service requests temporaly (in-memiry)
let serviceRequests = [];

// API routes
//Handle electrician service request submission
app.post('/api/electrician-requests', (req, res) => {
  const requestData = req.body;
  serviceRequests.push(requestData);
  res.status(201).send({ message: 'Request submitted successfully', requestData });
});

// Retrieve electrician service requests
app.get('/api/electrician-requests', (req, res) => {
  res.status(200).json(serviceRequests);
});

//start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  res.json([
    { id: 1, serviceName: 'Fix the sink' },
    { id: 2, serviceName: 'Repair the roof' },
  ]);
});
app.post('/api/electrician-requests/:id/accept', (req, res) => {
  // Handle request acceptance
  res.sendStatus(200);
});

app.post('/api/electrician-requests/:id/decline', (req, res) => {
  // Handle request rejection
  res.sendStatus(200);
});

// Serve the static HTML files
app.get('/user-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'customer_dashboard.html'));
});

app.get('/user-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'request_page.html'));
});

// Catch-all handler to serve the React app for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});