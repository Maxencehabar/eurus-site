import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link href="/" className="heading-editorial text-2xl text-white">
              {SITE_NAME}
            </Link>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Applications sur mesure pour startups et PME industrielles
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/industrie"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Industrie
                </Link>
              </li>
              <li>
                <Link
                  href="/ia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IA sur mesure
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tous nos services
                </Link>
              </li>
              <li>
                <Link
                  href="/#tarifs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ressources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Ressources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
          <p>Fait avec soin en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}
