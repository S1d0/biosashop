'use server'

import {contactInquries, productFamilies, users} from "@/db/sample-data";
import {prisma} from "@/db/db";

export async function seedDatabase() {
    try {
        await prisma.account.deleteMany();
        await prisma.session.deleteMany();
        await prisma.verificationToken.deleteMany();
        await prisma.user.deleteMany();

        await prisma.productVariant.deleteMany();
        await prisma.productFamily.deleteMany();
        await prisma.customerEnquiry.deleteMany();

        console.log("Seeding data");
        const createdFamilies = await Promise.all(
            productFamilies.map(async (family) => {
                const {variants, ...familyData} = family;
                const createdFamily = await prisma.productFamily.create({
                    data: familyData
                });
                return {createdFamily, variants};
            })
        );

        // Step 2: Create variants with references to their families
        for (const {createdFamily, variants} of createdFamilies) {
            await Promise.all(
                variants.map(async (variant) => {
                    // Extract size from variant data if needed for your schema
                    await prisma.productVariant.create({
                        data: {
                            ...variant,
                            familyId: createdFamily.id,
                        },
                    });
                })
            );
        }

        console.log("Seeding customers enquiries...");
        await prisma.customerEnquiry.createMany({
            data: contactInquries
        })

        console.log("Seeding users...");
        await prisma.user.createMany({
            data: users
        })

    } catch (err) {
        console.error(err);
    }

    return {
        message: "Success"
    }

}