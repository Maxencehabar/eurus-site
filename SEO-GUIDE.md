# 🚀 Guide SEO Eurus — Acquisition organique

## 📊 État actuel

### ✅ Ce qui est en place
- Meta tags (title, description, OG, Twitter)
- JSON-LD Organization
- Sitemap XML auto-généré
- 6 articles de blog SEO-ready
- Vercel Analytics + Speed Insights
- Structure URL propre (`/blog/[slug]`, `/projets/[slug]`)

### ⚠️ À améliorer
- [ ] JSON-LD Article sur chaque post de blog
- [ ] Balises alt sur toutes les images
- [ ] Internal linking entre articles
- [ ] FAQ schema sur les articles guides
- [ ] Breadcrumbs
- [ ] Temps de lecture estimé

---

## 🎯 Stratégie de mots-clés

### Mots-clés primaires (haute intention)
| Mot-clé | Volume FR/mois | Difficulté | Article existant ? |
|---------|----------------|------------|-------------------|
| combien coute application mobile | 1.9K | Moyenne | ✅ |
| agence développement application mobile | 1.3K | Haute | ❌ À créer |
| développeur application mobile | 2.4K | Haute | ❌ |
| créer une application mobile | 6.6K | Haute | ❌ |
| mvp startup | 880 | Faible | ✅ |
| site vitrine vs application web | 320 | Faible | ✅ |
| flutter vs react native | 1.6K | Moyenne | ✅ |

### Mots-clés longue traîne (conversion)
| Mot-clé | Article à créer |
|---------|-----------------|
| combien de temps pour développer une application | ✅ Existe (étapes) |
| cahier des charges application mobile | ❌ À créer |
| comment choisir une agence de développement | ✅ Existe |
| application mobile pour startup | ❌ À créer |
| budget application mobile startup | ❌ À créer |
| freelance vs agence développement | ❌ À créer |
| maintenance application mobile coût | ❌ À créer |

---

## 📝 Plan de contenu (12 prochains articles)

### Priorité 1 — Haute intention commerciale
1. **"Agence de développement d'application mobile : comment choisir ?"**
   - Keyword: agence développement application mobile
   - CTA: formulaire contact
   
2. **"Freelance ou agence pour développer mon application ?"**
   - Keyword: freelance vs agence développement
   - Comparatif objectif, positionnement Eurus

3. **"Cahier des charges application mobile : template gratuit"**
   - Keyword: cahier des charges application mobile
   - Lead magnet: PDF téléchargeable

### Priorité 2 — Éducation / Confiance
4. **"Application mobile pour startup : guide complet 2025"**
5. **"Maintenance et évolution d'une application : les coûts cachés"**
6. **"Les erreurs à éviter quand on fait développer une application"**
7. **"PWA vs Application native : que choisir en 2025 ?"**

### Priorité 3 — Longue traîne technique
8. **"Firebase vs Backend personnalisé : le bon choix pour votre app"**
9. **"Monétiser son application mobile : les modèles qui marchent"**
10. **"Application interne entreprise : digitaliser vos process"**
11. **"Refonte d'application mobile : quand et comment ?"**
12. **"API et intégrations : connecter votre app à vos outils"**

---

## 🔧 Optimisations techniques

### 1. JSON-LD Article (à ajouter sur chaque post)
```typescript
// src/app/blog/[slug]/page.tsx
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  author: {
    "@type": "Organization",
    name: "Eurus",
  },
  publisher: {
    "@type": "Organization",
    name: "Eurus",
    logo: {
      "@type": "ImageObject",
      url: "https://eurus.dev/logo.png",
    },
  },
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://eurus.dev/blog/${slug}`,
  },
};
```

### 2. FAQ Schema (pour articles guides)
```typescript
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte une application mobile ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le coût varie de 5 000€ pour une app simple à 100 000€+ pour une app complexe...",
      },
    },
  ],
};
```

### 3. Breadcrumbs
```tsx
// Ajouter dans le layout blog
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="/"><span itemProp="name">Accueil</span></a>
      <meta itemProp="position" content="1" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="/blog"><span itemProp="name">Blog</span></a>
      <meta itemProp="position" content="2" />
    </li>
  </ol>
</nav>
```

---

## 🔗 Stratégie de backlinks

### 1. Annuaires & Listings (gratuit)
- [ ] Google Business Profile
- [ ] Clutch.co
- [ ] Sortlist.fr
- [ ] Malt (profil agence)
- [ ] Codeur.com
- [ ] Journal du Net annuaire

### 2. Guest posting (effort moyen)
- Blogs tech FR : Grafikart, Human Coders, Dev.to (FR)
- Medium publications tech
- Proposer des articles invités avec lien retour

### 3. HARO / Journalistes (opportuniste)
- Répondre aux demandes de journalistes tech
- Source Citations via Help a Reporter Out

### 4. Partenariats (long terme)
- Écoles de code (Ironhack, Le Wagon, etc.)
- Incubateurs/accélérateurs
- Associations de startups

---

## 📈 KPIs à suivre

| Métrique | Outil | Objectif M+3 |
|----------|-------|--------------|
| Impressions Google | Search Console | 10K/mois |
| Clics organiques | Search Console | 500/mois |
| Position moyenne | Search Console | Top 20 |
| Pages indexées | Search Console | 20+ |
| Backlinks | Ahrefs/Ubersuggest | 30+ |
| Formulaires soumis | Vercel Analytics | 10/mois |

---

## 🤖 Automatisation avec Jarvis

### Ce que je peux faire automatiquement :
1. **Générer des articles de blog** — Tu valides, je publie
2. **Optimiser les meta descriptions** — Rewrite SEO
3. **Créer du internal linking** — Suggérer des liens entre articles
4. **Monitorer les rankings** — Check hebdomadaire des positions
5. **Générer des FAQ** — Extraire les questions des articles

### Workflow proposé :
1. Je génère 2 articles/semaine (brouillons)
2. Tu valides en 5 min
3. Je commit + push
4. Vercel déploie automatiquement

---

## 📅 Calendrier éditorial

| Semaine | Article | Mot-clé cible |
|---------|---------|---------------|
| S8 | Freelance vs agence développement | freelance vs agence |
| S9 | Cahier des charges application mobile | cahier des charges app |
| S10 | Application mobile startup 2025 | application mobile startup |
| S11 | Maintenance application mobile coût | maintenance app mobile |
| S12 | PWA vs Application native | pwa vs native |

---

## 🎯 Actions immédiates

### Cette semaine :
1. [ ] Ajouter JSON-LD Article sur les 6 posts existants
2. [ ] Créer Google Search Console pour eurus.dev
3. [ ] Soumettre sitemap.xml
4. [ ] Inscription Clutch + Sortlist

### Ce mois :
5. [ ] Publier 4 nouveaux articles
6. [ ] Ajouter section FAQ sur 2 articles clés
7. [ ] Configurer Google Business Profile
8. [ ] Premier guest post sur un blog tech

---

*Guide généré par Jarvis — Dernière mise à jour : Février 2026*
