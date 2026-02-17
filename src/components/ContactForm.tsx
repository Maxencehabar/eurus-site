"use client";

import { useState, type FormEvent } from "react";

const TOTAL_STEPS = 2;

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
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
      if (!form.projectType) {
        setError("Veuillez s\u00e9lectionner un type de projet.");
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
    if (step < TOTAL_STEPS) {
      next();
      return;
    }
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
          message: form.message || "Non renseign\u00e9",
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
        "Une erreur est survenue. Veuillez r\u00e9essayer ou nous contacter directement par email."
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
      {/* Progress dots */}
      <div className="mb-8 flex justify-center gap-3">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-2.5 rounded-full transition-all ${
              s <= step
                ? "w-8 bg-accent"
                : "w-2.5 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Step 1: Name, email, project type */}
      {step === 1 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            Parlez-nous de vous et de votre projet
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
                S&eacute;lectionnez...
              </option>
              <option value="app-mobile">Application mobile</option>
              <option value="app-web">Application web</option>
              <option value="site-vitrine">Site vitrine</option>
              <option value="backend-api">Backend / API</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Message + submit */}
      {step === 2 && (
        <div className="animate-[fade-in-step_0.3s_ease]">
          <p className="mb-6 text-lg font-semibold">
            Un mot sur votre projet ?
          </p>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-text-secondary"
            >
              D&eacute;crivez bri&egrave;vement votre projet (optionnel)
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Quelques mots sur votre id&eacute;e..."
              className={`${inputClass} min-h-[120px] resize-y`}
            />
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
            &larr; Retour
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            className="flex-[2] cursor-pointer rounded-[10px] bg-accent py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-hover"
          >
            Continuer &rarr;
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-[2] cursor-pointer rounded-[10px] bg-accent py-3.5 text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Envoi en cours..." : "Discutons ensemble \u2192"}
          </button>
        )}
      </div>

      {step === TOTAL_STEPS && (
        <p className="mt-4 text-center text-xs text-text-muted">
          Vous serez redirig&eacute; vers le calendrier pour choisir un cr&eacute;neau.
        </p>
      )}
    </form>
  );
}
