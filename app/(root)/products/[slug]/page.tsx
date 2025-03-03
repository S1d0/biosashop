import ProductPrice from "@/components/shared/products/product-price";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import ProductImages from "@/components/shared/products/product-images";
import {getProductVariant} from "@/lib/actions/product/actions";


export default async function ProductDetailsPage(props: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await props.params;
    const product = await getProductVariant(slug);

    return (
        <section>
            <div className={"container mx-auto flex flex-col py-12 md:py-32"}>
                <div className="grid grid-cols-1 md:grid-cols-5">
                    {/* Images Column */}
                    <div className="col-span-2">
                        <ProductImages images={product.images}/>
                    </div>
                    {/*Details Column */}
                    <div className="col-span-2">
                        <div className="flex flex-col gap-6">
                            <div className={"flex flex-col"}>
                                <h1 className={"font-bold text-3xl"}>Rozmiar - {product.name}</h1>
                                <div className="flex gap-3 py-2 ">
                                    {product.categories
                                        .map((category) =>
                                        <Badge variant={"outline"} className={"text-sm"}
                                               key={category}>{category}</Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <ProductPrice value={product.price}
                                              className={"w-32 flex justify-center font-bold rounded-xl bg-green-100 text-green-600 py-2 px-2"}/>
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
    );
}