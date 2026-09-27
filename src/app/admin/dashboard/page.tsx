"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type WaitlistSignup = {
  id: string;
  email: string;
  locale: string;
  source: string | null;
  createdAt: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  handled: boolean;
  createdAt: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [waitlist, setWaitlist] = useState<WaitlistSignup[] | null>(null);
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      const res = await fetch("/api/admin/data");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (ignore) return;
      if (!data.ok) {
        setError(data.error ?? "Failed to load data.");
        return;
      }
      setWaitlist(data.waitlist);
      setMessages(data.messages);
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleHandled(id: string, handled: boolean) {
    setMessages((prev) => prev?.map((m) => (m.id === id ? { ...m, handled } : m)) ?? null);
    await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, handled }),
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="admin-shell">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 22 }}>NEXUS admin</h1>
          <button className="btn btn-secondary" onClick={logout}>
            Sign out
          </button>
        </div>

        {error && <div className="form-status error" style={{ marginBottom: 20 }}>{error}</div>}

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>
            Waitlist signups {waitlist ? `(${waitlist.length})` : ""}
          </h2>
          <div className="panel" style={{ padding: 0, overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Language</th>
                  <th>Source</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {waitlist?.map((w) => (
                  <tr key={w.id}>
                    <td>{w.email}</td>
                    <td>{w.locale}</td>
                    <td>{w.source ?? "—"}</td>
                    <td>{formatDate(w.createdAt)}</td>
                  </tr>
                ))}
                {waitlist?.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ color: "var(--nx-text-faint)" }}>
                      No signups yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>
            Contact messages {messages ? `(${messages.length})` : ""}
          </h2>
          <div className="panel" style={{ padding: 0, overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {messages?.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ color: "var(--nx-text-faint)", fontSize: 12.5 }}>{m.email}</div>
                    </td>
                    <td style={{ maxWidth: 420, whiteSpace: "pre-wrap" }}>{m.message}</td>
                    <td>{formatDate(m.createdAt)}</td>
                    <td>
                      <button
                        className={`pill ${m.handled ? "pill-handled" : "pill-open"}`}
                        style={{ border: "none", cursor: "pointer" }}
                        onClick={() => toggleHandled(m.id, !m.handled)}
                      >
                        {m.handled ? "Handled" : "Open"}
                      </button>
                    </td>
                  </tr>
                ))}
                {messages?.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ color: "var(--nx-text-faint)" }}>
                      No messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
