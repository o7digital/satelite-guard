import Link from "next/link";
import { redirect } from "next/navigation";

function getAdminUrl() {
  const value = process.env.NEXT_PUBLIC_ADMIN_URL?.trim();

  if (!value) {
    return null;
  }

  return value.replace(/\/+$/, "");
}

export default function LoginPage() {
  const adminUrl = getAdminUrl();

  if (adminUrl) {
    redirect(`${adminUrl}/login`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_28%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/40 backdrop-blur md:p-12">
          <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-200">
            Acceso admin
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Login disponible desde el sitio principal
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            El botón de acceso ya está visible en la landing. Para abrir el dashboard admin
            directamente desde este dominio, configura la variable{" "}
            <span className="font-semibold text-white">NEXT_PUBLIC_ADMIN_URL</span> con la URL
            pública del panel de monitoreo.
          </p>

          <div className="mt-10 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Production</p>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Añade <span className="font-semibold text-white">NEXT_PUBLIC_ADMIN_URL</span> en
                tu entorno Vercel para que <span className="font-semibold text-white">/login</span>{" "}
                redirija automáticamente al panel admin.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Local</p>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Lance <span className="font-semibold text-white">npm run dev:platform</span> pour
                démarrer l’application admin dédiée, puis utilise son écran{" "}
                <span className="font-semibold text-white">/login</span>.
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
            <a
              href="#contacto"
              className="rounded-xl border border-blue-400/40 bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
            >
              Contact commercial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
