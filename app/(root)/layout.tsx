import Footer from "@/components/shared/footer/footer";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import Header from "@/components/shared/header/header";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className={"flex min-h-screen flex-col"}>
                <Header />
                <div className="flex-grow">{children}</div>
                <Footer />
            </div>
            <Toaster />
        </>
    );
}