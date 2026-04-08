import FadeIn from "@/components/FadeIn";

const plans = [
  {
    name: "MVP / App simple",
    price: "À partir de 15 000€",
    description:
      "Application mobile ou web avec les fonctionnalités essentielles. Idéal pour valider une idée.",
    features: [
      "6-12 semaines",
      "Design + Dev + Déploiement",
      "1 plateforme (web ou mobile)",
    ],
    popular: false,
  },
  {
    name: "Application complète",
    price: "À partir de 40 000€",
    description:
      "Application multi-plateforme avec backend, intégrations et panel admin. Pour les projets ambitieux.",
    features: [
      "3-6 mois",
      "Web + Mobile + Backend",
      "Intégrations tierces (Stripe, etc.)",
    ],
    popular: false,
  },
  {
    name: "Outil industriel + IA",
    price: "À partir de 10 000€",
    description:
      "Dashboard, app terrain ou assistant IA sur mesure. Remplace Excel et le papier.",
    features: [
      "2-4 semaines",
      "Connecté à votre ERP",
      "Formation incluse",
    ],
    popular: true,
  },
];

export default function Pricing() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-bg-secondary">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Tarifs
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-4">
              Nos tarifs
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Transparence totale sur nos prix. Chaque projet est chiffré sur
              mesure après un appel découverte.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} className={`delay-${(index + 1) * 100}`}>
              <div
                className={`relative bg-bg-card border rounded-xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? "border-accent shadow-lg shadow-accent/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-accent text-2xl font-bold mb-4">
                  {plan.price}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <svg
                        className="w-4 h-4 text-accent flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="delay-500">
          <div className="text-center mt-12">
            <a
              href={calendlyUrl || "#contact"}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Réserver un appel découverte gratuit
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
