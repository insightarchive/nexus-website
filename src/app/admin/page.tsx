"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="admin-shell"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <form onSubmit={handleSubmit} className="panel" style={{ width: 360, maxWidth: "100%" }}>
        <h1 style={{ fontSize: 20, marginBottom: 6 }}>NEXUS admin</h1>
        <p style={{ color: "var(--nx-text-muted)", fontSize: 14, marginBottom: 20 }}>
          Waitlist signups &amp; contact messages.
        </p>
        <input
          type="password"
          placeholder="Password"
          className="text-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />
        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 12 }} disabled={loading}>
          {loading ? "…" : "Sign in"}
        </button>
        {error && <div className="form-status error">{error}</div>}
      </form>
    </div>
  );
}
