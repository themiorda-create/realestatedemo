import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Compass, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const offices = [
    { city: "Zürich", address: "Gotthardstrasse 24, 8002 Zürich, Switzerland" },
    { city: "Tokyo", address: "5-7-2 Minami-Aoyama, Minato-ku, Tokyo 107-0062" },
    { city: "New York", address: "432 Park Avenue, Suite 4400, NY 10022" },
    { city: "London", address: "14 Berkeley Square, Mayfair, London W1J 6EB" },
];

export function ContactFooter() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "Coastal Villa",
        budget: "$5M - $10M",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        toast.success("Consultation Request Submitted", {
            description: "Our senior architectural partner will respond within 24 hours.",
        });
    };

    return (
        <footer id="contact" className="bg-black text-white px-6 pt-32 pb-16 md:px-16 border-t border-white/10">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid gap-16 lg:grid-cols-12">
                    {/* Left Column: Title & Office Locations */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <p className="text-[11px] tracking-[0.35em] text-accent uppercase font-mono">
                                Initiate Dialogue
                            </p>
                            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05]">
                                Let's discuss your sanctuary.
                            </h2>
                            <p className="mt-4 text-sm text-white/70 font-light max-w-md leading-relaxed">
                                We accept a limited commission of six private residential projects globally per year to preserve absolute craftsmanship.
                            </p>
                        </div>

                        {/* Offices */}
                        <div className="space-y-6 pt-4 border-t border-white/15">
                            <h3 className="text-xs tracking-[0.25em] text-accent uppercase font-mono">
                                Studio Locations
                            </h3>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {offices.map((off) => (
                                    <div key={off.city} className="space-y-1">
                                        <div className="flex items-center gap-2 font-serif text-lg font-light text-white">
                                            <MapPin className="w-3.5 h-3.5 text-accent" />
                                            <span>{off.city}</span>
                                        </div>
                                        <p className="text-xs text-white/60 font-light leading-relaxed">
                                            {off.address}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Inquiry Form */}
                    <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-3xl">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-16 text-center space-y-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-serif text-3xl font-light">Inquiry Received</h3>
                                <p className="text-sm text-white/70 max-w-sm mx-auto font-light">
                                    Thank you for reaching out. We have logged your details and will prepare a tailored architectural portfolio for your review.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 px-6 py-2.5 text-xs tracking-widest uppercase bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    Send another inquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Lord Harrison"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="harrison@estate.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                                            Typology
                                        </label>
                                        <select
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full bg-black/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                                        >
                                            <option>Coastal Cliff Villa</option>
                                            <option>Alpine Mountain Pavilion</option>
                                            <option>Desert Sanctuary</option>
                                            <option>Urban Penthouse</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                                            Estimated Investment
                                        </label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full bg-black/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                                        >
                                            <option>$3M – $5M</option>
                                            <option>$5M – $10M</option>
                                            <option>$10M – $25M+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                                        Architectural Vision / Notes
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe your site landscape, vision, or desired timeline..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.25em] rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/10 hover:scale-[1.01]"
                                >
                                    <span>Submit Commission Inquiry</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="mt-28 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
                    <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-accent" />
                        <span className="font-serif text-sm text-white">AURELIA ARCHITECTS</span>
                        <span>— © {new Date().getFullYear()} All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#hero" className="hover:text-white transition-colors">Back to top ↑</a>
                        <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
