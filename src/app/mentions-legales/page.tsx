import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE_NAME}`,
  description: `Mentions légales du site ${SITE_NAME}.`,
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-8 pt-32 pb-24">
      <h1 className="mb-12 text-4xl font-bold">Mentions l&eacute;gales</h1>

      <div className="space-y-10 text-text-secondary leading-relaxed">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            &Eacute;diteur du site
          </h2>
          <p>
            Le site <strong className="text-text-primary">eurus.agency</strong>{" "}
            est &eacute;dit&eacute; par Maxence Habar, entrepreneur individuel
            domicili&eacute; en France.
          </p>
          <p className="mt-2">
            Contact :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            H&eacute;bergeur
          </h2>
          <p>
            Le site est h&eacute;berg&eacute; par{" "}
            <strong className="text-text-primary">Vercel Inc.</strong>, 340 S
            Lemon Ave #4133, Walnut, CA 91789, &Eacute;tats-Unis.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            Propri&eacute;t&eacute; intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est
            prot&eacute;g&eacute; par le droit d&apos;auteur. Toute
            reproduction, m&ecirc;me partielle, est interdite sans autorisation
            pr&eacute;alable.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            Donn&eacute;es personnelles (RGPD)
          </h2>
          <p>
            Les donn&eacute;es collect&eacute;es via le formulaire de contact
            (nom, email, d&eacute;tails du projet) sont utilis&eacute;es
            uniquement pour r&eacute;pondre &agrave; votre demande. Elles ne
            sont pas transmises &agrave; des tiers et sont conserv&eacute;es
            pour une dur&eacute;e maximale de 12 mois.
          </p>
          <p className="mt-2">
            Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur
            la Protection des Donn&eacute;es (RGPD), vous disposez d&apos;un
            droit d&apos;acc&egrave;s, de rectification et de suppression de vos
            donn&eacute;es. Pour exercer ce droit, contactez-nous &agrave;{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">
            Cookies &amp; Analytics
          </h2>
          <p>
            Ce site n&apos;utilise pas de cookies de suivi ni de cookies
            publicitaires. Seuls des cookies techniques essentiels au
            fonctionnement du site peuvent &ecirc;tre utilis&eacute;s.
          </p>
          <p className="mt-2">
            Nous utilisons Vercel Analytics et Vercel Speed Insights pour
            mesurer les performances du site de mani&egrave;re anonyme. Ces
            outils ne d&eacute;posent pas de cookies, ne collectent aucune
            donn&eacute;e personnelle et sont conformes au RGPD. Les
            donn&eacute;es agr&eacute;g&eacute;es (temps de chargement,
            pages visit&eacute;es) nous aident uniquement &agrave;
            am&eacute;liorer l&apos;exp&eacute;rience utilisateur.
          </p>
        </div>
      </div>
    </section>
  );
}
