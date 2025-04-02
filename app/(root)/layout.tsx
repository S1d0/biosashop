import Footer from "@/components/shared/footer/footer";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import Header from "@/components/shared/header/header";
import {CartProvider} from "@/components/shared/cart/cart-provider";
import {CartSheet} from "@/components/shared/cart/cart-sheet";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <CartProvider>
                <div className={"flex min-h-screen flex-col"}>
                    <Header/>
                    <div className="flex-grow">{children}</div>
                    <Footer/>
                </div>
                <Toaster/>
                <CartSheet />
            </CartProvider>
        </>
    );
}