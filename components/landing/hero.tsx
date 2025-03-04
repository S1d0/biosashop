import Image from "next/image";
import Link from "next/link";
import {
    ArrowRightToLine,
    LucideStore
} from "lucide-react";
import React from "react";

export default function Hero() {
    const heroDescription =`Rodzinna firma tworząca produkty premium dla gleby i wody, którym zaufano w ponad 20
    krajach na
    całym świecie.`
    return (
        <section className="w-full py-4 md:py-8 lg:py-12 relative bg-gradient-to-b from-primary to-stone-50">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl text-zinc-800 font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                            Naturalne <span className={"text-white font-extrabold"}>rozwiązania</span> dla zdrowszej planety
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                {heroDescription}
                            </p>
                        </div>
                        <div className="flex flex-col min-[400px]:flex-row">
                            <CallToAction />
                        </div>
                    </div>
                        <Image
                            src="/hero.jpg"
                            width={350}
                            height={350}
                            alt="Ekologiczne produkty dla gleby i wody"
                            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-2xl"
                        />
                </div>
            </div>
        </section>
    )
}

function CallToAction() {
    return (
        <div className={"relative group"}>
            <div className={"absolute -inset-0.5 group-hover:-inset-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"}></div>
            <div
                className={"relative flex bg-slate-800 rounded-lg leading-none items-center divide-x divide-gray-300 px-6 py-3"}>
                <div className={"group/products"}>
                    <Link className={"pr-6 text-yellow-400 font-medium group-hover/products:text-stone-50"}
                          href="/products">
                        <LucideStore className={"text-sm text-lime-400 inline-flex group-hover/products:text-stone-50 pr-2"}/>
                        Przejdź do sklepu
                    </Link>
                </div>
                <div className="group/about">
                    <Link
                        className={"pl-6 text-lime-400 font-medium group-hover/about:text-stone-50 transition-colors duration-200 flex items-center"}
                        href="/#categories">
                        <span>Dowiedz się więcej</span>
                        <ArrowRightToLine
                            className={"text-lg text-amber-400 group-hover/about:text-stone-50 ml-2 transition-colors duration-200"}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}