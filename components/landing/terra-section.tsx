import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import React from "react";

export default function TerraSection() {
    return (

        <section id="terra" className="py-12 relative">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="text-primary">Microbiosa Terra</span>
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Our revolutionary soil enhancement solution that transforms any terrain into a thriving
                            ecosystem.
                            Packed with beneficial microorganisms, Microbiosa Terra revitalizes depleted soil,
                            increases nutrient
                            availability, and promotes robust plant growth.
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Enhances soil structure and fertility</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Reduces need for chemical fertilizers</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>Promotes sustainable agriculture</span>
                            </li>
                        </ul>
                        <Button className='group'>
                            Explore Terra <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                        </Button>
                    </div>
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        className="relative h-[400px] rounded-xl overflow-hidden order-1 md:order-2 border border-white/20 shadow-xl"
                    >
                        <Image src="/hero/l2.jpg?height=800&width=600" alt="Microbiosa Terra" fill
                               className="object-cover"/>
                    </motion.div>
                </div>
            </div>
        </section>

    )
}