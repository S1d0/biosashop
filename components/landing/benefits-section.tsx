import {ArrowRight, Droplets, Leaf} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

export default function BenefitSection() {
    return (
        <section className="py-12 bg-muted">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Our <span className="text-primary">Revolutionary</span> Products
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        className="bg-card/80 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/10">
                        <div className="flex items-center mb-4">
                            <Leaf className="h-8 w-8 text-primary mr-3"/>
                            <h3 className="text-2xl font-bold text-primary">Microbiosa Terra</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            A revolutionary soil enhancement solution that transforms any terrain into a thriving
                            ecosystem.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Soil Vitality</h4>
                                <p className="text-sm text-muted-foreground">
                                    Enhances soil structure and increases nutrient availability
                                </p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Eco-Friendly</h4>
                                <p className="text-sm text-muted-foreground">Reduces need for chemical fertilizers
                                    by up to 60%</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Plant Growth</h4>
                                <p className="text-sm text-muted-foreground">Promotes robust plant growth and higher
                                    yields</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Long-Lasting</h4>
                                <p className="text-sm text-muted-foreground">
                                    Continues working for up to 12 months after application
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <Link href="#terra">
                                <Button className="w-full">
                                    Learn More <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div
                        className="bg-card/80 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/10">
                        <div className="flex items-center mb-4">
                            <Droplets className="h-8 w-8 text-primary mr-3"/>
                            <h3 className="text-2xl font-bold text-primary">Microbiosa Aqua</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            An advanced water treatment solution that purifies and revitalizes water systems
                            naturally.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Water Clarity</h4>
                                <p className="text-sm text-muted-foreground">
                                    Reduces turbidity and improves water clarity within days
                                </p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Contaminant Reduction</h4>
                                <p className="text-sm text-muted-foreground">Breaks down harmful pollutants and
                                    excess nutrients</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Ecosystem Balance</h4>
                                <p className="text-sm text-muted-foreground">Restores natural balance to aquatic
                                    environments</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-primary">Versatile Use</h4>
                                <p className="text-sm text-muted-foreground">
                                    Suitable for ponds, lakes, aquariums, and water features
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <Link href="#aqua">
                                <Button className="w-full">
                                    Learn More <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}