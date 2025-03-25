import Header from "@/components/shared/header/header2";
import Footer from "@/components/shared/footer/footer";
import {Toaster} from "@/components/ui/toaster";
import Header3 from "@/components/shared/header/header3";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className={"flex min-h-screen flex-col"}>
                <Header3 />
                <div className="flex-grow">{children}</div>
                <Footer />
            </div>
            <Toaster />
        </>
    );
}