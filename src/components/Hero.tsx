export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 pt-32 pb-16 text-center"
    >
      {/* Animated background */}
      <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] animate-[pulse-bg_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-glow)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 text-xs text-text-secondary">
          &#x1F5D3; 2 cr&eacute;neaux disponibles ce mois
        </div>

        <h1 className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
          Bienvenue chez{" "}
          <span className="bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-transparent">
            Eurus
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-text-secondary">
          Eurus accompagne startups et PME dans la conception et le
          d&eacute;veloppement de produits digitaux performants, sur mesure.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_6px_30px_rgba(59,130,246,0.4)]"
          >
            Discutons de votre projet
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-8 py-3.5 text-[0.95rem] font-semibold text-text-primary transition-all hover:-translate-y-0.5 hover:bg-bg-card-hover"
          >
            Voir nos projets
          </a>
        </div>
      </div>
    </section>
  );
}
