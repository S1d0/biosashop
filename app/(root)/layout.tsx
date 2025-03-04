import Header from "@/components/shared/header/header2";
import Footer from "@/components/shared/footer/footer";
import {Toaster} from "sonner";

export default function RootLayout({
                                       modal,
                                       children,
                                   }: Readonly<{
    modal: React.ReactNode
    children: React.ReactNode
}>) {
    return (
        <>
            <div className={"flex min-h-screen flex-col"}>
                <Header />
                <div className="flex-grow">{children}</div>
                {modal}
                <Footer />
            </div>
            {/* Place Toaster outside the main layout to ensure it's always visible */}
            <Toaster richColors position="bottom-right" />
        </>
    );
}