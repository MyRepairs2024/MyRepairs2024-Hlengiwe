import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    businesstype,
    providertype,
    name,
    surname,
    contactnumber,
    address,
    licenses,
    experience,
    insurance,
    workquality,
    communication,
  } = req.body;

  try {
    const providerContactInfo = await prisma.ProviderContactInfo.create({
      data: {
        businesstype,
        providertype,
        name,
        surname,
        contactnumber,
        address,
      },
    });

    const onboardQuestions = await prisma.OnboardQuestions.create({
      data: {
        licenses,
        experience,
        insurance,
        workquality,
        communication,
      },
    });

    res.status(201).json({ message: 'Onboard and contact info submitted successfully' });
  } catch (error) {
    console.error('Error submitting onboard and contact info:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}