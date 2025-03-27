import "@/components/landing/landing";
import {getProductFamilies} from "@/lib/actions/product/actions";
import LandingPage from "@/components/landing/landing";

export default async function Home() {
  const products = await getProductFamilies();
  return (
    <main className='bg-background text-foreground min-h-screen'>
      <LandingPage products={products} />
    </main>
  );
}
