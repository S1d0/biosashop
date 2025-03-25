import LandingPage2 from "@/components/landing/landing2";
import {getProductFamilies} from "@/lib/actions/product/actions";

export default async function Home() {
  const products = await getProductFamilies();
  return (
    <main className='bg-background text-foreground min-h-screen'>
      <LandingPage2 products={products} />
    </main>
  );
}
