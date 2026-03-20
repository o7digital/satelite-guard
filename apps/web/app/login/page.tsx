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
      <form
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 text-3xl font-semibold">Satelite Guard</h1>
        <p className="mb-6 text-white/60">Admin monitoring access</p>

        <input
          className="mb-4 w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          value={email}
        />

        <input
          className="mb-6 w-full rounded-xl bg-white/10 px-4 py-3 outline-none"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />

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
    </main>
  );
}
