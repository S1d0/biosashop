'use client'

import Link from "next/link";
import React, {useState} from "react";
import {LucidePhoneCall, LucideStore} from "lucide-react";
import {EnquiryForm} from "@/components/shared/contact/contact-form";
import {
    Dialog,
    DialogContent, DialogDescription, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

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
                            Dołącz do tysięcy zadowolonych klientów na całym świecie i doświadcz różnicy, jaką
                            wprowadzają nasze
                            produkty.
                        </p>
                    </div>
                    <div className="flex">
                        <CallToAction/>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CallToAction() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={"relative group w-full"}>
            <div
                className={"absolute -inset-0.5 group-hover:-inset-1 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"}></div>
            <div
                className={"relative flex bg-slate-800 rounded-lg leading-none items-center divide-x divide-gray-300 px-6 py-3"}>
                <div className={"group/products items-center justify-center"}>
                    <Link
                        className={"pr-6 flex gap-2 justify-center items-center text-yellow-400 font-medium group-hover/products:text-stone-50"}
                        href="/products">
                        <LucideStore
                            className={"text-sm text-lime-500 inline-flex group-hover/products:text-stone-50 w-4 h-4"}/>
                        <span>Przejdź do sklepu</span>
                    </Link>
                </div>
                <div className="group/about">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div
                                className={"flex items-center pl-6 justify-center text-lime-500 font-medium group-hover/about:text-stone-50 transition-colors duration-200"}>
                                <button>Zadaj pytanie</button>
                                <LucidePhoneCall
                                    className={"h-4 w-4 text-sm text-amber-400 group-hover/about:text-stone-50 ml-2 transition-colors duration-200"}/>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl md:px-8 md:py-8">
                            <DialogTitle asChild>
                                <h2 className="text-2xl font-bold mb-4">Skontaktuj się z nami</h2>
                            </DialogTitle>
                            <DialogDescription>
                                Odezwij się do nas jeśli chcesz wiedzieć więcej, lub masz pytania co do dostawy
                            </DialogDescription>
                            <EnquiryForm onSuccess={handleClose} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
