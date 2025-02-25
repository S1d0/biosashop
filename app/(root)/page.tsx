import ProductList from "@/components/shared/products/product-list";
import {getLatestProducts} from "@/lib/actions/product/actions";

export default async function Home() {
  const mainTitle = "Nasze polecane produkty"
  const products = await getLatestProducts();

  return (
    <div>
      <ProductList data={products} title={mainTitle} limit={6} showFavourites={true} />
    </div>
  );
}
