import Link from "next/link";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="heading-editorial text-2xl text-white">
              {SITE_NAME}
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
              Applications mobiles & web sur mesure
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 text-sm">
            <Link
              href="/blog"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/mentions-legales"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Mentions légales
            </Link>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
          <p>Fait avec soin en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}
