import {getProductBySlug} from "@/lib/actions/product/actions";
import ProductPrice from "@/components/shared/products/product-price";
import {Card, CardContent } from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import ProductImages from "@/components/shared/products/product-images";


export default async function ProductDetailsPage(props: {
    params: Promise<{slug: string}>
}){
    const {slug} = await props.params;
    const product = await getProductBySlug(slug);

    return (
        <>
        <section>
            <div className={"flex flex-col gap-10"}>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Column */}
                <div className="col-span-2">
                    <ProductImages images={product.images} />
                </div>
                {/*Details Column */}
                <div className="col-span-2">
                 <div className="flex flex-col gap-6">
                     <div className={"flex flex-col gap-2"}>
                         <p className={"text-sm"}>{product.brand} {product.category}</p>
                         <h1 className={"font-bold text-4xl"}>{product.name}</h1>
                     </div>
                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                         <ProductPrice value={product.price}
                                       className={"w-24 tracking-wider rounded-full bg-green-100 text-green-500 py-2 px-5"} />
                     </div>
                     <h3 className={"font-bold text-xl"}>Opis produktu</h3>
                     <p>{product.description}</p>
                 </div>
                </div>
                {/* Action column  */}
                <div>
                    <Card>
                        <CardContent className={"px-4 pt-4 flex flex-col gap-4 justify-center"}>
                            <div className={"flex justify-between"}>
                                <p className={"font-semibold"}>Cena</p>
                                <ProductPrice value={product.price} className={"pr-2"}/>
                            </div>
                            <div className={"flex justify-between"}>
                                <p className={"font-semibold"}>Status</p>
                                {product.stock > 0
                                    ? <Badge variant={"outline"} className={"bg-green-100 px-4"}>W magazynie</Badge>
                                    : <Badge variant={"destructive"} className={"px-4"}>Brak w magazynie</Badge>
                                }
                            </div>
                            {product.stock > 0 &&
                            <div className={"flex justify-center items-center"}>
                                <Button className={"w-full"}>
                                  Dodaj do koszyka
                                </Button>
                            </div>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className={"flex mt-4 md:mt-10"}>
                <h2 className={"font-bold text-2xl"}>Sprawdz nasze pozostałe produkty</h2>

            </div>
            </div>
        </section>
        </>
    );
}