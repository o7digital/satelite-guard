export default function SatelliteGuardHome() {
  const services = [
    {
      title: "Rastreo GPS",
      text: "Localiza vehículos, unidades y activos en tiempo real con una interfaz clara y confiable.",
      icon: "📍",
    },
    {
      title: "Gestión de flotillas",
      text: "Controla rutas, operación, tiempos y comportamiento de tu flotilla desde una sola plataforma.",
      icon: "🚛",
    },
    {
      title: "Alertas inteligentes",
      text: "Recibe notificaciones por movimiento no autorizado, zonas restringidas y eventos críticos.",
      icon: "🚨",
    },
    {
      title: "Soporte 24/7",
      text: "Atención continua para clientes empresariales y particulares con enfoque operativo.",
      icon: "🎧",
    },
  ];

  const stats = [
    { value: "+24/7", label: "Monitoreo activo" },
    { value: "+8,500", label: "Vehículos monitoreados" },
    { value: "+120,000", label: "Alertas atendidas" },
    { value: "+15", label: "Años de experiencia" },
  ];

  const solutions = [
    "Vehículos particulares",
    "Flotillas empresariales",
    "Transporte y logística",
    "Maquinaria y activos",
    "Control de rutas",
    "Botón de emergencia",
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_30%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl bg-blue-600/20 text-[2.5rem] ring-1 ring-blue-400/30">
              🛰️
            </div>
            <div>
              <p className="text-xl font-bold tracking-wide">
                SATELLITE <span className="text-blue-400">GUARD</span>
              </p>
              <p className="text-xs text-slate-400">Seguridad, rastreo y control</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#inicio" className="transition hover:text-white">Inicio</a>
            <a href="#servicios" className="transition hover:text-white">Soluciones</a>
            <a href="#empresa" className="transition hover:text-white">Nosotros</a>
            <a href="#contacto" className="transition hover:text-white">Contacto</a>
          </nav>

          <a
            href="#contacto"
            className="rounded-xl border border-blue-400/40 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
          >
            Cotizar
          </a>
        </header>

        <div
          id="inicio"
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pt-16"
        >
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-200">
              Plataforma moderna de rastreo satelital y monitoreo vehicular
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight md:text-6xl">
              SEGURIDAD, RASTREO
              <br />
              Y <span className="text-blue-400">CONTROL TOTAL</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Protege tus vehículos, flotillas y activos con tecnología GPS de última generación,
              alertas inteligentes y visibilidad operativa en tiempo real.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Cotizar ahora
              </a>
              <a
                href="#servicios"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Más información
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-2xl font-bold text-blue-400">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative rounded-[28px] border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[24px] border border-white/10 bg-[#07111f] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Centro de monitoreo
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">Dashboard en tiempo real</h2>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                    En línea
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-3 text-sm text-slate-300">Mapa GPS</p>
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-blue-400/30 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25),transparent_40%)] text-center text-sm text-slate-400">
                      Vista de mapa, rutas, zonas seguras,
                      <br />
                      geocercas y alertas activas
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-300">Última alerta</p>
                      <p className="mt-2 text-xl font-bold">Movimiento no autorizado</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Unidad detectada fuera de horario permitido.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-300">Cobertura</p>
                      <p className="mt-2 text-xl font-bold">GPS + Monitoreo</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Infraestructura orientada a visibilidad y control operativo.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-300">Atención</p>
                      <p className="mt-2 text-xl font-bold">Soporte comercial</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Instalación, seguimiento y asesoría especializada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Servicios</p>
          <h2 className="mt-4 text-4xl font-bold">Soluciones para seguridad y operación</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Una propuesta visual más moderna para transmitir confianza, tecnología
            y capacidad de respuesta real.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-lg shadow-black/20"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl ring-1 ring-blue-400/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="empresa" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 lg:grid-cols-2 lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Protección total</p>
            <h2 className="mt-4 text-4xl font-bold">Protege lo que más importa</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Este concepto presenta a Satellite Guard como una empresa más sólida,
              más confiable y más preparada para captar clientes empresariales.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {solutions.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#0f172a,#111827,#1e3a8a)] p-8 shadow-xl">
            <div className="flex h-full min-h-[380px] flex-col justify-between rounded-[22px] border border-white/10 bg-black/20 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Imagen de marca</p>
                <h3 className="mt-4 text-3xl font-bold">Más premium. Más seria. Más vendible.</h3>
                <p className="mt-5 text-slate-300 leading-7">
                  El nuevo diseño mejora la percepción de tecnología, control,
                  confianza y atención profesional para clientes B2B y particulares.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Ideal para comunicar:</p>
                <ul className="mt-4 space-y-3 text-slate-200">
                  <li>• Seguridad vehicular</li>
                  <li>• Monitoreo empresarial</li>
                  <li>• Gestión de flotillas</li>
                  <li>• Tecnología GPS de última generación</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f,#030712)]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Contacto</p>
          <h2 className="mt-4 text-4xl font-bold">¿Listo para asegurar tus activos?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Obtén una cotización y descubre cómo una presencia digital más fuerte puede
            ayudar a vender mejor tus soluciones de seguridad y rastreo.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+525500000000"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Llamar ahora
            </a>
            <a
              href="mailto:contacto@satelliteguard.com.mx"
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
