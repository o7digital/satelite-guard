"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/+$/, "");

type StoredUser = { email?: string; name?: string; role?: string };

export default function AdminPageEn() {
  const router = useRouter();
  const session = useMemo(() => {
    if (typeof window === "undefined") return { hydrated: false, token: null as string | null, user: null as StoredUser | null };
    const token = window.localStorage.getItem("sg_token");
    const storedUser = window.localStorage.getItem("sg_user");
    let user: StoredUser | null = null;
    if (storedUser) {
      try { user = JSON.parse(storedUser) as StoredUser; } catch { user = null; }
    }
    return { hydrated: true, token, user };
  }, []);

  useEffect(() => {
    if (!session.hydrated) return;
    if (!session.token) return router.replace("/en/login");
    if (ADMIN_URL) window.location.replace(`${ADMIN_URL}/admin`);
  }, [router, session.hydrated, session.token]);

  if (!session.hydrated || !session.token || Boolean(ADMIN_URL)) {
    return <main className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-white"><div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6">Checking admin session...</div></main>;
  }

  return (
    <main className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Admin access confirmed</h1>
        <p className="mt-3 text-slate-300">You are signed in from the main website.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase text-slate-400">User</p><p className="mt-2">{session.user?.email ?? "admin@sateliteguard.com"}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase text-slate-400">Role</p><p className="mt-2">{session.user?.role ?? "admin"}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase text-slate-400">Session</p><p className="mt-2">Active</p></div>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/en" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2">Back to site</Link>
          <button type="button" className="rounded-xl bg-blue-600 px-4 py-2" onClick={() => { window.localStorage.removeItem("sg_token"); window.localStorage.removeItem("sg_user"); router.replace("/en/login"); }}>Sign out</button>
        </div>
      </div>
    </main>
  );
}
