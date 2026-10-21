import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "They listened for a year before they drew a single line. The house knows us better than we know ourselves.",
    name: "Client Name",
    place: "Residence One",
  },
  {
    quote:
      "Every material was chosen as if it would be inherited. Nothing here will need replacing in our lifetime.",
    name: "Client Name",
    place: "Residence Two",
  },
  {
    quote:
      "The calmest project we have ever been part of. Precise, unhurried, and delivered exactly as promised.",
    name: "Client Name",
    place: "Residence Three",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] tracking-[0.35em] text-accent uppercase">
          Clients
        </p>
        <div className="mt-24 grid gap-16 md:grid-cols-3 md:gap-12">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.12,
              }}
              className="border-t border-border pt-10"
            >
              <blockquote className="font-serif text-2xl leading-[1.4] font-light">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-10 text-[11px] tracking-[0.28em] text-secondary-foreground uppercase">
                {item.name}
                <span className="mt-2 block text-accent">{item.place}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
