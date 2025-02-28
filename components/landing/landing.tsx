import Hero from "@/components/landing/hero";
import LandingProduct from "@/components/shared/products/products-landing";
import Categories from "@/components/shared/categories/categories";
import CtaPage from "@/components/landing/cta";
import Testimonial from "@/components/shared/testimonials/testimonial";

export default function LandingPage() {

    return (
        <div>
            <Hero />
            <Categories/>
            <LandingProduct/>
            <Testimonial/>
            <CtaPage/>
        </div>
    )

}