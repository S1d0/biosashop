import {Button} from "@/components/ui/button";
import {ContactModal} from "@/components/shared/contact/contact-modal";


export default function CtaPage() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
    <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Gotowy by <span className={"text-stone-50"}>odmienić</span> swój Ogród?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Dołącz do tysięcy zadowolonych klientów na całym świecie i doświadcz różnicy, jaką wprowadzają nasze
                    produkty.
                </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button variant={"outline"} className={"bg-stone-50 font-bold text-lg hover:bg-primary/50 hover:text-stone-50 tracking-wide"}>
                    Kup teraz
                </Button>
                    <ContactModal />
            </div>
        </div>
    </div>
</section>
    )
}