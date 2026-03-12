"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#contact"
      className={`fixed bottom-6 right-6 z-40 bg-accent text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-hover hover:scale-105 md:hidden ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      Parlons-en
    </a>
  );
}
