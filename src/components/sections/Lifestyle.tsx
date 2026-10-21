import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Droplets, Volume2, Shield } from "lucide-react";
import lifestyleImg from "@/assets/lifestyle.jpg";

const features = [
    {
        id: "light",
        icon: Sun,
        title: "Solar Axis Alignment",
        desc: "Every window glass orientation is calculated according to the natural trajectory of the sun to optimize natural daylight throughout all seasons.",
    },
    {
        id: "water",
        icon: Droplets,
        title: "Reflecting Waterfalls & Pools",
        desc: "Cascading infinity pools and internal courtyard water features designed to cool ambient micro-climates naturally.",
    },
    {
        id: "acoustic",
        icon: Volume2,
        title: "Sub-Zero Acoustic Insulation",
        desc: "Acoustically isolated floorboards and sound-absorbing timber slats eliminate noise transfer between living quarters.",
    },
    {
        id: "security",
        icon: Shield,
        title: "Biometric Spatial Security",
        desc: "Seamless, invisible smart locks and perimeter surveillance built directly into raw stone pillars without compromising aesthetics.",
    },
];

export function Lifestyle() {
    const [activeTab, setActiveTab] = useState(features[0].id);
    const selectedFeature = features.find((f) => f.id === activeTab) || features[0];

    return (
        <section id="lifestyle" className="px-6 py-32 md:px-16 md:py-48 bg-background">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="max-w-2xl space-y-4">
                    <p className="text-[11px] tracking-[0.35em] text-accent uppercase font-medium">
                        Spatial Experience
                    </p>
                    <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">
                        Curated Living Sanctuaries
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-light">
                        Luxury is not defined by excess, but by the effortless flow of air, light, privacy, and touch.
                    </p>
                </div>

                {/* Feature Tabs & Image Grid */}
                <div className="mt-16 grid gap-12 lg:grid-cols-12 items-center">
                    {/* Interactive Feature Selector List */}
                    <div className="lg:col-span-5 space-y-4">
                        {features.map((feat) => {
                            const Icon = feat.icon;
                            const isSelected = activeTab === feat.id;

                            return (
                                <button
                                    key={feat.id}
                                    onClick={() => setActiveTab(feat.id)}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${isSelected
                                            ? "bg-secondary/60 border-accent/60 shadow-lg shadow-black/5"
                                            : "bg-background border-border/60 hover:border-border hover:bg-secondary/20"
                                        }`}
                                >
                                    <div
                                        className={`p-3 rounded-xl transition-colors ${isSelected
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-light">{feat.title}</h3>
                                        {isSelected && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-2 text-xs text-muted-foreground font-light leading-relaxed"
                                            >
                                                {feat.desc}
                                            </motion.p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Lifestyle Showcase Image */}
                    <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-border shadow-2xl">
                        <img
                            src={lifestyleImg}
                            alt="Luxury interior spatial design"
                            className="w-full h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-[10px] tracking-[0.25em] uppercase w-fit">
                                <Sparkles className="w-3 h-3" />
                                <span>SPATIAL FOCUS: {selectedFeature.title}</span>
                            </div>
                            <p className="mt-3 text-sm text-white/80 font-light max-w-lg">
                                {selectedFeature.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
