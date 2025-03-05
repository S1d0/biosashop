import {hashSync} from "bcrypt-ts-edge";

export const productFamilies = [
    {
        name: "Rewitalizator Gleby Terra Biosa Composter",
        category: "terra",
        description:
            "Wysokiej jakości wzmacniacz gleby z naturalnymi minerałami i korzystnymi mikroorganizmami. Poprawia strukturę gleby i wspiera zdrowy wzrost roślin.",
        image: "/products/terra/family.jpg",
        slug: "/products?category=terra",
        variants: [
            {
                name: "Mały (do 5 m2)",
                categories: ["terra", "kwiaty", "ogródek"],
                description: "Idealny do małych ogródków i roślin doniczkowych. Wystarcza na około 10m² powierzchni.",
                images: ["/products/terra/terra1L.jpg"],
                price: 3499,
                size: "1L",
                sku: "ter-bio-comp-01l",
                slug: "terra1l",
                stock: 100,
            },
            {
                name: "Średni (do 50 m2)",
                categories: ["terra", "ogród", "trawnik"],
                description: "Odpowiedni dla średnich ogrodów przydomowych. Wystarcza na około 50m² powierzchni.",
                images: ["/products/terra/terra5L.jpg"],
                price: 9999,
                size: "5L",
                slug: "terra5l",
                sku: "ter-bio-comp-05l",
                stock: 40,
            },
            {
                name: "Duży (do 100 m2)",
                categories: ["terra", "trawnik"],
                description: "Przeznaczony do dużych ogrodów i małych gospodarstw. Wystarcza na około 100m² powierzchni.",
                images: ["/products/terra/terra10L.jpg"],
                price: 17999,
                size: "10L",
                slug: "terra10l",
                sku: "ter-bio-comp-10l",
                stock: 20
            },
            {
                name: "Przemysłowy (20L)",
                categories: ["terra", "pole", "szklarnia", "rolnictwo"],
                description: "Do zastosowań profesjonalnych i dużych areałów. Wystarcza na około 200m² powierzchni.",
                images: ["/products/terra/terra20L.jpg", "/products/terra/terra10L.jpg"],
                price: 29999,
                size: "20L",
                slug: "terra20l",
                sku: "ter-bio-comp-20l",
                stock: 10
            },
        ],
    },
    {
        name: "System filtracji Aqua Biosa",
        category: "aqua",
        description:
            "Zaawansowany system filtracji wody, który usuwa zanieczyszczenia i szkodliwe substancje. Zapewnia czystą, świeżą wodę dla Twojego domu i ogrodu.",
        image: "/products/aqua/family.jpg",
        slug: "/products?category=aqua",
        variants: [
            {
                name: "Mały (do 10L)",
                categories: ["aqua", "oczka", "doniczkowe"],
                description: "Idealny do małych oczek wodnych i systemów nawadniania roślin domowych.",
                images: ["/products/aqua/aqua1L.jpg"],
                price: 8999,
                size: "1L",
                slug: "aqua1L",
                sku: "aqua-bio-comp-1l",
                stock: 150
            },
            {
                name: "Średni (do 200L)",
                categories: ["aqua", "oczka", "stawy"],
                description: "Doskonały do przydomowych ogrodów i średnich oczek wodnych.",
                images: ["/products/aqua/aqua5L.jpg"],
                price: 14999,
                size: "5L",
                slug: "aqua5L",
                sku: "aqua-bio-comp-5l",
                stock: 30
            },
            {
                name: "Duży (do 500L)",
                categories: ["aqua", "stawy", "ogrody"],
                description: "Przeznaczony do dużych ogrodów i stawów przydomowych.",
                images: ["/products/aqua/aqua10L.jpg"],
                price: 24999,
                size: " 10L",
                slug: "aqua10L",
                sku: "aqua-bio-comp-10l",
                stock: 15
            },
            {
                name: "Przemysłowy (do 5000L)",
                categories: ["aqua", "stawy", "rolnictwo"],
                description: "Do zastosowań komercyjnych, gospodarstw rolnych i dużych zbiorników wodnych.",
                images: ["/products/aqua/aqua20L.jpg"],
                price: 49999,
                size: "20L",
                slug: "aqua20L",
                sku: "aqua-bio-comp-20l",
                stock: 10
            },
        ],
    },
]

export const contactInquries = [
    {
        name: "Michał Kowal",
        phone: "518-123-123",
        email: "kowal.michal@test.com",
        message: "dzien dobry pisze z pytaniem o terra biose, czy jest mozliwosc otrzymania testera?"
    },
    {
        name: "Anna",
        phone: "699123423",
        email: "ana.zaj@test.com",
        message: "Witam co polecacie na kwiatki i bluszcze? Ogrodek wielkosci 100 m2"
    }
]

export const users = [
    {
        name: 'Sebastian',
        email: 'admin@test.com',
        password: hashSync("testPassword", 10),
        role: 'admin',
    },
    {
        name: 'Basia',
        email: 'basia@test.com',
        password: hashSync("testPassword", 10),
        role: 'user',
    }
]