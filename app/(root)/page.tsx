import ProductList from "@/components/shared/products/product-list";
import {products} from "@/db/sample-data";

export default function Home() {
  const mainTitle = "Nasze polecane produkty"
  return (
    <div>
      <ProductList data={products} title={mainTitle} limit={6} showFavourites={true} />
    </div>
  );
}
