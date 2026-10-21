import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IslandNav } from "@/components/IslandNav";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Projects } from "@/components/sections/Projects";
import { Numbers } from "@/components/sections/Numbers";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactFooter } from "@/components/sections/ContactFooter";

const title = "Luxury Residential Architecture — Cinematic Portfolio";
const description =
  "A cinematic, scroll-driven portfolio template for private luxury homes: from blueprint and steel to finished interior. Where vision becomes reality.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <IslandNav />
      <main className="bg-background text-foreground">
        <CinematicHero />
        <Philosophy />
        <Projects />
        <Numbers />
        <Lifestyle />
        <Testimonials />
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}

