"use client";

import { useId, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { hero } from "@/content/site";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ source = "hero" }: { source?: string }) {
  const { lang } = useLang();
  const t = hero[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const honeypotId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, locale: lang, source }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="waitlist-card" id="waitlist">
        <h3>{t.successTitle}</h3>
        <p style={{ marginBottom: 0 }}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <div className="waitlist-card" id="waitlist">
      <h3>{t.formTitle}</h3>
      <p>{t.formNote}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="email"
            name="email"
            required
            placeholder={t.formPlaceholder}
            className="text-input"
            disabled={status === "loading"}
          />
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "…" : t.formSubmit}
          </button>
        </div>
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor={honeypotId}>Company</label>
          <input id={honeypotId} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        {status === "error" && <div className="form-status error">{errorMsg}</div>}
      </form>
    </div>
  );
}
