"use client";

import type { LoginResponse } from "@satelite-guard/types";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { API_URL } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login, ready, token } = useAuth();
  const [email, setEmail] = useState("admin@sateliteguard.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && token) {
      router.replace("/admin");
    }
  }, [ready, token, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const session = (await response.json()) as LoginResponse;
      window.localStorage.setItem("sg_token", session.accessToken);
      login(session);

      startTransition(() => {
        router.push("/admin");
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6 text-white">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_35%),rgba(255,255,255,0.04)] p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            Admin Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Satelite Guard</h1>
          <p className="mt-4 max-w-2xl text-white/65">
            L&apos;entrée admin est ici. En développement, utilise un compte
            seed puis le mot de passe défini côté serveur dans le fichier
            `.env`.
          </p>

          <div className="mt-8 grid gap-4">
            <button
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-cyan-400/30 hover:bg-white/10"
              onClick={() => setEmail("admin@sateliteguard.com")}
              type="button"
            >
              <div className="text-sm uppercase tracking-[0.25em] text-white/45">
                Superadmin
              </div>
              <div className="mt-2 text-lg font-medium text-white">
                admin@sateliteguard.com
              </div>
              <div className="mt-2 text-sm text-white/55">
                Mot de passe: valeur de `SEED_SUPERADMIN_PASSWORD` dans `.env`
              </div>
            </button>

            <button
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-cyan-400/30 hover:bg-white/10"
              onClick={() => setEmail("operador@sateliteguard.com")}
              type="button"
            >
              <div className="text-sm uppercase tracking-[0.25em] text-white/45">
                Operator
              </div>
              <div className="mt-2 text-lg font-medium text-white">
                operador@sateliteguard.com
              </div>
              <div className="mt-2 text-sm text-white/55">
                Mot de passe: valeur de `SEED_OPERATOR_PASSWORD` dans `.env`
              </div>
            </button>
          </div>
        </section>

        <form
          className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-2 text-3xl font-semibold">Sign in</h2>
          <p className="mb-6 text-white/60">Admin monitoring access</p>

          <input
            className="mb-4 w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            value={email}
          />

          <input
            className="mb-3 w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />

          <p className="mb-6 text-sm text-white/45">
            Le mot de passe n&apos;est pas affiché ici. Il est configuré dans
            le `.env` du serveur.
          </p>

          {error ? (
            <div className="mb-4 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
