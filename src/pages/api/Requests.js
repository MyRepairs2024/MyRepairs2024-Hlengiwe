const express = require('express');
const router = express.Router();

// Define a schema
const requestSchema = new mongoose.Schema({
  customerName: String,
  service: String,
  status: String
});

const Request = mongoose.model('electrician-requests', requestSchema);

// Create a request
router.post('/electrician-requests', async (req, res) => {
  const newRequest = new Request(req.body);
  await newRequest.save();
  res.status(201).send(newRequest);
});

// Get all requests
router.get('/electrician-requests', async (req, res) => {
  const requests = await Request.find();
  res.status(200).send(requests);
});

// Update request status
router.put('/electrician-requests/:id', async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(request);
});

module.exports = router;
