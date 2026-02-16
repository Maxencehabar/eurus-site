"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");

    const observer = contactSection
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(false);
            } else {
              setVisible(window.scrollY > 400);
            }
          },
          { threshold: 0.1 }
        )
      : null;

    function onScroll() {
      if (!contactSection) {
        setVisible(window.scrollY > 400);
        return;
      }
      const rect = contactSection.getBoundingClientRect();
      const isContactVisible =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (isContactVisible) {
        setVisible(false);
      } else {
        setVisible(window.scrollY > 400);
      }
    }

    if (contactSection && observer) {
      observer.observe(contactSection);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <a
      href="#contact"
      className={`fixed right-6 bottom-6 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_6px_30px_rgba(59,130,246,0.4)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Discutons de votre projet"
    >
      Discutons de votre projet
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}
