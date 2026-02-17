"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [menuOpen, closeMenu]);

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,14,26,0.95)] py-3 px-8"
          : "bg-[rgba(10,14,26,0.8)] py-4 px-8"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link
          href="/"
          className="bg-gradient-to-br from-accent to-[#8b5cf6] bg-clip-text text-2xl font-bold tracking-tight text-transparent"
        >
          eurus
        </Link>

        {/* Desktop links */}
        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              {item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-text-secondary transition-colors hover:text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={resolveHref(item.href)}
                  className="relative text-sm font-medium text-text-secondary transition-colors hover:text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="flex flex-col gap-[5px] p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="flex flex-col gap-5 border-b border-border bg-[rgba(10,14,26,0.98)] px-8 py-6 md:hidden"
          role="menu"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href} role="none">
              {item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={resolveHref(item.href)}
                  onClick={closeMenu}
                  className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  role="menuitem"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
