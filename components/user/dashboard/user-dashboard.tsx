'use client'

import {Button} from "@/components/ui/button";
import {Package, User} from "lucide-react";
import {useState} from "react";
import UserOrders from "@/components/user/orders/ordes";
import {Order} from "@/types/order";
import {User as UserProfile} from "@supabase/auth-js";

interface UserDashboardProps {
    orders: Order[],
    userProfile: UserProfile
}

export default function UserDashboard({orders, userProfile}: UserDashboardProps) {
    const [activeSection, setActiveSection] = useState("orders")
    const userName = userProfile.user_metadata?.full_name ?? userProfile.email

    return (
        <div className="flex min-h-screen bg-background">
            {/*  Sidebar  */}
            <div className="w-64 bg-sidebar border-r p-6">
                <div className="mb-8">
                    <h2 className="text-2xl text-balance font-bold text-primary">Moje zamówienia</h2>
                    <p className="text-muted-foreground">Witaj ponownie, {userName}</p>
                </div>

                <nav className="space-y-2">
                    <Button
                        onClick={() => setActiveSection("orders")}
                        className="w-full justify-start"
                        variant={activeSection === "orders" ? "default" : "ghost"}>
                        <Package className="mr-2 h-4 w-4"/>
                        Historia zamówień
                    </Button>
                    {/**/}
                    {/*<Button*/}
                    {/*    onClick={() => setActiveSection("profile")}*/}
                    {/*    className="w-full justify-start"*/}
                    {/*    variant={activeSection === "profile" ? "default" : "ghost"}>*/}
                    {/*    <User className="mr-2 h-4 w-4"/>*/}
                    {/*    Profil*/}
                    {/*</Button>*/}
                </nav>
            </div>

            {/*  Main Content  */}
            <div className="flex-1 p-8">
                {activeSection === "orders" && <UserOrders orders={orders}/>}
            </div>


        </div>
    )
}