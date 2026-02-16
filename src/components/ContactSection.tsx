import { CONTACT_EMAIL } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-8 py-24 max-md:px-6 max-md:py-16">
      <FadeIn>
        <SectionHeader
          label="Contact"
          title="Parlons de votre projet"
          description="Une idée ? Un besoin ? Contactez-nous et discutons ensemble de comment la réaliser."
        />
      </FadeIn>

      <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
        <FadeIn>
          <div>
            <h3 className="mb-4 text-2xl font-bold">&Eacute;changeons sur votre projet</h3>
            <p className="mb-2 leading-relaxed text-text-secondary">
              Que vous ayez un projet pr&eacute;cis ou simplement une
              id&eacute;e &agrave; explorer, nous sommes &agrave; votre
              &eacute;coute. R&eacute;ponse garantie sous 24h.
            </p>
            <p className="mb-8 text-sm font-medium text-accent">
              Gratuit, sans engagement &mdash; 30 min pour comprendre votre besoin.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 py-3 text-text-secondary transition-colors hover:text-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-glow">
                ✉️
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  Email
                </div>
                <div className="text-sm">{CONTACT_EMAIL}</div>
              </div>
            </a>

            <div className="flex items-center gap-3 py-3 text-text-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-glow">
                📍
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">
                  Localisation
                </div>
                <div className="text-sm">France</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
