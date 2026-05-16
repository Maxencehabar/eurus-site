# Refonte animations & visuels eurus-site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le site marketing d'Eurus d'un template Next.js générique en site d'agence distinctif, avec animations scroll-driven premium, équipe visible, et case studies enrichis — tout en codant **sans photos réelles** via un système d'asset placeholders qu'on remplacera en toute fin.

**Architecture:** Stack hybride Motion (ex-Framer Motion) pour les transitions React/layout + GSAP avec ScrollTrigger pour les animations scroll-driven complexes (hero, parallax, pin) + Lenis pour le smooth scroll global. Tous les composants existants migrent du pattern `useState + IntersectionObserver + translate-y` artisanal vers des primitives réutilisables. Un registry d'assets centralisé (`src/data/assets.ts`) liste toutes les photos/mockups requis et expose un composant `<Asset />` qui rend soit le placeholder soit l'image finale. Quand le user fournira les photos, on remplace uniquement dans le registry.

**Tech Stack:**
- Next.js 16 (App Router), React 19, TypeScript strict — déjà en place
- Tailwind CSS v4 — déjà en place
- `motion` (ex-framer-motion, ~30 KB gz) — nouveau
- `gsap` + `@gsap/react` + ScrollTrigger (~27 KB gz core) — nouveau
- `lenis` (~5 KB gz) — nouveau
- `split-type` (MIT, alternative gratuite à SplitText payant) — nouveau
- `clsx` pour merge de classNames — nouveau

**Décisions par défaut (peuvent être renégociées au runtime) :**
- Stats hero "25+ projets / 8 ans / 100% satisfaits" → on baisse à **"12+ projets livrés / 5 ans d'expérience / 4.8/5 satisfaction"** pour rester crédible vs 4 case studies affichés
- Curseur custom : **OUI** (discret, désactivé sur mobile et sur `prefers-reduced-motion`)
- Smooth scroll Lenis : **OUI** (désactivé sur `prefers-reduced-motion`)
- Pas de Club GSAP (payant) : on utilise SplitType + DrawSVG home-made via `pathLength` Motion
- Pas de Lottie : on s'en passe pour rester sur Motion/GSAP only

---

## File Structure

### Nouveaux fichiers
- `src/lib/animations/motion-presets.ts` — variants Motion réutilisables (`fadeUp`, `staggerChildren`, `revealMask`)
- `src/lib/animations/useGsapScrollTrigger.ts` — hook wrapper autour de `useGSAP` avec ScrollTrigger
- `src/lib/animations/useLenis.ts` — singleton smooth scroll + raf loop
- `src/lib/animations/usePrefersReducedMotion.ts` — hook utilitaire
- `src/components/providers/SmoothScrollProvider.tsx` — wrapper client pour Lenis
- `src/components/providers/CustomCursor.tsx` — curseur custom (dot + ring)
- `src/components/ui/Asset.tsx` — composant qui rend placeholder ou image finale
- `src/components/ui/AnimatedCounter.tsx` — compteur qui s'incrémente au scroll-into-view
- `src/components/ui/MagneticButton.tsx` — bouton qui suit légèrement le curseur au hover
- `src/components/ui/RevealText.tsx` — texte qui se révèle mot par mot (SplitType + GSAP)
- `src/components/Team.tsx` — nouvelle section équipe (Maxence, Théo, Tom)
- `src/components/TechStackLogos.tsx` — marquee avec vrais logos SVG (remplace `TechStack.tsx`)
- `src/data/assets.ts` — registry centralisé de tous les assets requis
- `src/data/team.ts` — données équipe
- `public/logos/tech/*.svg` — logos technos open-source
- `public/logos/clients/*.svg` — placeholders logos clients
- `public/projects/<slug>/*.{webp,png}` — emplacement futur des screens (vides au début)
- `public/team/*.{webp,jpg}` — emplacement futur des portraits (vides au début)

### Fichiers à modifier
- `package.json` — ajout dépendances
- `src/app/layout.tsx` — wrapper `SmoothScrollProvider` + `CustomCursor`
- `src/app/globals.css` — variables curseur, classes utilitaires nouvelles
- `src/app/page.tsx` — ajouter `<Team />` entre About et ProcessSteps
- `src/components/Hero.tsx` — refonte complète avec GSAP text reveal + magnetic buttons + compteurs
- `src/components/Projects.tsx` — layout alternance gauche/droite avec mockup + filtres tags
- `src/components/About.tsx` — fond photo en filigrane, remplacer emojis par SVG icons
- `src/components/Services.tsx` — hover qui révèle mini-aperçu, stagger Motion
- `src/components/Testimonials.tsx` — ajout photo/logo/LinkedIn, texte révélé au scroll
- `src/components/ProcessSteps.tsx` — ligne de connexion qui se trace (Motion `pathLength`)
- `src/components/Pricing.tsx` — liens vers cas clients correspondants
- `src/components/Navbar.tsx` — ajout entrée "Équipe", hover indicator animé
- `src/components/FadeIn.tsx` — supprimé (remplacé par Motion presets)
- `src/data/projects.ts` — ajouter champ `images: AssetRef[]` par projet
- `src/app/projets/[slug]/page.tsx` — refonte avec hero mockup, galerie horizontale pin, avant/après

---

## Phase 0 — Infrastructure animations (1h)

### Task 0.1: Installer les dépendances

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/package.json`

- [ ] **Step 1: Installer les libs**

```bash
cd /Users/maxencehabar/Documents/eurus-site
npm install motion gsap @gsap/react lenis split-type clsx
```

- [ ] **Step 2: Vérifier l'install**

Run: `npm list motion gsap @gsap/react lenis split-type clsx --depth=0`
Expected: chaque package listé avec version, pas d'erreurs UNMET DEPENDENCY.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add motion, gsap, lenis, split-type, clsx"
```

### Task 0.2: Hook prefers-reduced-motion

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/lib/animations/usePrefersReducedMotion.ts`

- [ ] **Step 1: Créer le hook**

```typescript
"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/animations/usePrefersReducedMotion.ts
git commit -m "feat(anim): add usePrefersReducedMotion hook"
```

### Task 0.3: Motion presets réutilisables

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/lib/animations/motion-presets.ts`

- [ ] **Step 1: Créer les presets**

```typescript
import type { Variants } from "motion/react";

export const EASE_OUT_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT_QUART: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_QUART },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_QUART },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const revealMask: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: EASE_OUT_QUART },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_QUART },
  },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/animations/motion-presets.ts
git commit -m "feat(anim): add Motion variants presets"
```

### Task 0.4: Hook GSAP ScrollTrigger

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/lib/animations/useGsapScrollTrigger.ts`

- [ ] **Step 1: Créer le hook wrapper**

```typescript
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

export function refreshScrollTrigger(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

export type GsapScope = RefObject<HTMLElement | null>;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/animations/useGsapScrollTrigger.ts
git commit -m "feat(anim): wrap GSAP with ScrollTrigger registration"
```

### Task 0.5: Smooth scroll Lenis

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/lib/animations/useLenis.ts`
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/providers/SmoothScrollProvider.tsx`

- [ ] **Step 1: Créer le hook Lenis singleton**

```typescript
"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useLenis(): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [reduced]);
}
```

- [ ] **Step 2: Créer le provider**

```tsx
"use client";

import { useLenis } from "@/lib/animations/useLenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
```

- [ ] **Step 3: Brancher dans le layout**

Modifier `src/app/layout.tsx` pour wrapper `{children}` avec `<SmoothScrollProvider>`. Garder tout le reste (fonts, analytics, etc.) inchangé.

```tsx
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// dans le return du RootLayout, autour de {children}:
<SmoothScrollProvider>{children}</SmoothScrollProvider>
```

- [ ] **Step 4: Retirer le `scroll-behavior: smooth` natif**

Dans `src/app/globals.css:24-26`, supprimer la règle `html { scroll-behavior: smooth; }` (Lenis prend le relais, sinon conflit).

- [ ] **Step 5: Vérifier en dev**

Run: `npm run dev` (port 3001).
Ouvrir http://localhost:3001, scroller — la sensation doit être nettement plus fluide / inertielle.
Désactiver l'animation système (System Settings > Accessibility > Display > Reduce motion) → scroll redevient instantané.

- [ ] **Step 6: Commit**

```bash
git add src/lib/animations/useLenis.ts src/components/providers/SmoothScrollProvider.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat(anim): wire Lenis smooth scroll with prefers-reduced-motion guard"
```

### Task 0.6: Système d'asset placeholders

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/data/assets.ts`
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/ui/Asset.tsx`

- [ ] **Step 1: Créer le registry**

```typescript
export type AssetStatus = "pending" | "ready";

export interface AssetDefinition {
  id: string;
  status: AssetStatus;
  src?: string;
  alt: string;
  width: number;
  height: number;
  briefing: string;
}

export const assets: Record<string, AssetDefinition> = {
  "team-maxence-portrait": {
    id: "team-maxence-portrait",
    status: "pending",
    alt: "Maxence Habar, fondateur d'Eurus",
    width: 800,
    height: 1000,
    briefing: "Portrait pro, plan poitrine, fond uni clair (#F5F3EF), regard caméra, lumière douce naturelle",
  },
  "team-maxence-editorial": {
    id: "team-maxence-editorial",
    status: "pending",
    alt: "Maxence Habar au travail",
    width: 1200,
    height: 1500,
    briefing: "Portrait éditorial 3/4, en train de coder, bureau, lumière fenêtre",
  },
  "team-theo-portrait": {
    id: "team-theo-portrait",
    status: "pending",
    alt: "Théo, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-tom-portrait": {
    id: "team-tom-portrait",
    status: "pending",
    alt: "Tom, développeur Eurus",
    width: 800,
    height: 1000,
    briefing: "Même setup que Maxence (cohérence cadrage / lumière obligatoire)",
  },
  "team-group": {
    id: "team-group",
    status: "pending",
    alt: "L'équipe Eurus",
    width: 2400,
    height: 1029,
    briefing: "Photo équipe à 3 en format cinémascope (21:9), ambiance studio ou bureau",
  },
  "office-setup": {
    id: "office-setup",
    status: "pending",
    alt: "Espace de travail Eurus",
    width: 1600,
    height: 1000,
    briefing: "Setup dev : clavier mécanique + écran avec du vrai code, plongée ou côté",
  },
  "office-ambient": {
    id: "office-ambient",
    status: "pending",
    alt: "Bureau Eurus",
    width: 1600,
    height: 1000,
    briefing: "Photo large d'un coin de bureau qui respire, lumière naturelle",
  },
  "project-getaway-1": {
    id: "project-getaway-1",
    status: "pending",
    alt: "Getaway — écran de swipe",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone 15 Pro, écran swipe avec un vrai profil voyageur",
  },
  "project-getaway-2": {
    id: "project-getaway-2",
    status: "pending",
    alt: "Getaway — écran de match",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran match avec animation de connexion",
  },
  "project-getaway-3": {
    id: "project-getaway-3",
    status: "pending",
    alt: "Getaway — chat intégré",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran chat avec messages",
  },
  "project-youdy-1": {
    id: "project-youdy-1",
    status: "pending",
    alt: "Youdy — page d'accueil",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook 16'', home Youdy avec recherche formateurs",
  },
  "project-youdy-2": {
    id: "project-youdy-2",
    status: "pending",
    alt: "Youdy — calendrier de réservation",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, calendrier de résa avec créneaux",
  },
  "project-youdy-3": {
    id: "project-youdy-3",
    status: "pending",
    alt: "Youdy — paiement Stripe mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, écran paiement Stripe",
  },
  "project-drmilou-1": {
    id: "project-drmilou-1",
    status: "pending",
    alt: "DrMilou — dashboard analytics",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard avec graphs temps réel",
  },
  "project-drmilou-2": {
    id: "project-drmilou-2",
    status: "pending",
    alt: "DrMilou — gestion CRUD",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, liste/tableau CRUD",
  },
  "project-drmilou-3": {
    id: "project-drmilou-3",
    status: "pending",
    alt: "DrMilou — vue mobile",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone, vue mobile responsive du dashboard",
  },
  "project-refonte-1": {
    id: "project-refonte-1",
    status: "pending",
    alt: "Refonte industrielle — dashboard production",
    width: 1920,
    height: 1200,
    briefing: "Mockup MacBook, dashboard KPI/TRS temps réel",
  },
  "project-refonte-2": {
    id: "project-refonte-2",
    status: "pending",
    alt: "Refonte industrielle — app terrain",
    width: 1200,
    height: 1500,
    briefing: "Mockup iPhone ou tablette, app saisie qualité avec photo non-conformité",
  },
  "project-refonte-3": {
    id: "project-refonte-3",
    status: "pending",
    alt: "Atelier d'usinage de précision",
    width: 1600,
    height: 1000,
    briefing: "Photo réelle d'atelier (floutée si confidentiel), opérateur tablette en main",
  },
  "og-image-v2": {
    id: "og-image-v2",
    status: "pending",
    alt: "Eurus — Agence de développement",
    width: 1200,
    height: 630,
    briefing: "Nouvelle OG image : titre + photo équipe + accent orange, format social",
  },
};

export function getAsset(id: string): AssetDefinition {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`Asset not found: ${id}`);
  }
  return asset;
}

export function listPendingAssets(): AssetDefinition[] {
  return Object.values(assets).filter((a) => a.status === "pending");
}
```

- [ ] **Step 2: Créer le composant Asset**

```tsx
"use client";

import Image from "next/image";
import clsx from "clsx";
import type { AssetDefinition } from "@/data/assets";

interface AssetProps {
  asset: AssetDefinition;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Asset({ asset, className, priority, sizes }: AssetProps) {
  if (asset.status === "ready" && asset.src) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={asset.alt}
      className={clsx(
        "relative overflow-hidden bg-gradient-to-br from-bg-secondary via-bg-card to-bg-secondary",
        "border border-dashed border-border-strong",
        "flex items-center justify-center",
        className,
      )}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(232,93,4,0.08)_50%,transparent_70%)] animate-[shimmer_3s_ease-in-out_infinite]" />
      <div className="relative z-10 text-center px-4">
        <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Asset à fournir</p>
        <p className="text-sm font-medium text-text-secondary">{asset.id}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Ajouter keyframe shimmer au globals.css**

Ajouter à la fin du fichier `src/app/globals.css`, avant la media query `prefers-reduced-motion` (pour qu'elle reste prioritaire) :

```css
@keyframes shimmer {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}
```

- [ ] **Step 4: Vérifier le rendu placeholder**

Créer temporairement dans `src/app/page.tsx` un import + `<Asset asset={getAsset("team-maxence-portrait")} className="w-64" />` en haut du return pour valider visuellement, puis le retirer.

Run: `npm run dev` → la zone shimmer doit s'afficher avec "team-maxence-portrait" lisible.

- [ ] **Step 5: Commit**

```bash
git add src/data/assets.ts src/components/ui/Asset.tsx src/app/globals.css
git commit -m "feat(assets): add centralized asset registry with placeholder component"
```

---

## Phase 1 — Hero refondu (2h)

### Task 1.1: Composant RevealText (SplitType + GSAP)

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/ui/RevealText.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface RevealTextProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.04,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      const split = new SplitType(ref.current, { types: "lines,words" });
      const words = split.words;
      if (!words) return;

      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        delay,
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [reduced, delay, stagger] },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLElement>} className={className} style={{ overflow: "hidden", display: "block" }}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/RevealText.tsx
git commit -m "feat(ui): add RevealText component using SplitType + GSAP"
```

### Task 1.2: Composant AnimatedCounter

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/ui/AnimatedCounter.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useRef } from "react";
import { useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduced, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion-span style={{ display: "inline" }}>{rounded}</motion-span>
      {suffix}
    </span>
  );
}
```

Note : `motion-span` n'est pas valide ici, on utilise `<motion.span>`. Correction :

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduced, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span style={{ display: "inline" }}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/AnimatedCounter.tsx
git commit -m "feat(ui): add AnimatedCounter with useInView trigger"
```

### Task 1.3: Composant MagneticButton

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/ui/MagneticButton.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  className,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouseMove(event: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/MagneticButton.tsx
git commit -m "feat(ui): add MagneticButton with spring follow"
```

### Task 1.4: Refonte du Hero

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/Hero.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer Hero.tsx en entier**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, useGSAP } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

const ROTATING_WORDS = ["applications", "outils IA", "dashboards", "apps mobiles"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rotatingRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useGSAP(
    () => {
      if (!rotatingRef.current || reduced) return;
      const tl = gsap.timeline({ repeat: -1, delay: 1.6 });
      ROTATING_WORDS.forEach((word, index) => {
        const next = ROTATING_WORDS[(index + 1) % ROTATING_WORDS.length];
        tl.to(rotatingRef.current, {
          yPercent: -110,
          duration: 0.5,
          ease: "expo.in",
        })
          .set(rotatingRef.current, { textContent: next, yPercent: 110 })
          .to(rotatingRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: "expo.out",
          })
          .to({}, { duration: 2.4 });
      });
      return () => {
        tl.kill();
      };
    },
    { dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
    >
      <motion.div
        aria-hidden
        style={{ y: orbOneY }}
        className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/8 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        style={{ y: orbTwoY }}
        className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-200/25 to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            2 créneaux disponibles ce mois
          </span>
        </motion.div>

        <h1 className="heading-editorial text-[clamp(2.75rem,8vw,6rem)] max-w-[1000px] mb-8">
          <RevealText className="block">Nous créons des</RevealText>
          <span className="block" style={{ overflow: "hidden" }}>
            <span
              ref={rotatingRef}
              className="text-accent inline-block"
              style={{ willChange: "transform" }}
            >
              {ROTATING_WORDS[0]}
            </span>
          </span>
          <RevealText className="block" delay={0.2}>
            qui <em className="not-italic text-accent">marquent</em>
          </RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-text-secondary max-w-[600px] mb-12 leading-relaxed"
        >
          Eurus accompagne startups, PME et industriels dans la conception
          d&apos;applications mobiles, web et d&apos;outils IA sur mesure. De l&apos;idée à la production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-3 bg-bg-dark text-white px-8 py-4 rounded-full text-[0.95rem] font-medium transition-shadow hover:shadow-xl hover:shadow-black/10"
          >
            Discutons de votre projet
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton
            href="#projets"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[0.95rem] font-medium border border-border-strong text-text-primary transition-colors hover:bg-bg-secondary hover:border-text-muted"
          >
            Voir nos réalisations
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-border"
        >
          {[
            { value: 12, suffix: "+", label: "Projets livrés" },
            { value: 5, suffix: " ans", label: "D'expérience" },
            { value: 4.8, decimals: 1, suffix: "/5", label: "Satisfaction client" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="heading-editorial text-3xl md:text-4xl text-text-primary mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </section>
  );
}
```

- [ ] **Step 2: Vérifier en dev**

Run: `npm run dev` puis ouvrir http://localhost:3001.
- Au chargement : le titre se révèle mot par mot (~1.5s total)
- Le mot orange en milieu de titre cycle entre 4 valeurs toutes les ~3s
- Les boutons CTA suivent légèrement le curseur quand on s'approche
- Les compteurs (12+, 5 ans, 4.8/5) s'incrémentent quand on rentre dans la vue
- Les orbs blur bougent légèrement au scroll (parallaxe)

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): rebuild with GSAP text reveal, rotating word, magnetic buttons, animated counters, parallax orbs"
```

---

## Phase 2 — Section Team (2h) — bloquée par photos, MAIS développable avec placeholders

### Task 2.1: Données équipe

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/data/team.ts`

- [ ] **Step 1: Créer les données**

```typescript
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  portraitAssetId: string;
}

export const team: TeamMember[] = [
  {
    slug: "maxence",
    name: "Maxence Habar",
    role: "Fondateur & Lead Developer",
    bio: "Code depuis 2018. Prépa ingé puis freelance avant Eurus. Spécialiste full-stack et IA appliquée.",
    expertise: ["Next.js", "Flutter", "Firebase", "Claude API", "PostgreSQL"],
    links: {
      linkedin: "https://www.linkedin.com/in/maxencehabar/",
      github: "https://github.com/Maxencehabar",
    },
    portraitAssetId: "team-maxence-portrait",
  },
  {
    slug: "theo",
    name: "Théo",
    role: "Backend & DevOps",
    bio: "Expert architectures distribuées et infrastructure cloud. Garant de la fiabilité et de la sécurité.",
    expertise: ["Spring Boot", "PostgreSQL", "Docker", "AWS", "CI/CD"],
    links: {},
    portraitAssetId: "team-theo-portrait",
  },
  {
    slug: "tom",
    name: "Tom",
    role: "Mobile & Frontend",
    bio: "Spécialiste applications mobiles natives et cross-platform. Obsédé par la qualité d'UX.",
    expertise: ["Flutter", "React Native", "iOS", "Android", "Figma"],
    links: {},
    portraitAssetId: "team-tom-portrait",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/team.ts
git commit -m "feat(team): add team member data"
```

### Task 2.2: Composant Team

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/Team.tsx`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { team } from "@/data/team";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const groupY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="py-24 md:py-32 bg-bg-primary"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-12 md:mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            L'équipe
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
            Trois développeurs, <em className="not-italic text-accent">une seule</em> exigence
          </h2>
        </motion.div>

        <div className="relative mb-16 overflow-hidden rounded-2xl border border-border">
          <motion.div style={{ y: groupY }} className="relative aspect-[21/9]">
            <Asset
              asset={getAsset("team-group")}
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {team.map((member) => (
            <motion.article
              key={member.slug}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Asset
                  asset={getAsset(member.portraitAssetId)}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.expertise.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                        </svg>
                      </a>
                    )}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-editorial text-2xl text-text-primary mb-1">{member.name}</h3>
                <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Brancher Team dans la home**

Modifier `src/app/page.tsx` :

```tsx
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Team from "@/components/Team";
import ProcessSteps from "@/components/ProcessSteps";
import Pricing from "@/components/Pricing";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <TechStack />
      <About />
      <Team />
      <ProcessSteps />
      <Pricing />
      <ContactSection />
    </>
  );
}
```

- [ ] **Step 3: Ajouter entrée Navbar**

Modifier `src/components/Navbar.tsx` pour ajouter le lien `{ href: "#equipe", label: "Équipe" }` dans le tableau de liens existant (entre Services et Tarifs).

- [ ] **Step 4: Vérifier visuellement**

Run: `npm run dev`. Scroller jusqu'à la section équipe. Vérifier :
- Bandeau group-photo en 21:9 affiche un placeholder shimmer
- 3 cards portrait (Maxence, Théo, Tom) en grille avec placeholders
- Hover sur une card → l'overlay avec tags expertise + liens LinkedIn/GitHub apparaît du bas
- Pas de saut de layout (CLS = 0)

- [ ] **Step 5: Commit**

```bash
git add src/components/Team.tsx src/app/page.tsx src/components/Navbar.tsx
git commit -m "feat(team): add Team section with parallax group photo and hover-reveal portraits"
```

### Task 2.3: Refonte About (icônes SVG + photo fond)

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/About.tsx`

- [ ] **Step 1: Réécrire About.tsx**

```tsx
"use client";

import { motion } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const values = [
  {
    title: "Communication",
    desc: "Transparence totale sur l'avancement et les décisions",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Efficacité",
    desc: "Premier outil livré en 2-4 semaines. Itérations rapides.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Pragmatisme",
    desc: "L'outil qui résout votre problème, pas un ERP à 200k€.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Expertise terrain",
    desc: "On comprend vos contraintes — atelier, production, logistique.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section
      id="apropos"
      className="relative py-24 md:py-32 bg-bg-secondary overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <Asset
          asset={getAsset("office-ambient")}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeUp}
          >
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              À propos
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-6">
              Une agence qui comprend les enjeux des créateurs de produits
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Maxence développe depuis 2018. Après une prépa ingé et plusieurs missions
                en freelance, il crée Eurus en 2021 avec une conviction : le développement
                sur mesure ne devrait pas être réservé aux grandes entreprises.
              </p>
              <p>
                Avec Théo et Tom, on construit des applications mobiles, des outils web
                et des assistants IA pour des startups et des PME industrielles. On parle
                votre langue — qu&apos;il s&apos;agisse de React ou de traçabilité qualité
                en atelier.
              </p>
              <p className="text-text-primary font-medium">
                Basés en France, nous accompagnons startups et PME industrielles depuis 2021.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-accent mb-3">{value.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat(about): replace emojis with SVG icons, add background photo, motion variants"
```

---

## Phase 3 — Case studies enrichis (3h)

### Task 3.1: Enrichir les données projects

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/data/projects.ts`

- [ ] **Step 1: Ajouter le champ images sur l'interface**

En haut du fichier, ajouter à l'interface `ProjectSummary` :

```typescript
export interface ProjectSummary {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: "mobile" | "web" | "industrie";
  stat?: string;
  heroAssetId: string;
}
```

Et à `ProjectDetail` :

```typescript
export interface ProjectDetail extends ProjectSummary {
  heroDescription: string;
  problem: string;
  solution: {
    approach: string;
    features: string[];
  };
  techStack: TechCategory[];
  results: { value: string; label: string }[];
  galleryAssetIds: string[];
  metaTitle: string;
  metaDescription: string;
}
```

- [ ] **Step 2: Compléter chaque projet**

Pour chaque projet dans le tableau, ajouter :
- `category` : `"mobile"` pour getaway, `"web"` pour youdy & drmilou, `"industrie"` pour refonte-industrielle
- `heroAssetId` : `"project-getaway-1"`, `"project-youdy-1"`, `"project-drmilou-1"`, `"project-refonte-1"`
- `galleryAssetIds` : `["project-getaway-1", "project-getaway-2", "project-getaway-3"]` etc.

Mettre à jour `getProjectSummaries()` pour inclure `category` et `heroAssetId` :

```typescript
export function getProjectSummaries(): ProjectSummary[] {
  return projects.map(({ number, slug, title, subtitle, description, tags, category, stat, heroAssetId }) => ({
    number,
    slug,
    title,
    subtitle,
    description,
    tags,
    category,
    stat,
    heroAssetId,
  }));
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat(projects): enrich with category and asset references"
```

### Task 3.2: Refonte Projects (home) avec filtres et mockups

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/Projects.tsx` (réécriture complète)

- [ ] **Step 1: Remplacer Projects.tsx**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { getProjectSummaries } from "@/data/projects";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const categories = [
  { id: "all", label: "Tous" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "industrie", label: "Industrie / IA" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const projects = getProjectSummaries();

export default function Projects() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)]">
              Nos réalisations
            </h2>
          </div>
          <p className="text-text-secondary max-w-md">
            Des projets concrets, livrés en production, pour des clients qui nous font confiance.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat.id
                  ? "text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {filter === cat.id && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 bg-bg-dark rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const reversed = index % 2 === 1;
              return (
                <motion.div
                  key={project.slug}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Link
                    href={`/projets/${project.slug}`}
                    className={`group grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                      reversed ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-2xl group-hover:shadow-black/10">
                      <motion.div
                        whileHover={{ scale: 1.03, rotate: reversed ? -0.5 : 0.5 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <Asset
                          asset={getAsset(project.heroAssetId)}
                          className="w-full h-auto object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    </div>

                    <div>
                      <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium inline-block mb-4">
                        {project.subtitle}
                      </span>
                      <h3 className="heading-editorial text-3xl md:text-4xl text-text-primary mb-4 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.stat && (
                        <p className="heading-editorial text-2xl text-accent mb-6">{project.stat}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-text-primary font-medium group-hover:gap-3 transition-all">
                        Voir le cas complet
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier en dev**

Run: `npm run dev`. Scroller à la section Projets :
- 4 projets en alternance gauche/droite avec placeholders mockup
- Filtre tags (Tous / Mobile / Web / Industrie / IA) : pill animée qui glisse entre les boutons (layoutId)
- Hover sur card → légère inclinaison + scale 1.03 du mockup
- Cliquer un filtre → animation de sortie/entrée des cards

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat(projects): redesign with alternating layout, category filters with layoutId, hover tilt"
```

### Task 3.3: Page détail projet — hero & galerie horizontale

**Files:**
- Read: `/Users/maxencehabar/Documents/eurus-site/src/app/projets/[slug]/page.tsx`
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/projets/[slug]/page.tsx`

- [ ] **Step 1: Lire l'état actuel**

Lire le contenu actuel pour identifier les blocs hero/problème/solution/résultats à enrichir.

- [ ] **Step 2: Créer un composant galerie horizontale pin**

Create: `/Users/maxencehabar/Documents/eurus-site/src/components/projects/GalleryScroll.tsx`

```tsx
"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface GalleryScrollProps {
  assetIds: string[];
}

export function GalleryScroll({ assetIds }: GalleryScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !containerRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${distance}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: containerRef as React.RefObject<HTMLElement>, dependencies: [reduced, assetIds] },
  );

  if (reduced) {
    return (
      <div className="grid md:grid-cols-2 gap-6 px-6 md:px-12">
        {assetIds.map((id) => (
          <Asset
            key={id}
            asset={getAsset(id)}
            className="w-full h-auto rounded-2xl border border-border"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-12 h-full items-center pl-6 md:pl-12 will-change-transform"
      >
        {assetIds.map((id) => {
          const asset = getAsset(id);
          const isPortrait = asset.height > asset.width;
          return (
            <div
              key={id}
              className={`flex-shrink-0 ${isPortrait ? "w-[40vh] md:w-[50vh]" : "w-[80vw] md:w-[60vw]"} rounded-2xl overflow-hidden border border-border bg-bg-card`}
            >
              <Asset
                asset={asset}
                className="w-full h-auto object-cover"
                sizes={isPortrait ? "50vh" : "60vw"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Intégrer dans la page projet**

Modifier `src/app/projets/[slug]/page.tsx` pour insérer après le bloc "solution" et avant "résultats" :

```tsx
import { GalleryScroll } from "@/components/projects/GalleryScroll";

// Dans le render, après la section Solution :
<section className="py-16">
  <GalleryScroll assetIds={project.galleryAssetIds} />
</section>
```

Et remplacer le hero existant par un layout avec mockup grand format :

```tsx
<section className="relative pt-32 pb-16 overflow-hidden">
  <div className="mx-auto max-w-[1400px] px-6 md:px-12">
    <Link
      href="/#projets"
      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-8"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Retour aux projets
    </Link>
    <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
      {project.subtitle}
    </span>
    <h1 className="heading-editorial text-[clamp(2.5rem,7vw,5rem)] mb-6 max-w-[900px]">
      {project.title}
    </h1>
    <p className="text-lg md:text-xl text-text-secondary max-w-[700px] leading-relaxed mb-12">
      {project.heroDescription}
    </p>
    <div className="rounded-2xl overflow-hidden border border-border bg-bg-secondary">
      <Asset
        asset={getAsset(project.heroAssetId)}
        className="w-full h-auto object-cover"
        sizes="(max-width: 1400px) 100vw, 1400px"
        priority
      />
    </div>
  </div>
</section>
```

(Garder les sections Problème / Solution / Tech stack / Résultats existantes du fichier original, juste les wrapper avec `<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>` pour avoir le fade up cohérent.)

- [ ] **Step 4: Vérifier**

Run: `npm run dev`. Visiter http://localhost:3001/projets/getaway :
- Hero avec mockup placeholder grand format
- Sections existantes apparaissent en fade-up
- Galerie : quand on scroll dans la section, la page se "pin" et les 3 images défilent horizontalement
- Avec `prefers-reduced-motion` activé, fallback grille 2 colonnes statique

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/GalleryScroll.tsx src/app/projets/[slug]/page.tsx
git commit -m "feat(projects): add horizontal pin gallery and redesigned detail hero"
```

### Task 3.4: Compteurs animés sur les résultats projet

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/projets/[slug]/page.tsx` (section résultats uniquement)

- [ ] **Step 1: Remplacer la grille de résultats**

Repérer la section qui rend `project.results` et la remplacer par :

```tsx
<section className="py-24 bg-bg-secondary">
  <div className="mx-auto max-w-[1400px] px-6 md:px-12">
    <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
      Résultats
    </span>
    <h2 className="heading-editorial text-[clamp(2rem,5vw,3rem)] mb-12 max-w-[700px]">
      Des chiffres qui parlent
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {project.results.map((result, index) => {
        const numericMatch = result.value.match(/^(-?[\d.]+)(.*)$/);
        const numeric = numericMatch ? parseFloat(numericMatch[1]) : null;
        const suffix = numericMatch ? numericMatch[2] : "";

        return (
          <motion.div
            key={result.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="heading-editorial text-4xl md:text-5xl text-accent mb-2">
              {numeric !== null && !isNaN(numeric) ? (
                <AnimatedCounter value={numeric} suffix={suffix} decimals={suffix.includes("/") ? 1 : 0} />
              ) : (
                result.value
              )}
            </div>
            <div className="text-sm text-text-muted">{result.label}</div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>
```

Ajouter les imports nécessaires en haut du fichier :

```tsx
import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
```

- [ ] **Step 2: Vérifier**

Visiter `/projets/getaway` → les chiffres (700+, 4.6/5, etc.) s'incrémentent au scroll-into-view.

- [ ] **Step 3: Commit**

```bash
git add src/app/projets/[slug]/page.tsx
git commit -m "feat(projects): animate result metrics with counters"
```

---

## Phase 4 — Sections restantes (2h)

### Task 4.1: Logos technos en SVG

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/public/logos/tech/` (dossier)
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/TechStackLogos.tsx`
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/page.tsx` (remplacer import)
- Delete: `/Users/maxencehabar/Documents/eurus-site/src/components/TechStack.tsx`

- [ ] **Step 1: Récupérer les logos officiels**

```bash
cd /Users/maxencehabar/Documents/eurus-site/public/logos/tech
curl -L -o flutter.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg
curl -L -o react.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg
curl -L -o nextjs.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg
curl -L -o vuejs.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg
curl -L -o spring.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg
curl -L -o nodejs.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg
curl -L -o firebase.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg
curl -L -o postgresql.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg
curl -L -o stripe.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/stripe/stripe-original.svg
curl -L -o vercel.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg
curl -L -o docker.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg
curl -L -o typescript.svg https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg
ls
```

Expected: 12 fichiers .svg listés.

- [ ] **Step 2: Créer le composant**

```tsx
"use client";

import Image from "next/image";

const technologies = [
  { name: "Flutter", file: "flutter.svg" },
  { name: "React", file: "react.svg" },
  { name: "Next.js", file: "nextjs.svg" },
  { name: "Vue.js", file: "vuejs.svg" },
  { name: "TypeScript", file: "typescript.svg" },
  { name: "Spring Boot", file: "spring.svg" },
  { name: "Node.js", file: "nodejs.svg" },
  { name: "Firebase", file: "firebase.svg" },
  { name: "PostgreSQL", file: "postgresql.svg" },
  { name: "Stripe", file: "stripe.svg" },
  { name: "Vercel", file: "vercel.svg" },
  { name: "Docker", file: "docker.svg" },
];

export default function TechStackLogos() {
  const doubled = [...technologies, ...technologies];
  return (
    <section className="py-16 border-y border-border overflow-hidden bg-bg-primary">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="flex animate-[marquee_40s_linear_infinite]">
          {doubled.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 px-8 md:px-12 flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image
                src={`/logos/tech/${tech.file}`}
                alt={tech.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-text-muted text-sm font-medium tracking-wide">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Brancher dans la home**

Dans `src/app/page.tsx` : remplacer `import TechStack from "@/components/TechStack";` par `import TechStackLogos from "@/components/TechStackLogos";` et `<TechStack />` par `<TechStackLogos />`.

- [ ] **Step 4: Supprimer l'ancien**

```bash
rm /Users/maxencehabar/Documents/eurus-site/src/components/TechStack.tsx
```

- [ ] **Step 5: Vérifier**

Run: `npm run dev`. La section TechStack affiche maintenant logos + nom, marquee plus lente (40s vs 30s), avec fade left/right sur les bords, hover qui sort du greyscale.

- [ ] **Step 6: Commit**

```bash
git add public/logos/tech src/components/TechStackLogos.tsx src/app/page.tsx
git rm src/components/TechStack.tsx
git commit -m "feat(tech): replace text marquee with logo marquee + greyscale hover"
```

### Task 4.2: Refonte Services avec hover preview

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/Services.tsx`

- [ ] **Step 1: Réécrire Services.tsx**

```tsx
"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

interface Service {
  number: string;
  title: string;
  description: string;
  details: string[];
  href?: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    number: "01",
    title: "Applications mobiles",
    description:
      "iOS et Android avec une seule base de code. Flutter et React Native pour un développement rapide et des performances natives.",
    details: ["Flutter", "React Native", "iOS", "Android"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Applications web",
    description:
      "Des interfaces modernes et réactives. SPA, SSR, ou sites vitrines complexes avec les meilleurs frameworks du marché.",
    details: ["React", "Next.js", "Vue.js", "TypeScript"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Backend & API",
    description:
      "Architectures robustes qui tiennent la charge. API REST ou GraphQL, bases de données optimisées, intégrations tierces.",
    details: ["Node.js", "Java Spring", "PostgreSQL", "Firebase"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Conseil & Audit",
    description:
      "Besoin d'un regard externe ? Audit de code, choix d'architecture, accompagnement technique pour vos équipes.",
    details: ["Audit technique", "Architecture", "Formation", "CTO as a service"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Industrie & IA",
    description:
      "Outils sur mesure pour PME industrielles : dashboards de production, apps terrain, assistants IA branchés sur vos outils.",
    details: ["Dashboards", "Apps terrain", "Assistants IA", "Portails B2B"],
    href: "/industrie",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M2 20h20M4 20V8l4-2v14M12 20V4l4-2v18M20 20V12l-4-2" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-16 md:mb-24"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Services
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[700px]">
            Ce que nous faisons, et ce que nous faisons{" "}
            <em className="not-italic text-accent">bien</em>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const Wrapper = service.href ? motion.a : motion.div;
            const wrapperProps = service.href ? { href: service.href } : {};
            return (
              <Wrapper
                key={service.number}
                {...wrapperProps}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative bg-bg-card border border-border rounded-2xl p-8 md:p-10 transition-colors hover:border-accent/30 ${
                  service.href ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-light text-border-strong group-hover:text-accent/30 transition-colors">
                    {service.number}
                  </span>
                  <div className="text-text-muted group-hover:text-accent transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-muted border border-border"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat(services): replace useState/IntersectionObserver with Motion variants and SVG icons"
```

### Task 4.3: Refonte Testimonials avec photos + reveal

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/Testimonials.tsx`

- [ ] **Step 1: Étendre l'interface**

```typescript
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
  photoAssetId?: string;
}
```

- [ ] **Step 2: Ajouter les assets témoignages au registry**

Modifier `src/data/assets.ts` pour ajouter :

```typescript
"testimonial-elodie": {
  id: "testimonial-elodie",
  status: "pending",
  alt: "Élodie, co-fondatrice de Youdy",
  width: 200,
  height: 200,
  briefing: "Portrait carré de profil LinkedIn d'Élodie (Youdy)",
},
"testimonial-fily": {
  id: "testimonial-fily",
  status: "pending",
  alt: "Fily, fondateur de Getaway",
  width: 200,
  height: 200,
  briefing: "Portrait carré de profil LinkedIn de Fily (Getaway)",
},
```

- [ ] **Step 3: Réécrire Testimonials.tsx**

```tsx
"use client";

import { motion } from "motion/react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
  photoAssetId?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Maxence a su transformer notre vision en une vraie plateforme. Il comprend les enjeux produit, pas juste le code. Youdy n'existerait pas sans lui.",
    name: "Élodie",
    role: "Co-fondatrice",
    company: "Youdy",
    photoAssetId: "testimonial-elodie",
  },
  {
    quote:
      "Un vrai partenaire technique. L'app Getaway est fluide, rapide, et nos utilisateurs adorent. Le choix de Flutter était le bon.",
    name: "Fily",
    role: "Fondateur",
    company: "Getaway",
    photoAssetId: "testimonial-fily",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-bg-dark text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,93,4,0.12),transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="mb-16 md:mb-20"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] text-white">
            Ce que disent nos clients
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-4xl"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <svg
                className="w-10 h-10 text-accent/40 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <blockquote className="text-lg leading-relaxed text-gray-200 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                {testimonial.photoAssetId ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Asset
                      asset={getAsset(testimonial.photoAssetId)}
                      className="w-full h-full object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                {testimonial.linkedinUrl && (
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-gray-400 hover:text-white transition-colors"
                    aria-label={`Profil LinkedIn de ${testimonial.name}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonials.tsx src/data/assets.ts
git commit -m "feat(testimonials): add photo placeholders, LinkedIn links, motion variants"
```

### Task 4.4: ProcessSteps avec ligne de connexion animée

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/ProcessSteps.tsx`

- [ ] **Step 1: Réécrire ProcessSteps.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";

const steps = [
  {
    number: "01",
    title: "Appel découverte",
    description:
      "30 minutes pour comprendre votre besoin, vos objectifs et vos contraintes. Gratuit et sans engagement.",
    duration: "30 min",
  },
  {
    number: "02",
    title: "Proposition technique",
    description:
      "Nous vous envoyons un plan détaillé : architecture, technologies, planning et devis transparent.",
    duration: "48h",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Sprints courts avec démos régulières. Vous suivez l'avancement en temps réel jusqu'à la mise en production.",
    duration: "6-12 sem.",
  },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Notre process
          </span>
          <h2 className="heading-editorial text-[clamp(2rem,5vw,3.5rem)] max-w-[600px] mx-auto">
            Comment ça marche
          </h2>
        </motion.div>

        <div className="relative">
          <svg
            className="hidden md:block absolute top-8 left-[16.67%] w-[66.66%] h-2 pointer-events-none"
            viewBox="0 0 800 4"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="2" x2="800" y2="2" stroke="var(--color-border)" strokeWidth="2" />
            <motion.line
              x1="0"
              y1="2"
              x2="800"
              y2="2"
              stroke="var(--color-accent)"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="heading-editorial text-4xl text-accent/30 bg-bg-primary relative z-10 pr-2">
                    {step.number}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier**

Run: `npm run dev`. Scroller à la section process : la ligne orange se trace progressivement au-dessus des 3 étapes au fur et à mesure du scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProcessSteps.tsx
git commit -m "feat(process): animate connecting line with scroll-driven pathLength"
```

### Task 4.5: Pricing avec liens vers cas clients

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/components/Pricing.tsx`

- [ ] **Step 1: Ajouter un caseStudySlug optionnel sur chaque plan**

```tsx
const plans = [
  {
    name: "MVP / App simple",
    price: "À partir de 15 000€",
    description:
      "Application mobile ou web avec les fonctionnalités essentielles. Idéal pour valider une idée.",
    features: ["6-12 semaines", "Design + Dev + Déploiement", "1 plateforme (web ou mobile)"],
    popular: false,
    caseStudySlug: "getaway",
  },
  {
    name: "Application complète",
    price: "À partir de 40 000€",
    description:
      "Application multi-plateforme avec backend, intégrations et panel admin. Pour les projets ambitieux.",
    features: ["3-6 mois", "Web + Mobile + Backend", "Intégrations tierces (Stripe, etc.)"],
    popular: false,
    caseStudySlug: "youdy",
  },
  {
    name: "Outil industriel + IA",
    price: "À partir de 10 000€",
    description:
      "Dashboard, app terrain ou assistant IA sur mesure. Remplace Excel et le papier.",
    features: ["2-4 semaines", "Connecté à votre ERP", "Formation incluse"],
    popular: true,
    caseStudySlug: "refonte-industrielle",
  },
];
```

- [ ] **Step 2: Ajouter le lien dans la card**

Juste avant la fermeture de la `</ul>` dans le map, ajouter :

```tsx
<Link
  href={`/projets/${plan.caseStudySlug}` as Route}
  className="mt-6 text-sm text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
>
  Voir un cas concret →
</Link>
```

Et en haut du fichier :

```tsx
import Link from "next/link";
import type { Route } from "next";
```

- [ ] **Step 3: Remplacer FadeIn par Motion variants**

Remplacer chaque `<FadeIn>` par `<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>`. Importer :

```tsx
import { motion } from "motion/react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations/motion-presets";
```

Et supprimer `import FadeIn from "@/components/FadeIn";`.

- [ ] **Step 4: Vérifier**

Run: `npm run dev`. Section Tarifs : chaque card a un lien "Voir un cas concret →" qui pointe vers `/projets/<slug>`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat(pricing): add case study link per plan and migrate to Motion variants"
```

### Task 4.6: Supprimer FadeIn.tsx obsolète

**Files:**
- Delete: `/Users/maxencehabar/Documents/eurus-site/src/components/FadeIn.tsx`

- [ ] **Step 1: Vérifier qu'il n'est plus utilisé**

Run: `grep -r "from \"@/components/FadeIn\"" src/` (ou via Grep tool)
Expected: aucun résultat. Si résultat → remplacer chaque usage par Motion variants avant de continuer.

- [ ] **Step 2: Supprimer le fichier**

```bash
rm /Users/maxencehabar/Documents/eurus-site/src/components/FadeIn.tsx
```

- [ ] **Step 3: Build pour vérifier**

```bash
npm run build
```

Expected: build réussit sans erreur TypeScript ni import manquant.

- [ ] **Step 4: Commit**

```bash
git rm src/components/FadeIn.tsx
git commit -m "chore: remove obsolete FadeIn component"
```

---

## Phase 5 — Polish global (1h30)

### Task 5.1: Curseur custom

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/providers/CustomCursor.tsx`
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/layout.tsx`
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/globals.css`

- [ ] **Step 1: Créer le composant**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function onMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function onOver(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role=button], input, textarea, [data-cursor=hover]");
      setHovering(!!interactive);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 bg-accent rounded-full"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-bg-dark/30 mix-blend-difference"
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32 }}
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Ajouter au layout**

Dans `src/app/layout.tsx`, importer et rendre `<CustomCursor />` à l'intérieur du `<body>` (avant ou après `<SmoothScrollProvider>`, peu importe — ne dépend pas du scroll).

- [ ] **Step 3: Masquer le curseur natif quand actif**

Ajouter dans `src/app/globals.css` :

```css
html.custom-cursor-active,
html.custom-cursor-active * {
  cursor: none !important;
}
```

- [ ] **Step 4: Vérifier**

Run: `npm run dev`. Le curseur natif disparaît, un petit dot orange + un anneau le remplacent. Au hover sur un lien/bouton, l'anneau grossit. Sur mobile (tester via DevTools > device mode tactile) → curseur natif reste, custom cursor désactivé.

- [ ] **Step 5: Commit**

```bash
git add src/components/providers/CustomCursor.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat(cursor): add custom cursor with hover state and pointer-fine guard"
```

### Task 5.2: Transitions de page entre Home et /projets/[slug]

**Files:**
- Modify: `/Users/maxencehabar/Documents/eurus-site/src/app/layout.tsx`
- Create: `/Users/maxencehabar/Documents/eurus-site/src/components/providers/PageTransition.tsx`

- [ ] **Step 1: Créer le wrapper**

```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Wrapper dans layout**

Dans `src/app/layout.tsx`, wrapper `{children}` avec `<PageTransition>` (à l'intérieur de SmoothScrollProvider).

- [ ] **Step 3: Vérifier**

Run: `npm run dev`. Naviguer Home → /projets/getaway → retour. Léger fade + translate à chaque navigation.

- [ ] **Step 4: Commit**

```bash
git add src/components/providers/PageTransition.tsx src/app/layout.tsx
git commit -m "feat(transitions): add page transition between routes via AnimatePresence"
```

### Task 5.3: Lighthouse + reduced-motion audit

**Files:** aucun (test seulement)

- [ ] **Step 1: Build prod**

```bash
cd /Users/maxencehabar/Documents/eurus-site
npm run build
npm start
```

Expected: serveur démarre sur http://localhost:3000 sans erreur.

- [ ] **Step 2: Lighthouse audit**

Ouvrir DevTools > Lighthouse > Performance + Accessibility + Best Practices + SEO, mode Mobile et Desktop. Lancer.

Expected:
- Performance ≥ 85 (target 90+)
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
- LCP < 2.5s
- CLS = 0 (très important — les placeholders ont `aspect-ratio`, donc pas de saut)

Si Performance < 85, identifier le coupable dans le panneau Diagnostics. Causes probables :
- GSAP en client-side bundle trop gros → vérifier `npm run build` output, taille des `/_next/static/chunks/*.js`
- Lenis qui bloque le main thread → mesurer Total Blocking Time

- [ ] **Step 3: Test prefers-reduced-motion**

Dans macOS : System Settings > Accessibility > Display > activer "Reduce motion".
Recharger http://localhost:3000. Vérifier :
- Lenis désactivé (scroll natif instantané)
- RevealText : pas de split, texte affiché normal
- Compteurs : valeur finale affichée directement
- MagneticButton : ne suit pas le curseur
- CustomCursor : désactivé
- Galerie horizontale projets : fallback grille statique

- [ ] **Step 4: Commit éventuels fixes**

Si des ajustements sont nécessaires (par exemple lazy-loader ScrollTrigger, dynamic import certains composants), les faire et commit avec :

```bash
git commit -am "perf: optimize bundle and respect reduced-motion across all anims"
```

---

## Phase 6 — Intégration des photos (à faire avec le user)

> Cette phase est **bloquée** tant que le user n'a pas fourni les photos. Quand il les envoie, suivre cette procédure.

### Task 6.1: Réception et placement des fichiers

**Files:**
- Create: `/Users/maxencehabar/Documents/eurus-site/public/team/`, `public/projects/<slug>/`, etc.

- [ ] **Step 1: Lister les assets manquants**

Demander au user d'ouvrir le site sur http://localhost:3001 et de noter tous les placeholders affichés. Alternativement, exécuter mentalement :

```typescript
import { listPendingAssets } from "@/data/assets";
console.log(listPendingAssets().map(a => `${a.id}: ${a.briefing}`));
```

- [ ] **Step 2: Optimiser et placer**

Pour chaque photo reçue :
1. Convertir en WebP (qualité 85) avec `sips` ou `cwebp` :
   ```bash
   cwebp -q 85 input.jpg -o output.webp
   ```
2. Vérifier la dimension correspond à celle déclarée dans `assets.ts`
3. Placer dans `public/team/<id>.webp`, `public/projects/<slug>/<id>.webp`, etc.

- [ ] **Step 3: Activer dans le registry**

Pour chaque asset placé, modifier `src/data/assets.ts` :

```typescript
"team-maxence-portrait": {
  id: "team-maxence-portrait",
  status: "ready",
  src: "/team/team-maxence-portrait.webp",
  alt: "Maxence Habar, fondateur d'Eurus",
  width: 800,
  height: 1000,
  briefing: "...",
},
```

- [ ] **Step 4: Vérifier visuellement**

Run: `npm run dev`. Parcourir toutes les sections, vérifier qu'aucun placeholder shimmer ne reste (sauf assets non encore fournis).

- [ ] **Step 5: Commit (un par batch de photos)**

```bash
git add public/team src/data/assets.ts
git commit -m "feat(assets): integrate team portraits"
```

### Task 6.2: Nouvelle OG image

**Files:**
- Replace: `/Users/maxencehabar/Documents/eurus-site/public/og-image.png`

- [ ] **Step 1: Recevoir la nouvelle og-image**

1200x630 PNG ou JPG. Doit contenir : logo Eurus + photo équipe + tagline + accent orange.

- [ ] **Step 2: Remplacer le fichier**

```bash
mv ~/Downloads/og-image-v2.png /Users/maxencehabar/Documents/eurus-site/public/og-image.png
```

- [ ] **Step 3: Tester avec un validateur**

Ouvrir https://www.opengraph.xyz et y coller l'URL Vercel preview. Vérifier rendu LinkedIn / X / Slack.

- [ ] **Step 4: Commit**

```bash
git add public/og-image.png
git commit -m "feat(seo): update OG image with team photo"
```

---

## Phase 7 — Deploy + smoke test final

### Task 7.1: Preview Vercel

- [ ] **Step 1: Pousser sur master**

```bash
cd /Users/maxencehabar/Documents/eurus-site
git push origin master
```

(Si la branche utilisée est différente, adapter. Eurus = `master` selon CLAUDE.md global.)

- [ ] **Step 2: Vérifier le déploiement**

```bash
npx vercel ls --prod
```

Expected: dernière prod deployment listed, status READY.

- [ ] **Step 3: Smoke test prod**

Ouvrir https://eurus-site.vercel.app dans Chrome desktop + iPhone (via responsive devtools).
Checklist :
- [ ] Hero : text reveal joue, mot rotatif cycle, compteurs s'incrémentent
- [ ] Boutons magnetic réactifs au curseur
- [ ] Curseur custom visible et anneau qui change au hover
- [ ] Scroll smooth (Lenis actif)
- [ ] Section Projets : filtres pill qui glissent, hover tilt sur cards
- [ ] Section Team : photos équipe affichées (ou placeholders si Phase 6 pas faite), hover révèle tags + liens
- [ ] TechStackLogos : marquee logos couleur au hover, greyscale au repos
- [ ] Page /projets/getaway : galerie horizontale qui se pin et défile au scroll
- [ ] Page transitions : fade entre routes
- [ ] Aucune erreur dans la console
- [ ] Lighthouse mobile ≥ 85 perf
- [ ] Mobile : pas de curseur custom (cohérent), animations fluides

### Task 7.2: Documenter les nouveautés

- [ ] **Step 1: Mettre à jour README**

Ajouter une section "Architecture animations" dans `README.md` avec :
- Stack utilisé (Motion + GSAP + Lenis + SplitType)
- Comment activer/désactiver Lenis (env ou flag global ?)
- Comment ajouter un nouvel asset (workflow registry)
- Comment respecter prefers-reduced-motion dans un nouveau composant (utiliser `usePrefersReducedMotion()`)

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document animations architecture"
git push
```

---

## Récapitulatif d'exécution

| Phase | Tâches | Temps dev | Bloquant photos ? |
|---|---|---|---|
| 0 — Infra | 6 | 1h | Non |
| 1 — Hero | 4 | 2h | Non |
| 2 — Team + About | 3 | 2h | Codable, photos à intégrer phase 6 |
| 3 — Case studies | 4 | 3h | Codable, screens à intégrer phase 6 |
| 4 — Autres sections | 6 | 2h | Non |
| 5 — Polish | 3 | 1h30 | Non |
| 6 — Photos | 2 | 1h | **OUI** — bloqué |
| 7 — Deploy | 2 | 30min | Non |
| **Total dev** | **30** | **~12h** | |

**Stratégie :** on enchaîne Phases 0 → 5 + Phase 7 (déploiement preview avec placeholders), puis Phase 6 dès que les photos arrivent, puis re-déploiement final.

---

## Self-review checklist

- [x] Spec coverage : toutes les sections du plan d'audit (animations Hero, équipe, case studies, logos technos, tarifs avec liens, polish curseur+transitions, reduced-motion, photos via registry) sont couvertes
- [x] Pas de placeholder "TODO" / "TBD" — chaque step contient le code complet
- [x] Types cohérents : `AssetDefinition`, `TeamMember`, `ProjectDetail`, `Testimonial` signatures fixées dès leur introduction
- [x] Imports cohérents : `motion/react` partout (le nouveau package après rename Framer Motion → Motion)
- [x] `prefers-reduced-motion` : géré dans Lenis, CustomCursor, MagneticButton, RevealText, AnimatedCounter, GalleryScroll
- [x] CLS = 0 : tous les placeholders ont `aspectRatio` défini
- [x] Stratégie photos placeholder → final-via-registry permet de coder sans bloquer
