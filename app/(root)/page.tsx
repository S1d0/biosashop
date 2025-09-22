import { Suspense } from 'react';
import {getProductFamilies} from "@/lib/actions/product/actions";
import { ProductsSectionSkeleton } from "@/components/ui/product-skeleton";
import Hero from "@/components/landing/hero";
import ReactCookieBot from "react-cookiebot";
import WebVitalsReporter from "@/components/web-vitals-reporter";
import LandingProducts from "@/components/landing/landing-products";
import TerraSection from "@/components/landing/terra-section";
import AquaSection from "@/components/landing/aqua-section";
import AboutPage from "@/components/landing/about";
import TestimonialsPage from "@/components/landing/testimonials";
import CtaPage from "@/components/landing/cta";

// Create a separate component for products that can be suspended
async function ProductsSection() {
  const products = await getProductFamilies();
  return <LandingProducts products={products} />;
}

export default function Home() {
  return (
    <main className='bg-background text-foreground min-h-screen'>
      <WebVitalsReporter />
      <ReactCookieBot language={"PL"} domainGroupId={"4fb4efaf-0ad6-4d46-8661-c5fe0b97ff02"} />
      
      {/* Hero loads immediately */}
      <Hero />
      
      <Suspense fallback={<ProductsSectionSkeleton />}>
        <ProductsSection />
      </Suspense>
      
      <TerraSection />
      <AquaSection />
      <AboutPage />
      <TestimonialsPage className="py-20 bg-background" />
      <CtaPage />
    </main>
  );
}
