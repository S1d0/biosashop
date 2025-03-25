import React from "react";


export default function AboutPage() {
    return (

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
    )
}