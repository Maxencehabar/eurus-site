# Eurus — Site agence

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4.

## Dev

```bash
npm install
npm run dev          # port 3001 (3000 souvent occupé par Youdy)
npm run build        # build prod
npm run lint
```

## Deploy

Vercel CLI authentifié, branche `master` déployée automatiquement.

```bash
npx vercel           # preview deployment
npx vercel --prod    # production deployment
```

URL prod : https://eurus-site.vercel.app

## Architecture animations

Le site combine trois libs orchestrées via des hooks centralisés.

| Lib | Rôle | Fichier |
|-----|------|---------|
| **Motion** (ex-Framer Motion) | Variants déclaratifs, `whileInView`, `AnimatePresence`, layout transitions | imports depuis `motion/react` |
| **GSAP + ScrollTrigger** | Text reveal mot par mot, pin horizontal gallery, rotating word timeline | `src/lib/animations/useGsapScrollTrigger.ts` |
| **Lenis** | Smooth scroll global avec inertie | `src/lib/animations/useLenis.ts` |

### Primitives réutilisables (`src/components/ui/`)

- `RevealText` — texte révélé mot par mot via SplitType + GSAP (a11y : aria-label parent + aria-hidden sur les mots splittés)
- `AnimatedCounter` — chiffre qui s'incrémente quand entré dans la vue (pas de flash de "0")
- `MagneticButton` — bouton qui suit légèrement le curseur avec spring physics
- `SocialIcon` — LinkedIn / GitHub / Twitter (paths factorisés)
- `Asset` — composant qui rend soit l'image finale soit un placeholder shimmer selon `status` du registry

### Asset registry (`src/data/assets.ts`)

Tous les visuels (photos équipe, mockups projets, OG image) sont déclarés dans un registry central :

```typescript
{
  id: "team-maxence-portrait",
  status: "pending",        // ou "ready" quand l'image est dispo
  alt: "...",
  width: 800,
  height: 1000,
  briefing: "Portrait pro, plan poitrine, fond uni clair...",
}
```

Tant que `status === "pending"`, `<Asset>` rend un placeholder dashed-border + shimmer animé avec l'id de l'asset affiché en clair. Pour intégrer une photo :

1. Placer le fichier dans `public/team/`, `public/projects/<slug>/`, etc.
2. Dans `assets.ts`, passer `status: "ready"` + `src: "/team/..."`
3. Aucun autre changement nécessaire dans les composants.

### Conventions

- Tous les composants animés sont `"use client"` (Motion / GSAP requièrent le client boundary).
- Quand une page Next a `export const metadata`, elle reste serveur et la JSX animée est extraite dans un client component (cf. `ProjectDetailBody.tsx`, `IaPageBody.tsx`, `IndustriePageBody.tsx`).
- `prefers-reduced-motion` est respecté partout via `usePrefersReducedMotion()` ou `useReducedMotion()` de Motion :
  - Lenis désactivé
  - GSAP timelines / SplitType non instanciés
  - `useScroll`/`useTransform` parallax remplacés par valeurs constantes
  - CustomCursor désactivé
  - `@media (prefers-reduced-motion: reduce)` global qui force `animation-duration: 0.01ms !important` en safety net

### Ajouter une nouvelle section animée

1. Si elle utilise du scroll-driven plus complexe que `whileInView` (pin, parallax fine), passer par GSAP + ScrollTrigger via `useGSAP` du wrapper local
2. Sinon, Motion variants + `whileInView` + `viewport={VIEWPORT_ONCE}`
3. Importer les presets : `import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations/motion-presets"`
4. Pour les images, déclarer un asset dans `src/data/assets.ts` et rendre `<Asset asset={getAsset("id")} />`

## Tests

Pas de tests automatisés sur ce repo (site marketing). Vérification visuelle via `npm run dev` + audit Lighthouse avant chaque release.
