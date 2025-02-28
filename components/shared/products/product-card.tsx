import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import ProductPrice from "@/components/shared/products/product-price";
import {Product} from "@/types/product";

export default function ProductCard({product}: {product: Product}) {

  return (
      <Card className={"w-full max-w-sm"}>
        <CardHeader className={"p-0 items-center"}>
          <Link href={`/product/${product.slug}`}>
            <Image
                src={product.images[0]}
                alt={product.name}
                height={300}
                width={300}
            />
          </Link>
        </CardHeader>
        <CardContent className={"p-4 grid grid gap-4 items-center"}>
          <div className={"text-xs"}>{product.brand}</div>
          <Link href={`/product/${product.slug}`}>
            <h2 className={"text-xl font-semibold"}>{product.name}</h2>
          </Link>
          {product.stock > 0
              ? <PriceElement product={product} />
              : <div>Wszystko sprzedane...</div>
          }
        </CardContent>
      </Card>
  )
};

const PriceElement = ({product}: {product: Product}) => {
  return (
      <div className="flex justify-between">
        <ProductPrice value={product.price} className={"flex gap-0.5 tracking-tight font-bold"} />
        <div className="flex gap-2">
          <Button variant="outline" size={"lg"}>Kup</Button>
          <Button variant="outline" size={"lg"}>Do koszyka</Button>
        </div>
      </div>
  )
}