import {Prisma, PrismaClient} from "@prisma/client"
import {contactInquries, deliveryOptions, productFamilies} from "@/db/sample-data";
import dotenv from "dotenv";
import DeliveryOptionCreateManyInput = Prisma.DeliveryOptionCreateManyInput;

const prismaClient = new PrismaClient();
dotenv.config();

export async function seed() {

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

    console.log("Seeding delivery options");
    await prismaClient.deliveryOption.createMany({
        data: deliveryOptions as DeliveryOptionCreateManyInput[]
    })

    console.log("Database seeded successfully.");
}

seed();