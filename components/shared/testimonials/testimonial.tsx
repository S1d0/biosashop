import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type Testimony = {
    id: string;
    name: string;
    location: string;
    text: string;
}

const testimonials: Testimony[] = [
    {
        name: "Adam Nowak",
        id: "abc1",
        location: "Stany Zjednoczone",
        text: "Rewitalizator Gleby EcoSoil całkowicie odmienił mój ogród! Moje rośliny rozwijają się jak nigdy dotąd.",
    },
    {
        name: "Barbara Ożarowska",
        id: "abc2",
        location: "Włochy",
        text: "AquaPure znacząco poprawił jakość naszej wody. Gorąco polecam!",
    },
    {
        name: "Yuki Tanaka",
        id: "abc3",
        location: "Japonia",
        text: "Jako profesjonalny ogrodnik wypróbowałem wiele produktów, ale EcoSoil wyróżnia się skutecznością i zrównoważonym podejściem.",
    },
]

export default function Testimonial() {

    return (
        <section id="testimonials" className="w-full py-12 md:py-12 lg:py-12 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Co mówią
                            <span className={"font-bold text-primary/80"}> nasi </span>
                            Klienci</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Posłuchaj klientów z całego świata, którzy doświadczyli różnicy, jaką wprowadzają nasze
                            produkty.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div
                                    className="mx-auto h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                                </div>
                                <CardTitle className="mt-4">{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.location}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{testimonial.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}