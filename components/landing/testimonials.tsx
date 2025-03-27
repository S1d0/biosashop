import {motion} from "framer-motion";
import React from "react";

export default function TestimonialsPage({className}: {className: string}) {

    return (
        <section className={className}>
            <div className="container px-4 md:px-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        What Our <span className="text-primary">Customers</span> Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{y: -10}}
                                className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                            >
                                <div className="flex items-center mb-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-4">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Customer {i}</h4>
                                        <p className="text-sm text-muted-foreground">Verified Buyer</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    &ldquo;The results were incredible. After using
                                    Microbiosa {i % 2 === 0 ? "Terra" : "Aqua"} for just a few
                                    weeks, I noticed a significant improvement in
                                    my {i % 2 === 0 ? "garden" : "pond"}. Highly
                                    recommended!&ldquo;
                                </p>
                                <div className="mt-4 flex">
                                    {[...Array(5)].map((_, j) => (
                                        <span key={j} className="text-primary">
                        ★
                      </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}