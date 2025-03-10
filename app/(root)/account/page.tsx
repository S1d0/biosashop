import {auth} from "@/auth";

export default async function AccountPage() {
    const session = await auth()
    if (!session) {
        throw new Error("no session");
    }
    return (
        <div>
            <h1>Dzień dobry {session.user?.name}</h1>
        </div>
    );
}