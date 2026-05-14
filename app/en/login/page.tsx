"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/+$/, "");

function normalizeUser(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  if (trimmed.includes("@")) return trimmed;
  if (trimmed === "admin") return "admin@sateliteguard.com";
  if (trimmed === "operador" || trimmed === "operator") return "operador@sateliteguard.com";
  return `${trimmed}@sateliteguard.com`;
}

export default function LoginPageEn() {
  const router = useRouter();
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const normalizedUser = useMemo(() => normalizeUser(user), [user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!API_URL) return setError("NEXT_PUBLIC_API_URL is not configured on this site.");
    if (!normalizedUser) return setError("Enter a valid username.");
    if (!password) return setError("Enter your password.");

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedUser, password }),
      });
      if (!response.ok) throw new Error("Invalid credentials or API unavailable.");

      const session = (await response.json()) as { accessToken: string; user?: { email?: string; name?: string; role?: string } };
      window.localStorage.setItem("sg_token", session.accessToken);
      window.localStorage.setItem("sg_user", JSON.stringify(session.user ?? { email: normalizedUser }));

      if (ADMIN_URL) return window.location.assign(`${ADMIN_URL}/admin`);
      router.push("/en/admin");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-[#030712] text-white p-8"><form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4"><h1 className="text-3xl font-bold">Admin Sign In</h1><input className="w-full rounded bg-slate-900 p-3" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="admin"/><input className="w-full rounded bg-slate-900 p-3" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Your password"/>{error ? <div>{error}</div> : null}<button className="w-full rounded bg-blue-600 p-3" disabled={loading} type="submit">{loading ? "Signing in..." : "Sign in"}</button><Link href="/en" className="inline-block">Back to site</Link></form></main>;
}
