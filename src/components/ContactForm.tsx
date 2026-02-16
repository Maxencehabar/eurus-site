"use client";

import { useState, type FormEvent } from "react";

const TOTAL_STEPS = 4;

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    hasSpec: "",
    budget: "",
    timeline: "",
    message: "",
    source: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function validateStep(): boolean {
    if (step === 1) {
      if (!form.name.trim()) {
        setError("Veuillez entrer votre nom.");
        return false;
      }
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setError("Veuillez entrer un email valide.");
        return false;
      }
    }
    if (step === 2) {
      if (!form.projectType) {
        setError("Veuillez sélectionner un type de projet.");
        return false;
      }
      if (!form.hasSpec) {
        setError("Veuillez indiquer si vous avez un cahier des charges.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.budget) {
        setError("Veuillez sélectionner un budget.");
        return false;
      }
      if (!form.timeline) {
        setError("Veuillez sélectionner une deadline.");
        return false;
      }
    }
    return true;
  }

  function next() {
    if (validateStep() && step < TOTAL_STEPS) setStep(step + 1);
  }

  function prev() {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "[Eurus] Nouvelle demande de projet",
          from_name: "Site Eurus",
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          hasSpec: form.hasSpec,
          budget: form.budget,
          timeline: form.timeline,
          source: form.source || "Non renseigné",
          message: form.message || "Non renseigné",
        }),
      });

      if (res.ok) {
        const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
        if (calendlyUrl) window.location.href = calendlyUrl;
      } else {
        throw new Error("Erreur");
      }
    } catch {
      setError(
        "Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email."
      );
      setSubmitting(false);
    }
  }

  const selectClass =
    "w-full appearance-none rounded-[10px] border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")] bg-[right_1rem_center] bg-no-repeat";

  const inputClass =
    "w-full rounded-[10px] border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-bg-card p-8"
      noValidate
    >
      {/* Progress */}
      <div className="relative mb-8 flex justify-between before:absolute before:top-1/2 before:right-0 before:left-0 before:h-0.5 before:-translate-y-1/2 before:bg-border before:content-['']">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
              s < step
                ? "border-2 border-accent bg-accent text-white"
                : s === step
                  ? "border-2 border-accent bg-bg-primary text-accent"
                  : "border-2 border-border bg-bg-primary text-text-muted"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            👋 Commençons par faire connaissance
          </p>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Votre nom
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jean Dupont"
              className={inputClass}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Votre email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jean@exemple.com"
              className={inputClass}
              required
            />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            💡 Quel type de projet avez-vous ?
          </p>
          <div className="mb-5">
            <label
              htmlFor="projectType"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Type de projet
            </label>
            <select
              id="projectType"
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              className={selectClass}
              required
            >
              <option value="" disabled>
                Sélectionnez...
              </option>
              <option value="app-mobile">📱 Application mobile</option>
              <option value="app-web">🌐 Application web</option>
              <option value="site-vitrine">🖥️ Site vitrine</option>
              <option value="backend-api">⚙️ Backend / API</option>
              <option value="autre">💬 Autre</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="hasSpec"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Avez-vous un cahier des charges ?
            </label>
            <select
              id="hasSpec"
              value={form.hasSpec}
              onChange={(e) => update("hasSpec", e.target.value)}
              className={selectClass}
              required
            >
              <option value="" disabled>
                Sélectionnez...
              </option>
              <option value="oui">✅ Oui, c&apos;est prêt</option>
              <option value="en-cours">📝 En cours de rédaction</option>
              <option value="non">💭 Non, juste une idée</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            📊 Budget et planning
          </p>
          <div className="mb-5">
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Budget estimé
            </label>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={selectClass}
              required
            >
              <option value="" disabled>
                Sélectionnez...
              </option>
              <option value="moins-5k">Moins de 5 000€</option>
              <option value="5k-15k">5 000€ - 15 000€</option>
              <option value="15k-30k">15 000€ - 30 000€</option>
              <option value="plus-30k">Plus de 30 000€</option>
              <option value="a-definir">À définir ensemble</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="timeline"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Deadline souhaitée
            </label>
            <select
              id="timeline"
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className={selectClass}
              required
            >
              <option value="" disabled>
                Sélectionnez...
              </option>
              <option value="urgent">🔥 Moins d&apos;1 mois</option>
              <option value="1-3-mois">📅 1 à 3 mois</option>
              <option value="3-6-mois">🗓️ 3 à 6 mois</option>
              <option value="flexible">😌 Pas de rush</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            🚀 Dernière étape !
          </p>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Décrivez brièvement votre projet (optionnel)
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Quelques mots sur votre idée..."
              className={`${inputClass} min-h-[100px] resize-y`}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="source"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              Comment nous avez-vous trouvé ?
            </label>
            <select
              id="source"
              value={form.source}
              onChange={(e) => update("source", e.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                Sélectionnez...
              </option>
              <option value="bouche-a-oreille">🗣️ Bouche à oreille</option>
              <option value="google">🔍 Google</option>
              <option value="linkedin">💼 LinkedIn</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        {step > 1 && (
          <button
            type="button"
            onClick={prev}
            className="flex-1 cursor-pointer rounded-[10px] border border-border bg-transparent py-3.5 text-[0.95rem] font-semibold text-text-secondary transition-all hover:bg-bg-primary hover:text-text-primary"
          >
            ← Retour
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            className="flex-[2] cursor-pointer rounded-[10px] bg-accent py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-hover"
          >
            Continuer →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-[2] cursor-pointer rounded-[10px] bg-accent py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Envoi en cours..." : "Réserver mon appel →"}
          </button>
        )}
      </div>

      {step === TOTAL_STEPS && (
        <p className="mt-4 text-center text-xs text-text-muted">
          Vous serez redirigé vers le calendrier pour choisir un créneau.
        </p>
      )}
    </form>
  );
}
