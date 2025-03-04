import {DropletIcon, Globe, Leaf} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

type Category = {
    id: string;
    name: string;
    icon: React.ReactElement;
    description: string;
}

const categories: Category[] = [
    {
        id: "soil",
        name: "Gleba",
        icon: <Leaf className="h-6 w-6 text-green-600" />,
        description: "Bogate w składniki odżywcze rozwiązania dla optymalnego wzrostu roślin",
    },
    {
        id: "water",
        name: "Woda",
        icon: <DropletIcon className="h-6 w-6 text-blue-600" />,
        description: "Produkty do oczyszczania i uzdatniania wody",
    },
    {
        id: "garden",
        name: "Ogród",
        icon: <Leaf className="h-6 w-6 text-emerald-600" />,
        description: "Produkty do pielęgnacji ogrodu dla zdrowych roślin",
    },
    {
        id: "eco",
        name: "Ekologiczne",
        icon: <Globe className="h-6 w-6 text-teal-600" />,
        description: "Zrównoważone rozwiązania dla bardziej zielonej planety",
    },
]

export default function Categories() {

    return (
        <section id="categories" className="w-full py-12 md:py-24 lg:pt-32 md:pb-4 md:py-0 bg-gradient-to-b from-stone-50 to-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nasze Kategorie</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Odkryj naszą gamę produktów zaprojektowanych, aby pielęgnować i chronić nasze środowisko.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Card key={category.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-center mb-4">{category.icon}</div>
                                <CardTitle>{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">{category.description}</p>
                            </CardContent>
                            <div className="p-6 mt-auto border-t">
                                <Button variant="outline" size="sm" className="w-full">
                                    Odkryj
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}