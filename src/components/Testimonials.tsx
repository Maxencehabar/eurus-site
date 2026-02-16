import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Eurus a transformé notre idée en une application mobile performante. Communication fluide, livraison dans les temps, qualité irréprochable.",
    name: "Sophie Martin",
    role: "CEO",
    company: "TravelApp",
  },
  {
    quote:
      "Une équipe réactive et à l'écoute. Notre plateforme SaaS a été livrée avec une qualité technique qui a dépassé nos attentes.",
    name: "Thomas Durand",
    role: "CTO",
    company: "EduConnect",
  },
  {
    quote:
      "Grâce à Eurus, notre back-office est devenu un vrai outil de pilotage. L'interface est intuitive et les performances sont au rendez-vous.",
    name: "Claire Petit",
    role: "Directrice des opérations",
    company: "LogiPro",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader
          label="Témoignages"
          title="Ce que disent nos clients"
          description="Des collaborations qui parlent d'elles-mêmes."
        />
      </FadeIn>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-md:grid-cols-1">
        {testimonials.map((t) => (
          <FadeIn key={t.name}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.2)]">
              <svg
                className="mb-4 h-8 w-8 text-accent opacity-40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <p className="mb-6 flex-1 text-[0.95rem] leading-relaxed text-text-secondary">
                {t.quote}
              </p>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t.name}
                </p>
                <p className="text-sm text-text-muted">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
