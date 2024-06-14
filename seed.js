const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function seed() {
  const serviceTypes = ['Cleaning', 'Plumbing', 'Electrical', 'Gardening'];
  const availabilityOptions = [
    'Sunday - Saturday',
    'Friday - Sunday',
    'Saturday - Sunday',
  ];

  for (let i = 0; i < 100; i++) {
    const service = await prisma.Service.create({
      data: {
        serviceProviderEmail: faker.internet.email(),
        serviceType: faker.random.arrayElement(serviceTypes),
        description: faker.lorem.sentence(),
        location: faker.address.city(),
        pricePerHour: faker.random.float({ min: 10, max: 100 }),
        availability: faker.random.arrayElement(availabilityOptions),
        image: faker.image.imageUrl(),
      },
    });

    console.log('Created service:', service);
  }
}

seed()
  .catch((error) => {
    console.error('Error seeding the database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });