import Link from "next/link";
import Image from "next/image";
import {APP_NAME} from "@/lib/constants";
import Menu from "@/components/shared/header/menu";

export default function Header() {
    return (
        <header className={"w-full border-b"}>
            <div className="max-w-7xl lg:mx-auto p-5 md:px-10 w-full flex items-center justify-between">
                <div className={"flex justify-start items-center"}>
                    <Link className={"flex justify-start items-center"} href="/">
                        <Image src="/next.svg" alt="icon" height={48} width={48}/>
                        <span className={"hidden lg:block font-bold text-3xl ml-2"}>{APP_NAME}</span>
                    </Link>
                </div>
                <Menu/>
            </div>
        </header>
    )
}