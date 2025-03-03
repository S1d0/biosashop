import Hero from "@/components/landing/hero";
import LandingProduct from "@/components/landing/products-landing";
import Categories from "@/components/shared/categories/categories";
import CtaPage from "@/components/landing/cta";
import Testimonial from "@/components/shared/testimonials/testimonial";
import {getProductFamilies} from "@/lib/actions/product/actions";

export default async function LandingPage() {
    const products = await getProductFamilies();

    return (
        <div>
            <Hero />
            <Categories/>
            <LandingProduct products={products}/>
            <Testimonial/>
            <CtaPage/>
        </div>
    )

}