import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck, Feat } from "lucide-react";
import philosophyImg from "@/assets/philosophy.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const principles = [
    {
        num: "01",
        title: "Structural Monolith",
        desc: "Every design originates from a singular architectural vision—blending heavy concrete mass with light glass transparency.",
    },
    {
        num: "02",
        title: "Acoustic Silence",
        desc: "Triple-glazed continuous thermal envelopes and sound-dampening interior acoustics engineered for deep tranquility.",
    },
    {
        num: "03",
        title: "Timeless Patina",
        desc: "Natural stone, brushed bronze, and charred timber materials that age with organic grace over centuries.",
    },
];

export function Philosophy() {
    return (
        <section id="philosophy" className="relative px-6 py-32 md:px-16 md:py-48 bg-background border-t border-border/40">
            <div className="mx-auto max-w-[1400px]">
                {/* Section Tagline */}
                <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-accent" />
                    <p className="text-[11px] tracking-[0.35em] text-accent uppercase font-medium">
                        Architectural Ethos
                    </p>
                </div>

                {/* Heading */}
                <div className="mt-8 grid gap-12 lg:grid-cols-12 items-end">
                    <div className="lg:col-span-8">
                        <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.08] tracking-tight">
                            We do not build houses to fit into landscapes. We sculpt structures that belong to them.
                        </h2>
                    </div>
                    <div className="lg:col-span-4">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                            Guided by minimalism and environmental harmony, our studio creates private residential sanctuaries where light, shadow, and materiality intersect.
                        </p>
                    </div>
                </div>

                {/* Image & Cards Layout */}
                <div className="mt-24 grid gap-12 lg:grid-cols-12 items-center">
                    {/* Main Visual Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="lg:col-span-7 relative group overflow-hidden rounded-2xl border border-border"
                    >
                        <img
                            src={philosophyImg}
                            alt="Minimalist luxury estate architectural philosophy"
                            className="w-full h-[520px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono">
                                FRAME ANALYSIS #084
                            </span>
                            <h3 className="mt-2 font-serif text-2xl font-light">
                                Continuous Glass Facade & Cantilevered Roof Line
                            </h3>
                        </div>
                    </motion.div>

                    {/* Principles Accordion / List */}
                    <div className="lg:col-span-5 space-y-10">
                        {principles.map((item, idx) => (
                            <motion.div
                                key={item.num}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.15 }}
                                className="group border-b border-border/60 pb-8 hover:border-accent transition-colors"
                            >
                                <div className="flex items-center gap-4 text-accent font-mono text-sm">
                                    <span>{item.num}</span>
                                    <div className="h-px w-6 bg-accent/40 group-hover:w-12 transition-all duration-500" />
                                </div>
                                <h3 className="mt-3 font-serif text-2xl font-light group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
