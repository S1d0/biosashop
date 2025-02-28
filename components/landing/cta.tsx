import Link from "next/link";
import ContactModal from "@/components/shared/contact/contant-modal";

export default function CtaPage() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Gotowy, by Odmienić Swój Ogród?
                        </h2>
                        <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Dołącz do tysięcy zadowolonych klientów na całym świecie i doświadcz różnicy, jaką
                            wprowadzają nasze
                            produkty.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-6 lg:gap-10 min-[400px]:flex-row">
                        <Link
                            href="/products"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Kup Teraz
                        </Link>
                        <div
                            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            <ContactModal/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}