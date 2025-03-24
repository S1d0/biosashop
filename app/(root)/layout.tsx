import Header from "@/components/shared/header/header2";
import Footer from "@/components/shared/footer/footer";
import {Toaster} from "@/components/ui/toaster";

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