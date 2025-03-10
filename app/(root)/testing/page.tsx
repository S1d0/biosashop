import {seedDatabase} from "@/lib/actions/test/action";

export default async function Page() {
    const response = await seedDatabase()

    return (
        <div>
            <h1>Seed data</h1>
            <p>{response.message}</p>
        </div>
    );
}