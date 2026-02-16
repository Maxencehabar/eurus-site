import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    number: "01",
    title: "Appel d\u00e9couverte",
    description:
      "30 minutes pour comprendre votre besoin, vos objectifs et vos contraintes. Gratuit et sans engagement.",
  },
  {
    number: "02",
    title: "Proposition technique",
    description:
      "Nous vous envoyons un plan d\u00e9taill\u00e9 : architecture, technologies, planning et devis transparent.",
  },
  {
    number: "03",
    title: "D\u00e9veloppement & livraison",
    description:
      "Sprints courts avec d\u00e9mos r\u00e9guli\u00e8res. Vous suivez l\u2019avancement en temps r\u00e9el jusqu\u2019\u00e0 la mise en production.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader
          label="Notre process"
          title="Comment \u00e7a marche"
          description="Un accompagnement clair, de la premi\u00e8re id\u00e9e \u00e0 la mise en production."
        />
      </FadeIn>

      <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
        {steps.map((s, i) => (
          <FadeIn key={s.number}>
            <div className="relative rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.2)]">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {s.number}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden flex-1 border-t border-dashed border-border max-md:block" />
                )}
              </div>
              <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {s.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
