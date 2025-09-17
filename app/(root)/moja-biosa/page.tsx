import UserDashboard from "@/components/user/dashboard/user-dashboard";
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {Order} from "@/types/order";
import {fetchOrdersByEmail} from "@/lib/actions/order/action";

export default async function Page() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        console.log(error)
        redirect('/login')
    }

    console.log(data)
    const orders: Order[] = await fetchOrdersByEmail(data.user.email!)
    return (
        <UserDashboard orders={orders} userProfile={data.user}/>
    )
}