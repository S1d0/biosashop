import {PrismaClient} from "@prisma/client"
import {products} from "@/db/sample-data";

async function seed() {
    const prismaClient = new PrismaClient();

    await prismaClient.product.deleteMany();

    await prismaClient.product.createMany({data: products});

    console.log("Database seeded successfully.");
}

seed();