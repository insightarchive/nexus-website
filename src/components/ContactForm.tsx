"use client";

import { useId, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { contactForm } from "@/content/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { lang } = useLang();
  const t = contactForm[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const honeypotId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? t.genericError);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t.genericError);
    }
  }

  if (status === "success") {
    return (
      <div className="panel">
        <h3 style={{ marginBottom: 8 }}>{t.successTitle}</h3>
        <p style={{ color: "var(--nx-text-muted)" }}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 16 }}>{t.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="name" required placeholder={t.name} className="text-input" disabled={status === "loading"} />
        <input
          type="email"
          name="email"
          required
          placeholder={t.email}
          className="text-input"
          disabled={status === "loading"}
        />
        <textarea
          name="message"
          required
          minLength={10}
          placeholder={t.message}
          className="text-input"
          disabled={status === "loading"}
        />
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor={honeypotId}>Company</label>
          <input id={honeypotId} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "…" : t.submit}
        </button>
        {status === "error" && <div className="form-status error">{errorMsg}</div>}
      </div>
    </form>
  );
}
