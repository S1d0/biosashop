import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Hero() {
    const heroDescription =`Rodzinna firma tworząca produkty premium dla gleby i wody, którym zaufano w ponad 20
    krajach na
    całym świecie.`
    return (
        <section className="w-full py-4 md:py-8 lg:py-12 bg-gradient-to-b from-emerald-50 to-white">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Naturalne <span className={"text-emerald-500"}>Rozwiązania</span> dla zdrowszej planety
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                {heroDescription}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild variant="outline" className={"bg-primary text-primary-foreground"}>
                                <Link
                                    href="#products">
                                    Kup Teraz
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link
                                    href="/about"
                                >
                                    Dowiedz Się Więcej
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <Image
                        src="/hero.jpg"
                        width={350}
                        height={350}
                        alt="Ekologiczne produkty dla gleby i wody"
                        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    />
                </div>
            </div>
        </section>
    )
}