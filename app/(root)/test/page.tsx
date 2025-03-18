import {seed} from "@/db/seed";

export default async function TestPage() {
    await seed();
    return (
        <h1>Seeding done </h1>
    );
}