import {PrismaClient} from "@prisma/client"
import {contactInquries, productFamilies, users} from "@/db/sample-data";
import dotenv from "dotenv";

const prismaClient = new PrismaClient();
dotenv.config();

async function seed() {

    await prismaClient.account.deleteMany();
    await prismaClient.session.deleteMany();
    await prismaClient.verificationToken.deleteMany();
    await prismaClient.user.deleteMany();

    await prismaClient.productVariant.deleteMany();
    await prismaClient.productFamily.deleteMany();
    await prismaClient.customerEnquiry.deleteMany();

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

    console.log("Seeding customers enquiries...");
    await prismaClient.customerEnquiry.createMany({
        data: contactInquries
    })

    console.log("Seeding users...");
    await prismaClient.user.createMany({
        data: users
    })

    console.log("Database seeded successfully.");
}

seed();