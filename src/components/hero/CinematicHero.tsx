import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 270;

function getFramePath(index: number): string {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/frames/ezgif-frame-${frameNumber}.jpg`;
}

interface Chapter {
    id: string;
    badge: string;
    title: string;
    subtitle: string;
    startPct: number;
    endPct: number;
}

const CHAPTERS: Chapter[] = [
    {
        id: "schematic",
        badge: "01 / CONCEPT & SCHEMATIC",
        title: "ARCHITECTURAL PRECISION",
        subtitle: "From raw blueprint geometry to structural harmony.",
        startPct: 0,
        endPct: 22,
    },
    {
        id: "structure",
        badge: "02 / RAW MATERIALS",
        title: "CONCRETE & TIMBER",
        subtitle: "Forging sustainable strength directly into the natural topography.",
        startPct: 25,
        endPct: 48,
    },
    {
        id: "interior",
        badge: "03 / SPATIAL SANCTUARY",
        title: "LIGHT & SHADOW",
        subtitle: "Crafted interior surfaces engineered for acoustic calm.",
        startPct: 52,
        endPct: 75,
    },
    {
        id: "residence",
        badge: "04 / COMPLETED VILLA",
        title: "LIVING ART",
        subtitle: "Where luxury design transcends form to create timeless home.",
        startPct: 78,
        endPct: 100,
    },
];

export function CinematicHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const [loadedCount, setLoadedCount] = useState(0);
    const [isPreloaded, setIsPreloaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);

    // Framer Motion scroll binding
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndexMotion = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
    const progressPctMotion = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const [scrollPct, setScrollPct] = useState(0);

    // Render a specific frame onto the canvas with object-fit cover
    const renderFrame = useCallback((frameIdx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[frameIdx];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        // Object-fit: cover implementation
        const canvasAspect = displayWidth / displayHeight;
        const imgAspect = img.naturalWidth / img.naturalHeight;

        let drawWidth = displayWidth;
        let drawHeight = displayHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
            drawHeight = displayWidth / imgAspect;
            offsetY = (displayHeight - drawHeight) / 2;
        } else {
            drawWidth = displayHeight * imgAspect;
            offsetX = (displayWidth - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    }, []);

    // Preload frames
    useEffect(() => {
        let isCancelled = false;
        const images: HTMLImageElement[] = [];

        let count = 0;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                if (isCancelled) return;
                count++;
                setLoadedCount(count);
                if (count === TOTAL_FRAMES) {
                    setIsPreloaded(true);
                }
                if (i === 0) {
                    renderFrame(0);
                }
            };
            img.onerror = () => {
                if (isCancelled) return;
                count++;
                setLoadedCount(count);
            };
            images.push(img);
        }
        imagesRef.current = images;

        return () => {
            isCancelled = true;
        };
    }, [renderFrame]);

    // Sync scroll to frame index
    useMotionValueEvent(frameIndexMotion, "change", (latest) => {
        const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
        setCurrentFrame(idx);
        renderFrame(idx);
    });

    useMotionValueEvent(progressPctMotion, "change", (latest) => {
        setScrollPct(Math.round(latest));
        const currentChap = CHAPTERS.find((c) => latest >= c.startPct && latest <= c.endPct) || CHAPTERS[0];
        if (currentChap.id !== activeChapter.id) {
            setActiveChapter(currentChap);
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            renderFrame(currentFrame);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentFrame, renderFrame]);

    const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

    return (
        <div id="hero" ref={containerRef} className="relative h-[480vh] w-full bg-black text-white">
            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
                {/* Canvas Element */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/20 to-black/70" />

                {/* Preloader overlay */}
                <AnimatePresence>
                    {!isPreloaded && loadedCount < 30 && (
                        <motion.div
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-6"
                        >
                            <div className="flex flex-col items-center gap-4 max-w-xs w-full text-center">
                                <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif text-xl tracking-wider font-light">LOADING CANVAS</h3>
                                    <p className="text-xs text-muted-foreground tracking-widest uppercase">
                                        Syncing 270 High-Res Frames ({loadPercent}%)
                                    </p>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                    <motion.div
                                        className="bg-accent h-full transition-all duration-300"
                                        style={{ width: `${loadPercent}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Top HUD Bar */}
                <div className="relative z-20 flex items-center justify-between px-6 pt-24 md:px-12 md:pt-28">
                    {/* Active Chapter Badge */}
                    <div className="flex items-center gap-3 bg-black/60 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase">
                            {activeChapter.badge}
                        </span>
                    </div>

                    {/* Frame & Progress Counter */}
                    <div className="hidden sm:flex items-center gap-4 bg-black/60 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full font-mono text-xs text-white/80">
                        <div>
                            <span className="text-accent font-semibold">FRAME</span>{" "}
                            {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_FRAMES}
                        </div>
                        <div className="w-px h-3 bg-white/20" />
                        <div>
                            <span className="text-accent font-semibold">SCRUB</span> {scrollPct}%
                        </div>
                    </div>
                </div>

                {/* Middle Dynamic Text Overlay */}
                <div className="relative z-20 px-6 pb-16 md:px-16 max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeChapter.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-[10px] tracking-[0.3em] uppercase text-accent font-medium">
                                <Layers className="w-3 h-3 text-accent" />
                                <span>Interactive Scroll Canvas</span>
                            </div>
                            <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.02] tracking-tight text-white drop-shadow-2xl">
                                {activeChapter.title}
                            </h1>
                            <p className="text-base md:text-xl font-sans text-white/80 max-w-xl font-light leading-relaxed">
                                {activeChapter.subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scroll Down Prompt */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="mt-8 flex items-center gap-3 text-xs tracking-[0.25em] text-white/60 uppercase"
                    >
                        <ChevronDown className="w-4 h-4 text-accent" />
                        <span>Scroll down to expand canvas animation</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
