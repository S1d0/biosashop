'use client'

import React, {useEffect, useRef} from "react";
import { useInView, useAnimation} from "framer-motion"
import {ProductFamily} from "@/types/product";
import TestimonialsPage from "@/components/landing/testimonials";
import Hero from "@/components/landing/hero";
import LandingProducts from "@/components/landing/landing-products";
import CtaPage from "@/components/landing/cta";
import AboutPage from "@/components/landing/about";
import TerraSection from "@/components/landing/terra-section";
import AquaSection from "@/components/landing/aqua-section";

interface LandingPage2Props {
    products?: ProductFamily[]
}

export default function LandingPage({products}: LandingPage2Props) {
    const ref= useRef(null)
    const isInView = useInView(ref, {once: true})
    const animationControls = useAnimation()

    useEffect(() => {
        if(isInView) {
            // Fire animation
            animationControls.start("visible");
        }
    }, [isInView, animationControls]);

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Product Section */}
            <LandingProducts products={products} />

            {/* Terra Product Section */}
            <TerraSection />

            {/* Aqua Product Section */}
            <AquaSection/>

            {/* About Section */}
            <AboutPage />

            {/* Testimonials */}
            <TestimonialsPage className="py-20 bg-background"/>

            {/* CTA Section */}
            <CtaPage />

            {/* Cart */}
        </>
    );
}