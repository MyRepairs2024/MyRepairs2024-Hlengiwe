import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cus_email, pro_email, service, price, cus_address } = req.body;

  try {
    const pendingRequest = await prisma.pendingrequests.create({
      data: {
        cus_email,
        pro_email,
        service,
        price,
        cus_address,
      },
    });

    res.status(201).json({ message: "Payment details submitted successfully", pendingRequest });
} catch (error) {
  console.error("Error during submission:", error); // Log the error for debugging
  res.status(500).json({ error: "Internal server error", details: error.message }); // Return the error message
} finally {
  await prisma.$disconnect();
}

}