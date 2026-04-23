import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.createMany({
    data: [
      { key: "founder_name", value: "Jane Carlysle" },
      { key: "venmo_link", value: "https://venmo.com/cwconnectwomen" },
      { key: "cash_app_link", value: "https://cash.app/$cwconnectwomen" },
      { key: "facebook_link", value: "https://facebook.com/cwconnectwomen" }
    ],
    skipDuplicates: true
  });
}

main().finally(async () => prisma.$disconnect());
