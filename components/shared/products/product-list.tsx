import ProductCard from "@/components/shared/products/product-card";

export default function ProductList({data, title, limit, showFavourites=false}: {
  data: any,
  title?: string,
  limit?: number,
  showFavourites?:boolean,
}) {
    const filteredData = showFavourites ? data.filter(product => product.favourite) : data;
    const limitedData = limit ? filteredData.slice(0, limit) : data;

  return (
      <div className={"my-10"}>
        <h2 className={"h2 font-bold text-2xl mb-2"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"}>
          {data.length > 0
              ? limitedData?.map((product, index) => (
                  <ProductCard product={product} key={index}/>
              ))
              : <div>Brak produktów</div>}
        </div>
      </div>
  )
}