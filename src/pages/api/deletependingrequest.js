
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // You can add authentication here to ensure the user is authorized to access this endpoint

  try {
    const { pro_email } = req.body;

    // Delete the pending request with the provided provider email
    await prisma.pendingrequests.delete({
      where: {
        pro_email,
      },
    });

    res.status(204).end(); // Respond with a 204 status code for successful deletion
  } catch (error) {
    console.error('Error deleting pending request:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}