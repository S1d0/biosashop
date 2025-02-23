import {Button} from "@/components/ui/button";
import Link from "next/link";
import {EllipsisVertical, ShoppingCart, UserIcon} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

export default function Menu() {
    return (
        <div className="flex justify-end items-center gap-3">
            <nav className="hidden md:flex w-full max-w-xs items-center">
                <Button asChild variant="ghost">
                    <Link href="/cart">
                        <ShoppingCart/>
                    </Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/signin">
                        <UserIcon/>
                    </Link>
                </Button>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className={"align-middle"}>
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent className={"flex items-start flex-col"}>
                        <SheetTitle className={"text-2xl tracking-widest"}>Menu</SheetTitle>
                        <Button asChild variant="ghost">
                            <Link href="/cart">
                                <ShoppingCart/>Twój koszyk
                            </Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/signin">
                                <UserIcon/>Twoje konto
                            </Link>
                        </Button>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}