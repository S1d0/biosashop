'use client'
import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import {motion} from "framer-motion"
import {ArrowRight, ChevronDown, ShoppingCart, Leaf, Droplets} from "lucide-react"

import {Button} from "@/components/ui/button"
import {ProductFamily} from "@/types/product";
import LandingProduct from "@/components/landing/products-landing";
import ProductFamilyPage from "@/components/shared/products/product-family2";

interface LandingPage2Props {
    products?: ProductFamily[]
}

export default function LandingPage2({products}: LandingPage2Props) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image src="/hero/hero.jpg" alt="Wheat Field" fill className="object-cover" priority/>
                </div>

                {/* Glass Effect Container */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 flex items-center justify-center h-[90%]">
                    <motion.div
                        initial={{opacity: 0, scale: 1}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8}}
                        className="backdrop-blur-sm bg-zinc-900/20 p-8 md:p-12 rounded-xl border border-white/30 shadow-xl w-full h-full max-w-5xl mx-auto flex items-center justify-center"
                    >
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
                                <span className="text-primary">Microbiosa</span> - Harnessing Nature's Power
                            </h1>
                            <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow">
                                Discover the revolutionary products that transform your environment, naturally.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg"
                                        className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm text-white">
                                    Shop Now <ShoppingCart className="ml-2 h-4 w-4"/>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{y: [0, 10, 0]}}
                    transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <ChevronDown className="h-8 w-8 text-white drop-shadow-lg"/>
                </motion.div>
            </section>

            {/* Product Section */}
            <section id="products" className="w-full py-12 md:py-16 lg:py-20 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                Our <span className="text-primary">Products</span>
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Choose the size that fits your needs
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl space-y-16 py-12">
                        {products!.map((family) => (
                            <div key={family.id}
                                 className="backdrop-blur-sm bg-card/30 p-6 md:p-8 rounded-xl border border-white/10">
                                <ProductFamilyPage family={family}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Benefits Overview */}
            <section className="py-16 bg-muted">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Our <span className="text-primary">Revolutionary</span> Products
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div
                            className="bg-card/80 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/10">
                            <div className="flex items-center mb-4">
                                <Leaf className="h-8 w-8 text-primary mr-3"/>
                                <h3 className="text-2xl font-bold text-primary">Microbiosa Terra</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                A revolutionary soil enhancement solution that transforms any terrain into a thriving
                                ecosystem.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Soil Vitality</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Enhances soil structure and increases nutrient availability
                                    </p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Eco-Friendly</h4>
                                    <p className="text-sm text-muted-foreground">Reduces need for chemical fertilizers
                                        by up to 60%</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Plant Growth</h4>
                                    <p className="text-sm text-muted-foreground">Promotes robust plant growth and higher
                                        yields</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Long-Lasting</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Continues working for up to 12 months after application
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link href="#terra">
                                    <Button className="w-full">
                                        Learn More <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="bg-card/80 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col h-full border border-white/10">
                            <div className="flex items-center mb-4">
                                <Droplets className="h-8 w-8 text-primary mr-3"/>
                                <h3 className="text-2xl font-bold text-primary">Microbiosa Aqua</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                An advanced water treatment solution that purifies and revitalizes water systems
                                naturally.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Water Clarity</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Reduces turbidity and improves water clarity within days
                                    </p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Contaminant Reduction</h4>
                                    <p className="text-sm text-muted-foreground">Breaks down harmful pollutants and
                                        excess nutrients</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Ecosystem Balance</h4>
                                    <p className="text-sm text-muted-foreground">Restores natural balance to aquatic
                                        environments</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 text-primary">Versatile Use</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Suitable for ponds, lakes, aquariums, and water features
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link href="#aqua">
                                    <Button className="w-full">
                                        Learn More <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terra Product Section */}
            <section id="terra" className="py-20 relative">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: scrollY > 200 ? 1 : 0}}
                        transition={{duration: 0.8}}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                <span className="text-primary">Microbiosa Terra</span>
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Our revolutionary soil enhancement solution that transforms any terrain into a thriving
                                ecosystem.
                                Packed with beneficial microorganisms, Microbiosa Terra revitalizes depleted soil,
                                increases nutrient
                                availability, and promotes robust plant growth.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Enhances soil structure and fertility</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Reduces need for chemical fertilizers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    <span>Promotes sustainable agriculture</span>
                                </li>
                            </ul>
                            <Button>
                                Explore Terra <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            transition={{duration: 0.3}}
                            className="relative h-[400px] rounded-xl overflow-hidden order-1 md:order-2 border border-white/20 shadow-xl"
                        >
                            <Image src="/hero/l2.jpg?height=800&width=600" alt="Microbiosa Terra" fill
                                   className="object-cover"/>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Aqua Product Section */}
            <section id="aqua" className="py-20 relative bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: scrollY > 600 ? 1 : 0}}
                        transition={{duration: 0.8}}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div
                            whileHover={{scale: 1.05}}
                            transition={{duration: 0.3}}
                            className="relative h-[400px] rounded-xl overflow-hidden border border-white/20 shadow-xl"
                        >
                            <Image src="/hero/landing-aqua.jpg" alt="Microbiosa Aqua" fill
                                   className="object-cover"/>
                        </motion.div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                <span>Microbiosa Aqua</span>
                            </h2>
                            <p className="mb-6">
                                Our advanced water treatment solution that purifies and revitalizes water systems
                                naturally. Using
                                specialized beneficial microorganisms, Microbiosa Aqua balances aquatic ecosystems,
                                reduces harmful
                                contaminants, and creates healthier water environments.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Purifies water naturally</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Restores aquatic ecosystems</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Sustainable water management solution</span>
                                </li>
                            </ul>
                            <Button variant="secondary">
                                Explore Aqua <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-muted">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            About <span className="text-primary">Microbiosa</span>
                        </h2>
                        <p className="text-muted-foreground">
                            We are dedicated to creating sustainable, natural solutions that work in harmony with the
                            environment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-primary">Our Mission</h3>
                            <p className="text-muted-foreground">
                                To revolutionize environmental care through innovative, microorganism-based solutions
                                that restore
                                natural balance without harmful chemicals.
                            </p>
                        </div>

                        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-primary">Our Approach</h3>
                            <p className="text-muted-foreground">
                                We harness the power of beneficial microorganisms to create products that work with
                                nature, not against
                                it, providing sustainable solutions for today's environmental challenges.
                            </p>
                        </div>

                        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-primary">Our Commitment</h3>
                            <p className="text-muted-foreground">
                                Every Microbiosa product is developed with a commitment to sustainability,
                                effectiveness, and
                                environmental responsibility.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-background">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: scrollY > 1000 ? 1 : 0}}
                        transition={{duration: 0.8}}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                            What Our <span className="text-primary">Customers</span> Say
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{y: -10}}
                                    className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-4">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Customer {i}</h4>
                                            <p className="text-sm text-muted-foreground">Verified Buyer</p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground">
                                        "The results were incredible. After using
                                        Microbiosa {i % 2 === 0 ? "Terra" : "Aqua"} for just a few
                                        weeks, I noticed a significant improvement in
                                        my {i % 2 === 0 ? "garden" : "pond"}. Highly
                                        recommended!"
                                    </p>
                                    <div className="mt-4 flex">
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} className="text-primary">
                        ★
                      </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: scrollY > 1400 ? 1 : 0}}
                        transition={{duration: 0.8}}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Environment?</h2>
                        <p className="mb-8">
                            Join thousands of satisfied customers who have experienced the Microbiosa difference. Start
                            your journey
                            to a healthier, more sustainable environment today.
                        </p>
                        <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                            Shop Now <ShoppingCart className="ml-2 h-5 w-5"/>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    );
}