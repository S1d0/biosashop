import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {AdminDashboard} from "@/components/admin/dashboard";

export default async function AdminPage() {
    const supabase = await createClient()
    const {data, error} = await supabase.auth.getUser()
    console.log("User: ", data?.user?.email, "")
    console.log("Error: ", error)
    if(error) {
        console.log(error)
        redirect('/login')
    }

    if(!data.user) {
        console.log("User is not logged in")
        redirect('/login')
    }

    return (
        <section id="admin-dashboard">
            <AdminDashboard />
        </section>
    )

}