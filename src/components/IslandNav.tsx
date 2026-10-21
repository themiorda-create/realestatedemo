import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export function IslandNav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Section tracking
            const sections = ["hero", "philosophy", "projects", "numbers", "lifestyle", "contact"];
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Canvas", href: "#hero", id: "hero" },
        { name: "Philosophy", href: "#philosophy", id: "philosophy" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Metrics", href: "#numbers", id: "numbers" },
        { name: "Lifestyle", href: "#lifestyle", id: "lifestyle" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div
                    className={`pointer-events-auto flex items-center justify-between gap-6 px-6 py-3.5 rounded-full border transition-all duration-500 max-w-5xl w-full backdrop-blur-xl ${scrolled
                            ? "bg-background/85 border-border/80 shadow-2xl shadow-black/10"
                            : "bg-background/40 border-white/10 shadow-lg"
                        }`}
                >
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="flex items-center gap-2.5 group cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/25">
                            <Compass className="w-4 h-4 text-accent transition-transform duration-700 group-hover:rotate-180" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-lg tracking-wider font-medium leading-none">
                                AURELIA
                            </span>
                            <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase mt-0.5">
                                ARCHITECTS
                            </span>
                        </div>
                    </a>

                    {/* Nav Links - Desktop */}
                    <nav className="hidden md:flex items-center gap-1 bg-secondary/40 p-1 rounded-full border border-border/40">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 relative ${isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-background rounded-full border border-border shadow-xs"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
                        >
                            <span>Consultation</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full bg-secondary/60 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-4 top-24 z-40 md:hidden bg-background/95 border border-border/80 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl"
                    >
                        <nav className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/60 transition-colors text-sm font-medium tracking-wider"
                                >
                                    <span>{item.name}</span>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                                </a>
                            ))}
                            <div className="pt-4 mt-2 border-t border-border">
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 text-xs uppercase tracking-widest bg-accent text-accent-foreground font-medium rounded-xl hover:bg-accent/90 transition-all"
                                >
                                    <span>Book Consultation</span>
                                    <Sparkles className="w-4 h-4" />
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
