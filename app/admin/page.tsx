"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/+$/, "");

type StoredUser = {
  email?: string;
  name?: string;
  role?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const session = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        hydrated: false,
        token: null as string | null,
        user: null as StoredUser | null,
      };
    }

    const storedToken = window.localStorage.getItem("sg_token");
    const storedUser = window.localStorage.getItem("sg_user");

    let parsedUser: StoredUser | null = null;

    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser) as StoredUser;
      } catch {
        parsedUser = null;
      }
    }

    return {
      hydrated: true,
      token: storedToken,
      user: parsedUser,
    };
  }, []);

  useEffect(() => {
    if (!session.hydrated) {
      return;
    }

    if (!session.token) {
      router.replace("/login");
      return;
    }

    if (ADMIN_URL) {
      window.location.replace(`${ADMIN_URL}/admin`);
    }
  }, [router, session.hydrated, session.token]);

  const shortToken = useMemo(() => {
    if (!session.token) {
      return null;
    }

    return `${session.token.slice(0, 18)}...${session.token.slice(-10)}`;
  }, [session.token]);

  if (!session.hydrated || !session.token || Boolean(ADMIN_URL)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center backdrop-blur">
          Vérification de la session admin...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_28%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-12">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-emerald-200">
            Session active
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Accès admin validé
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            La connexion a bien été prise en compte depuis le site principal.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">User</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {session.user?.email ?? "admin@sateliteguard.com"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Role</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {session.user?.role ?? "admin"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Token</p>
              <p className="mt-3 break-all text-sm text-slate-300">
                {shortToken ?? "Session locale"}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Retour au site
            </Link>

            <button
              className="rounded-xl border border-blue-400/40 bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
              onClick={() => {
                window.localStorage.removeItem("sg_token");
                window.localStorage.removeItem("sg_user");
                router.replace("/login");
              }}
              type="button"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
