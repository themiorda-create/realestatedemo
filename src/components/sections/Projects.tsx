import { motion } from "framer-motion";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    title: "Residence One",
    place: "Coastal Cliff",
    year: "2025",
    image: project01,
    alt: "Cantilevered cliffside residence at dusk above the sea",
  },
  {
    title: "Residence Two",
    place: "Desert Valley",
    year: "2024",
    image: project02,
    alt: "Travertine desert villa with courtyard and reflecting pool",
  },
  {
    title: "Residence Three",
    place: "Lakeside",
    year: "2023",
    image: project03,
    alt: "Glass lakeside pavilion mirrored in still water",
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] tracking-[0.35em] text-accent uppercase">
          Selected Work
        </p>
        <h2 className="mt-10 max-w-2xl font-serif text-[clamp(2rem,4vw,3.75rem)] leading-[1.1] font-light">
          Three houses, three landscapes, one discipline.
        </h2>

        <div className="mt-28 space-y-40 md:space-y-56">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1.2, ease: EASE }}
              className={`group grid items-center gap-12 md:grid-cols-12 md:gap-20 ${
                index % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="overflow-hidden md:col-span-8 md:[direction:ltr]">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="md:col-span-4 md:[direction:ltr]">
                <p className="text-[11px] tracking-[0.3em] text-secondary-foreground uppercase">
                  {project.year}
                </p>
                <h3 className="mt-6 font-serif text-4xl font-light">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm text-secondary-foreground">
                  {project.place}
                </p>
                <span className="mt-10 inline-block border-b border-border pb-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                  View Project
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
