import { PrismaClient } from "@prisma/client";

//import all seed data as startup
import amenitiesData from "../data/amenities.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };
import bookingData from "../data/bookings.json" assert { type: "json" };
import hostData from "../data/hosts.json" assert { type: "json" };
import propertyData from "../data/properties.json" assert { type: "json" };
import reviewData from "../data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  // Setting all variables
  const { amenities } = amenitiesData;
  const { users } = userData;
  const { bookings } = bookingData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  const { reviews } = reviewData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
