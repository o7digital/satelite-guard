"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/+$/, "");

function normalizeUser(value: string) {
  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return "";
  }

  if (trimmed.includes("@")) {
    return trimmed;
  }

  if (trimmed === "admin") {
    return "admin@sateliteguard.com";
  }

  if (trimmed === "operador" || trimmed === "operator") {
    return "operador@sateliteguard.com";
  }

  return `${trimmed}@sateliteguard.com`;
}

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const normalizedUser = useMemo(() => normalizeUser(user), [user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL n'est pas configurée sur ce site.");
      return;
    }

    if (!normalizedUser) {
      setError("Saisis un identifiant valide.");
      return;
    }

    if (!password) {
      setError("Saisis ton mot de passe.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedUser,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Identifiants invalides ou API indisponible.");
      }

      const session = (await response.json()) as {
        accessToken: string;
        user?: {
          email?: string;
          name?: string;
          role?: string;
        };
      };

      window.localStorage.setItem("sg_token", session.accessToken);
      window.localStorage.setItem("sg_user", JSON.stringify(session.user ?? { email: normalizedUser }));

      if (ADMIN_URL) {
        window.location.assign(`${ADMIN_URL}/admin`);
        return;
      }

      router.push("/admin");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Connexion impossible pour le moment.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_28%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-12">
            <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-200">
              Acceso admin
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              Connexion au panel de monitoring
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Tu peux saisir directement <span className="font-semibold text-white">admin</span>{" "}
              comme identifiant. Il sera envoyé vers le compte admin de la plateforme.
            </p>

            <div className="mt-10 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Identifiant</p>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  Valeur rapide: <span className="font-semibold text-white">admin</span>
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Résolution automatique: {normalizedUser || "admin@sateliteguard.com"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Destination</p>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  Après connexion, ouverture de l’espace admin configuré.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Sans URL admin externe, le site te redirige vers{" "}
                  <span className="font-semibold text-white">/admin</span>.
                </p>
              </div>
            </div>
          </div>

          <form
            className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/30 backdrop-blur md:p-10"
            onSubmit={handleSubmit}
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Sign in</p>
            <h2 className="mt-4 text-3xl font-semibold">User / password</h2>
            <p className="mt-3 text-slate-300">
              Connecte-toi ici, sans page intermédiaire.
            </p>

            <label className="mt-8 block text-sm font-medium text-slate-200" htmlFor="user">
              User
            </label>
            <input
              id="user"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50"
              onChange={(event) => setUser(event.target.value)}
              placeholder="admin"
              value={user}
            />

            <label className="mt-6 block text-sm font-medium text-slate-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Votre mot de passe"
              type="password"
              value={password}
            />

            {error ? (
              <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-4 text-sm text-rose-100">
                {error}
              </div>
            ) : null}

            <button
              className="mt-8 w-full rounded-2xl border border-blue-400/40 bg-blue-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
              type="submit"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Retour au site
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
