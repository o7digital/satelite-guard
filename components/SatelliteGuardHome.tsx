export default function SatelliteGuardPremiumMockup() {
  const features = [
    {
      title: 'Monitoreo en tiempo real',
      text: 'Ubicación precisa, rutas, geocercas, historial y eventos críticos en una interfaz clara y ejecutiva.',
    },
    {
      title: 'Centro de control 24/7',
      text: 'Diseñado para transmitir vigilancia activa, respuesta inmediata y operación continua para clientes exigentes.',
    },
    {
      title: 'Alertas inteligentes',
      text: 'Exceso de velocidad, movimiento no autorizado, ignición, desvíos de ruta y zonas restringidas.',
    },
    {
      title: 'Flotillas y activos',
      text: 'Ideal para transporte, logística, seguridad privada, maquinaria, reparto y vehículos particulares premium.',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Monitoreo activo' },
    { value: '8,500+', label: 'Unidades vigiladas' },
    { value: '120k+', label: 'Eventos procesados' },
    { value: '15+', label: 'Años de experiencia' },
  ];

  const pillars = [
    'Seguridad vehicular premium',
    'Monitoreo empresarial',
    'Control de flotillas',
    'Recuperación y respuesta',
    'Geolocalización avanzada',
    'Visibilidad operativa total',
  ];

  const solutions = [
    'Transporte y logística',
    'Vehículos particulares',
    'Renta de autos',
    'Escoltas y seguridad',
    'Maquinaria y activos',
    'Flotillas corporativas',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#02050b] text-white">
      <section className="relative isolate min-h-screen border-b border-white/10 bg-[#02050b]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,3,9,0.96)_0%,rgba(1,3,9,0.78)_36%,rgba(1,3,9,0.52)_58%,rgba(1,3,9,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.18),transparent_16%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.14),transparent_18%),radial-gradient(circle_at_56%_72%,rgba(15,23,42,0.42),transparent_36%)]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="absolute left-[-8%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[6%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div>
              <div className="text-xs uppercase tracking-[0.38em] text-amber-300/85">Satellite Guard</div>
              <div className="text-sm text-white/50">Elite GPS Monitoring</div>
            </div>
            <nav className="hidden gap-8 text-sm text-white/70 md:flex">
              <a href="#" className="transition hover:text-white">Inicio</a>
              <a href="#" className="transition hover:text-white">Tecnología</a>
              <a href="#" className="transition hover:text-white">Flotillas</a>
              <a href="#" className="transition hover:text-white">Cobertura</a>
              <a href="#" className="transition hover:text-white">Contacto</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 md:inline-flex">Acceso clientes</button>
              <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">Agenda demo</button>
            </div>
          </header>

          <div className="relative grid flex-1 items-center gap-14 pb-14 pt-44 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20 lg:pt-56 xl:pb-24 xl:pt-64">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200">
                Seguridad · Inteligencia · Control total
              </div>
              <h1 className="text-5xl font-semibold leading-[0.92] tracking-tight md:text-6xl xl:text-[5.35rem]">
                Monitoreo GPS con una presencia
                <span className="block bg-gradient-to-r from-white via-amber-200 to-cyan-200 bg-clip-text text-transparent">
                  ultra premium y mucho más exclusiva.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                La V4 lleva Satellite Guard a una estética más aspiracional y más fuerte comercialmente: vigilancia ejecutiva, tecnología de precisión y una imagen de marca que sí parece de alto nivel.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:scale-[1.02]">
                  Ver experiencia premium
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Solicitar cotización
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border border-white/10 bg-black/30 p-4 shadow-xl shadow-black/30 backdrop-blur-xl">
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-white/55">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute right-[-4%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/8 blur-3xl" />
              <div className="relative ml-auto w-full max-w-[42rem]">
                <div className="rounded-[2.5rem] border border-white/10 bg-[#07101c]/58 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                  <div className="relative h-[38rem] overflow-hidden rounded-[2rem]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(34,211,238,0.20),transparent_14%),radial-gradient(circle_at_75%_22%,rgba(251,191,36,0.18),transparent_16%),linear-gradient(180deg,rgba(3,7,18,0.2),rgba(3,7,18,0.68))]" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.84),rgba(2,6,23,0.36),rgba(2,6,23,0.76))]" />

                    <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4">
                      <div className="rounded-2xl border border-white/10 bg-[#07101c]/80 px-4 py-3 backdrop-blur-xl">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">Satellite view</div>
                        <div className="mt-1 text-lg font-semibold">Fleet Command</div>
                      </div>
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        Operativo en línea
                      </div>
                    </div>

                    <div className="absolute inset-x-6 top-24 bottom-6 grid gap-4 lg:grid-cols-[1.1fr_0.62fr]">
                      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,16,28,0.76),rgba(8,18,33,0.88))] p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white/45">Vista geoespacial</div>
                            <div className="text-xl font-semibold">Cobertura táctica de unidades</div>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-200">GPS · IoT · Satellite</div>
                        </div>

                        <div className="relative h-[24rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_24%_26%,rgba(34,211,238,0.26),transparent_13%),radial-gradient(circle_at_73%_46%,rgba(251,191,36,0.18),transparent_15%),radial-gradient(circle_at_67%_76%,rgba(16,185,129,0.14),transparent_16%),linear-gradient(180deg,#07101c,#10203a)]">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-25" />
                          <div className="absolute left-[12%] top-[22%] h-4 w-4 rounded-full bg-amber-300 shadow-[0_0_30px_rgba(252,211,77,0.95)]" />
                          <div className="absolute left-[38%] top-[42%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.95)]" />
                          <div className="absolute left-[72%] top-[58%] h-4 w-4 rounded-full bg-emerald-300 shadow-[0_0_28px_rgba(110,231,183,0.95)]" />
                          <div className="absolute left-[58%] top-[24%] h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.92)]" />
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M12 22 C 18 24, 24 30, 38 42 S 56 48, 72 58" fill="none" stroke="rgba(255,255,255,0.44)" strokeWidth="1.15" strokeDasharray="4 3" />
                            <path d="M58 24 C 50 28, 45 34, 38 42" fill="none" stroke="rgba(34,211,238,0.42)" strokeWidth="1.15" strokeDasharray="4 3" />
                          </svg>

                          <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-[#07101c]/85 px-4 py-3 backdrop-blur-xl">
                            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Unidad prioritaria</div>
                            <div className="mt-1 text-sm font-semibold">SUV Executive 07</div>
                            <div className="text-xs text-white/50">Ruta monitoreada en tiempo real</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                          <div className="text-sm text-white/45">Alertas críticas</div>
                          <div className="mt-2 text-3xl font-semibold">03</div>
                          <p className="mt-2 text-sm leading-6 text-white/58">
                            Eventos de alta prioridad con seguimiento inmediato y protocolo activo.
                          </p>
                        </div>

                        <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                          <div className="text-sm text-white/45">Última incidencia</div>
                          <div className="mt-2 text-lg font-semibold">Movimiento no autorizado</div>
                          <p className="mt-2 text-sm leading-6 text-white/58">
                            Desvío fuera de geocerca. Traza registrada y operador notificado.
                          </p>
                        </div>

                        <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                          <div className="text-sm text-white/45">Estatus ejecutivo</div>
                          <div className="mt-4 space-y-3 text-sm text-white/60">
                            <div className="flex items-center justify-between"><span>Unidades activas</span><span className="font-semibold text-white">126</span></div>
                            <div className="flex items-center justify-between"><span>Geocercas activas</span><span className="font-semibold text-white">41</span></div>
                            <div className="flex items-center justify-between"><span>Rutas vigiladas</span><span className="font-semibold text-white">18</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-7 left-8 rounded-[1.6rem] border border-white/10 bg-[#07101c]/86 px-5 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">Respuesta promedio</div>
                  <div className="mt-1 text-2xl font-semibold text-white">2m 34s</div>
                  <div className="text-xs text-white/50">Atención prioritaria de eventos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Nueva dirección visual</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Más cinematográfica, más exclusiva y mucho más vendible.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
              Aquí la marca empieza a parecer una solución premium de seguridad vehicular y monitoreo empresarial, no solo una web informativa de GPS.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {pillars.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-300/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-xs uppercase tracking-[0.2em] text-amber-200">
                  SG
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2 xl:grid-cols-4 xl:p-5">
          {['Diseño premium más aspiracional', 'Hero con aura de marca fuerte', 'Dashboard con más presencia visual', 'Mejor percepción de valor comercial'].map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-white/10 bg-[#07101c]/70 p-5 text-sm text-white/68">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Soluciones premium</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Pensado para flotillas, seguridad privada, logística y activos de alto valor.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/62">
              Este bloque deja más claro el business case y hace que la oferta se entienda como un servicio serio de protección y visibilidad operativa.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {solutions.map((item) => (
              <div key={item} className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-white/40">Solución</div>
                <div className="mt-3 text-xl font-semibold">{item}</div>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Monitoreo visual, seguimiento de rutas, eventos críticos y operación con una presencia digital mucho más premium.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 shadow-2xl shadow-black/10">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Lo que cambia en V3</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Ahora el sitio tiene una presencia mucho más memorable.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
              La V3 sube el nivel visual, mete una atmósfera más premium y hace que el producto parezca más sólido, más caro y más confiable.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.10),rgba(255,255,255,0.04),rgba(34,211,238,0.08))] p-8">
            <div className="text-lg font-semibold">Qué está mejor ahora</div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
              <li>Hero con aura mucho más premium.</li>
              <li>Composición más cinemática y aspiracional.</li>
              <li>Dashboard con sensación de producto ejecutivo.</li>
              <li>Mejor narrativa para vender seguridad y control.</li>
              <li>Percepción de marca claramente superior.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.14),rgba(255,255,255,0.03),rgba(34,211,238,0.09))] p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Call to action premium</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Protege vehículos, flotillas y activos con una imagen de marca realmente más fuerte.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Esta V3 ya puede servir comme base beaucoup plus sérieuse avant de passer au front final ou à un brief Codex plus ambitieux.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Aprobar diseño</button>
              <button className="rounded-full border border-white/15 bg-black/20 px-6 py-3 text-sm font-medium text-white">Pedir backend demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
