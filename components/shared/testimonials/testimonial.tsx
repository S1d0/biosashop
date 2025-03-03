import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getTestimonies} from "@/lib/actions/testimony/actions";

export default async function Testimonial() {
    const testimonials = await getTestimonies(4)
    return (
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Co Mówią Nasi Klienci</h2>
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
                                <p className="text-muted-foreground">"{testimonial.text}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}