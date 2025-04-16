import { PrismaClient } from '../prisma/generated/index';

const prisma = new PrismaClient();

const mockVessels = [
  { name: 'Sunset Explorer', latitude: 37.7749, longitude: -122.4194 },
  { name: 'Ocean Voyager', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Sea Breeze', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Northern Star', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Coastal Wander', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Atlantic Pioneer', latitude: 25.7617, longitude: -80.1918 },
  { name: 'Pacific Horizon', latitude: 21.3069, longitude: -157.8583 },
  { name: 'Mediterranean Jewel', latitude: 41.9028, longitude: 12.4964 },
  { name: 'Arctic Explorer', latitude: 64.1466, longitude: -21.9426 },
  { name: 'Southern Cross', latitude: -33.8688, longitude: 151.2093 },
  { name: 'Gulf Mariner', latitude: 29.7604, longitude: -95.3698 },
  { name: 'Caribbean Drift', latitude: 18.4671, longitude: -66.1185 },
  { name: 'Aegean Voyager', latitude: 37.9838, longitude: 23.7275 },
  { name: 'Baltic Seeker', latitude: 59.3293, longitude: 18.0686 },
  { name: 'Adriatic Pearl', latitude: 45.4408, longitude: 12.3155 },
];

async function main() {
  console.log('Seeding database with mock vessels...');

  for (const vessel of mockVessels) {
    await prisma.vessel.create({
      data: vessel,
    });
  }

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });