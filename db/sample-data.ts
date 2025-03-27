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
                name: "Terra S",
                description: "Idealne rozwiązanie dla małych ogrodów i doniczek",
                images: ["/products/terra/terra1L.jpg"],
                features: ["Do 10m² powierzchni", "Wydajność do 2 miesięcy", "Naturalne składniki"],
                price: 4499,
                size: "1L",
                sku: "ter-bio-comp-01l",
                slug: "terra1l",
                stock: 100,
            },
            {
                name: "Terra M",
                description: "Dla średnich ogrodów i większych upraw",
                features: ["Do 50m² powierzchni", "Wydajność do 4 miesięcy", "Wzbogacone mikroorganizmy"],
                images: ["/products/terra/terra5L.jpg"],
                price: 8999,
                size: "5L",
                slug: "terra5l",
                sku: "ter-bio-comp-05l",
                stock: 40,
            },
            {
                name: "Terra L",
                description: "Profesjonalne rozwiązanie dla dużych powierzchni",
                features: ["Do 200m² powierzchni", "Wydajność do 6 miesięcy", "Formuła premium"],
                images: ["/products/terra/terra10L.jpg"],
                price: 17999,
                size: "10L",
                slug: "terra10l",
                sku: "ter-bio-comp-10l",
                stock: 20
            },
            {
                name: "Terra XL",
                description: "Do zastosowań profesjonalnych i dużych areałów. Wystarcza na około 200m² powierzchni.",
                features: ["Do 200m² powierzchni", "Wydajność do 12 miesięcy", "Duże stawy"],
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
                name: "Aqua S",
                features: ["Do 1000L wody", "Działanie do 2 miesięcy", "Krystalicznie czysta woda"],
                description: "Do małych oczek wodnych i akwariów",
                images: ["/products/aqua/aqua1L.jpg"],
                price: 5999,
                size: "1L",
                slug: "aqua1L",
                sku: "aqua-bio-comp-1l",
                stock: 50
            },
            {
                name: "Aqua M",
                description: "Doskonały do przydomowych ogrodów i średnich oczek wodnych.",
                features: ["Do 5000L wody", "Działanie do 4 miesięcy", "Redukcja glonów"],
                images: ["/products/aqua/aqua5L.jpg"],
                price: 11999,
                size: "5L",
                slug: "aqua5L",
                sku: "aqua-bio-comp-5l",
                stock: 30
            },
            {
                name: "Aqua L",
                features: ["Do 20000L wody", "Działanie do 12 miesięcy", "Pełna regeneracja ekosystemu"],
                description: "Przeznaczony do dużych ogrodów i stawów przydomowych.",
                images: ["/products/aqua/aqua10L.jpg"],
                price: 17999,
                size: " 10L",
                slug: "aqua10L",
                sku: "aqua-bio-comp-10l",
                stock: 15
            },
            {
                name: "Aqua XL",

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