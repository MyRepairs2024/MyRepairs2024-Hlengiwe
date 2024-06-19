/*import { PrismaClient } from '@prisma/client';
import { uploadToSupabaseStorage } from './uploadService';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      // Upload files to Supabase Storage and get URLs
   
      // Insert URLs into the database using Prisma
      const result = await prisma.ServiceProvider.create({
        data: {
          profession: formData.profession,
          address: formData.address,
          profession: formData.profession,
          address: formData.address,
          proofOfAddress: formData.proofOfAddress,
          name: formData.name,
          surname: formData.surname,
          contacts: formData.contacts,
          email: formData.email,
          tradeCertifications: formData.tradeCertifications,
          certifications: formData.certifications,
          insurance: formData.insurance,
          photos: formData.photos,
          clients: formData.clients,
          driversLicense: formData.driversLicense,
          activeContactNumber: formData.activeContactNumber,
          streetAddress: formData.streetAddress,
          streetAddressLine2: formData.streetAddressLine2,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          cipcRegistration: formData.cipcRegistration,
          businessLicenses: formData.businessLicenses,
          tradeCertifications: formData.tradeCertifications,
          certifications: formData.certifications,
          insuranceCoverage: formData.insuranceCoverage,
          workHistoryCV: formData.workHistoryCV,
          workedWithClients: formData.workedWithClients,
          selfPhoto: formData.selfPhoto,
          criminalBackground: formData.criminalBackground,
          agreement: formData.agreement,
          cv: formData.cv,
          identificationDoc: formData.identificationDoc,
          passport: passportUrl, // Insert the uploaded URL
          businessLicence: businessLicenceUrl, // Insert the uploaded URL
        },
      });

      res.status(200).json({ message: 'Form data saved successfully', result });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Error saving form data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
*/