import {Product} from "@/components/products/type";


export const products: Product[] = [
    {
        id: "1",
        name: "Terra biosa 20L",
        description: "Popraw wyniki gleby ulepsz jakosc",
        images: ["/products/terra/terra20L.jpg"],
        price: {
            id: "p1",
            amount: 1590, // Amount in pln
            display_amount: "159,00",
        }
    },
    {
        id: "2",
        name: "Aqua biosa 20L",
        description: "Popraw wyniki wody ulepsz jakosc",
        images: ["/products/aqua/aqua20L.jpg"],
        price: {
            id: "p1",
            amount: 2590, // Amount in pln
            display_amount: "159,00",
        }
    },
    {
        id: "3",
        name: "Aqua biosa 10L",
        description: "Popraw wyniki wody ulepsz jakosc",
        images: ["/products/aqua/aqua10L.jpg"],
        price: {
            id: "p1",
            amount: 1590, // Amount in pln
            display_amount: "159,00",
        }
    },

    {
        id: "4",
        name: "Terra biosa 10L",
        description: "Popraw wyniki gleby ulepsz jakosc",
        images: ["/products/terra/terra10L.jpg"],
        price: {
            id: "p1",
            amount: 1590, // Amount in pln
            display_amount: "159,00",
        }
    },
]