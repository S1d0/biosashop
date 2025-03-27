import {motion} from "framer-motion";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import React from "react";

export default function AquaSection() {

    return (

        <section id="aqua" className="py-20 relative bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        className="relative h-[400px] rounded-xl overflow-hidden border border-white/20 shadow-xl"
                    >
                        <Image src="/hero/landing-aqua.jpg" alt="Microbiosa Aqua" fill
                               className="object-cover"/>
                    </motion.div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span>Microbiosa Aqua</span>
                        </h2>
                        <p className="mb-6">
                            Our advanced water treatment solution that purifies and revitalizes water systems
                            naturally. Using
                            specialized beneficial microorganisms, Microbiosa Aqua balances aquatic ecosystems,
                            reduces harmful
                            contaminants, and creates healthier water environments.
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Purifies water naturally</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Restores aquatic ecosystems</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Sustainable water management solution</span>
                            </li>
                        </ul>
                        <Button variant="secondary">
                            Explore Aqua <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    );
}