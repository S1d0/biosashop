"use client";

import Image from "next/image";
import { Leaf, Star, Users } from "lucide-react";
import CtaPage from "@/components/landing/cta";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Historia Naszej
                                Rodziny</h2>
                            <div className="mt-4 space-y-4">
                                <p className="text-muted-foreground md:text-lg">
                                    Od ponad dwóch dekad nasza rodzina jest zaangażowana w tworzenie zrównoważonych
                                    rozwiązań dla gleby
                                    i wody. To, co zaczęło się jako mały projekt ogrodowy, rozrosło się do globalnego
                                    biznesu,
                                    obsługującego klientów w ponad 20 krajach.
                                </p>
                                <p className="text-muted-foreground md:text-lg">
                                    Wierzymy w współpracę z naturą, a nie przeciwko niej. Nasze produkty są opracowywane
                                    z troską, przy
                                    użyciu zrównoważonych praktyk i naturalnych składników, aby zapewnić ich
                                    skuteczność, jednocześnie
                                    dbając o naszą planetę.
                                </p>
                                <p className="text-muted-foreground md:text-lg">
                                    Dziś nadal wprowadzamy innowacje i rozszerzamy naszą linię produktów, zawsze
                                    pozostając wierni
                                    naszym podstawowym wartościom: zrównoważonemu rozwojowi, jakości i rodzinie.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[500px] overflow-hidden rounded-xl">
                            <Image
                                src="/about-owner.png"
                                alt="Właściciele rodzinnego biznesu w swoim ogrodzie"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="mt-16 grid place-items-center">
                        <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                            <Image
                                src="/images/world-map.jpg"
                                alt="Mapa świata pokazująca globalną obecność"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <h3 className="text-3xl font-bold text-white">Zaufanie w ponad 20 krajach na całym
                                    świecie</h3>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Nasze
                            Wartości</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <Leaf className="h-6 w-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-bold">Zrównoważony Rozwój</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Wszystkie nasze produkty są tworzone z myślą o środowisku, wykorzystując naturalne
                                    składniki i ekologiczne procesy.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <Star className="h-6 w-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-bold">Jakość</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Nieustannie dążymy do doskonałości, oferując najwyższej jakości produkty, które
                                    przynoszą realne rezultaty.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-primary/10 p-4">
                                    <Users className="h-6 w-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-bold">Rodzina</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Jako firma rodzinna, pielęgnujemy głębokie relacje, zarówno wewnątrz firmy, jak i z
                                    naszymi klientami.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CtaPage/>
        </main>
    );
}