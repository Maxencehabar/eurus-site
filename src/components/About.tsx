import type { Stat } from "@/types";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";

const stats: Stat[] = [
  { value: "5+", label: "Projets livrés" },
  { value: "700+", label: "Utilisateurs" },
  { value: "3+", label: "Années d'expérience" },
  { value: "100%", label: "Clients satisfaits" },
];

export default function About() {
  return (
    <section id="apropos" className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader label="À propos" title="Qui sommes-nous" />
      </FadeIn>

      <div className="grid grid-cols-2 items-center gap-16 max-md:grid-cols-1 max-md:gap-8">
        <FadeIn>
          <div className="space-y-6">
            <p className="text-[1.05rem] leading-loose text-text-secondary">
              <strong className="text-text-primary">Eurus</strong> est une
              agence de d&eacute;veloppement bas&eacute;e en France,
              sp&eacute;cialis&eacute;e dans la cr&eacute;ation
              d&apos;applications mobiles et web sur mesure.
            </p>
            <p className="text-[1.05rem] leading-loose text-text-secondary">
              De la startup &agrave; la PME, nous transformons vos
              id&eacute;es en produits digitaux performants. Notre approche :
              comprendre votre m&eacute;tier, concevoir la bonne architecture,
              et livrer un produit fiable, rapide et maintenable.
            </p>
            <p className="text-[1.05rem] leading-loose text-text-secondary">
              Nous privil&eacute;gions la qualit&eacute; du code, la
              communication transparente, et le respect des d&eacute;lais.
              Chaque projet est trait&eacute; avec l&apos;attention
              qu&apos;il m&eacute;rite.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-bg-card p-6 text-center"
              >
                <div className="bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-3xl font-bold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
