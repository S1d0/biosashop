import ProductCard from "@/components/shared/products/product-card";
import {Product} from "@/types/product";

export default function ProductList({data, title, limit, showFavourites=false}: {
  data: Product[],
  title?: string,
  limit?: number,
  showFavourites?:boolean,
}) {
    const filteredData = showFavourites ? data.filter(product => product.favourite) : data;
    const limitedData = limit && limit < filteredData.length ? filteredData.slice(0, limit) : filteredData;

  return (
      <div className={"my-10"}>
        <h2 className={"h2 font-bold text-2xl mb-2"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"}>
          {limitedData.length > 0
              ? limitedData?.map((product, index) => (
                  <ProductCard product={product} key={index}/>
              ))
              : <div>Brak produktów</div>}
        </div>
      </div>
  )
}