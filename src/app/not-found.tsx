export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
      <h1 className="mb-4 bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-8xl font-bold text-transparent">
        404
      </h1>
      <p className="mb-8 text-xl text-text-secondary">
        Cette page n&apos;existe pas.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Retour &agrave; l&apos;accueil
      </a>
    </section>
  );
}
