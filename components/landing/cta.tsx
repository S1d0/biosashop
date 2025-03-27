import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import React from "react";

export default function CtaPage() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Environment?</h2>
                    <p className="mb-8">
                        Join thousands of satisfied customers who have experienced the Microbiosa difference. Start
                        your journey
                        to a healthier, more sustainable environment today.
                    </p>
                    <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                        Shop Now <ShoppingCart className="ml-2 h-5 w-5"/>
                    </Button>
                </div>
            </div>
        </section>
    )
}