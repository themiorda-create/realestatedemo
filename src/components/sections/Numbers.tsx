import { motion } from "framer-motion";
import { Award, Building2, Globe, ShieldCheck } from "lucide-react";

const stats = [
    {
        icon: Building2,
        value: "140+",
        label: "Private Estates Designed",
        subtext: "Across 18 coastal & mountain locations worldwide",
    },
    {
        icon: Globe,
        value: "$2.8B",
        label: "Total Portfolio Value",
        subtext: "Bespoke architectural creations delivered",
    },
    {
        icon: Award,
        value: "32",
        label: "International Honors",
        subtext: "Including Pritzker nominee recognitions",
    },
    {
        icon: ShieldCheck,
        value: "100%",
        label: "Bespoke Customization",
        subtext: "No two residences ever share a blueprint",
    },
];

export function Numbers() {
    return (
        <section id="numbers" className="px-6 py-28 md:px-16 md:py-36 bg-secondary/30 border-y border-border/60">
            <div className="mx-auto max-w-[1400px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <p className="text-[11px] tracking-[0.35em] text-accent uppercase font-medium">
                            Metrics & Precision
                        </p>
                        <h2 className="mt-4 font-serif text-3xl md:text-5xl font-light">
                            Architectural Excellence in Numbers
                        </h2>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-md font-light">
                        Over two decades of defining high-end luxury residential spaces through relentless engineering and uncompromised detail.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="group p-8 rounded-2xl bg-background border border-border/80 hover:border-accent/80 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="mt-6 font-serif text-4xl md:text-5xl font-light tracking-tight group-hover:text-accent transition-colors">
                                    {stat.value}
                                </div>
                                <div className="mt-3 text-sm font-medium tracking-wide">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground font-light leading-relaxed">
                                    {stat.subtext}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
