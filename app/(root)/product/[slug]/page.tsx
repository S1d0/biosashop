import {getProductBySlug} from "@/lib/actions/product/actions";
import ProductPrice from "@/components/shared/products/product-price";


export default async function ProductDetailsPage(props: {
    params: Promise<{slug: string}>
}){
    const {slug} = await props.params;
    const product = await getProductBySlug(slug);

    return (
        <>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Column */}
                <div className="col-span-2">

                </div>
                {/*Details Column */}
                <div className="col-span-2">
                 <div className="flex flex-col gap-6">
                     <p>{product.brand} {product.category}</p>
                     <h1 className={"font-bold text-3xl"}>{product.name}</h1>
                     <p>{product.description}</p>
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                         <ProductPrice value={product.price} className={"w-24 tracking-wider rounded-full bg-green-500 text-green-50 py-2 px-5"} />
                     </div>
                 </div>
                </div>
            </div>

        </section>
        </>
    );
}