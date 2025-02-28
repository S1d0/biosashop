import Header from "@/components/shared/header/header2";
import Footer from "@/components/shared/footer/footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"flex h-screen flex-col"}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}