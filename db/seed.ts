import {PrismaClient} from "@prisma/client"
import {productFamilies, testimonials} from "@/db/sample-data";
import dotenv from "dotenv";

const prismaClient = new PrismaClient();
dotenv.config();

async function seed() {

    await prismaClient.productVariant.deleteMany();
    await prismaClient.productFamily.deleteMany();
    await prismaClient.testimony.deleteMany();

    console.log("Seeding data");
    const createdFamilies = await Promise.all(
        productFamilies.map(async (family) => {
            const { variants, ...familyData } = family;
            const createdFamily = await prismaClient.productFamily.create({
                data: familyData
            });
            return { createdFamily, variants };
        })
    );

    // Step 2: Create variants with references to their families
    for (const { createdFamily, variants } of createdFamilies) {
        await Promise.all(
            variants.map(async (variant) => {
                // Extract size from variant data if needed for your schema
                await prismaClient.productVariant.create({
                    data: {
                        ...variant,
                        familyId: createdFamily.id,
                    },
                });
            })
        );
    }

    const seedTestimonials = await prismaClient.testimony.createMany({
        data: testimonials
    })
    console.log("Created testimonials: ", seedTestimonials);
    console.log("Database seeded successfully.");
}

seed();