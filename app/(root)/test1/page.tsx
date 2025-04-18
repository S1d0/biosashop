'use client'
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {useCart} from "@/components/shared/cart/cart-provider";
import {formatPricePLN} from "@/lib/utils";
import ShippingForm from "@/components/checkout/shipping-form";


export default function CheckoutPage() {
    const {totalPrice, items} = useCart()
    const formattedTotalPrice = formatPricePLN(totalPrice);

    return (
        <section className='flex flex-col bg-green-200 container mx-auto px-4 py-12'>
            <div className="flex justify-between mb-8">
                <Link href="/products" className="flex items-center text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Wróć do sklepu
                </Link>
                <h1 className="text-3xl font-bold ml-auto mr-auto">Dostawa i płatność</h1>
            </div>
            <div className='flex'>
                <div className='w-3/5 bg-blue-200'>
                    <ShippingForm/>


                </div>
                <div className='w-2/5 bg-red-200'>
                    <h1 className='font-bold text-xl'>Podsumowanie</h1>
                    {items.map((item) => {
                            return (
                                <div key={item.product.id}>

                                    {item.product.name}
                                    {item.product.price}
                                    {item.quantity}
                                </div>)
                        }
                    )}
                </div>
            </div>
        </section>
    )
}