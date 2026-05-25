import SyscomStoreSection from "./SyscomStoreSection"

export default async function SatelliteGuardPremiumMockup() {
  const seoKeywords = [
    "monitoreo gps Mexico CDMX",
    "rastreo gps Mexico CDMX",
    "rastreo satelital Mexico CDMX",
    "seguimiento vehicular Mexico CDMX",
    "localizador gps para autos Mexico CDMX",
    "gps para flotillas Mexico CDMX",
    "control de flotillas Mexico CDMX",
    "monitoreo de flotillas Mexico CDMX",
    "geocercas gps Mexico CDMX",
    "alertas gps en tiempo real Mexico CDMX",
    "plataforma de monitoreo gps Mexico CDMX",
    "seguridad vehicular Mexico CDMX",
    "recuperación vehicular Mexico CDMX",
    "rastreo de activos Mexico CDMX",
    "monitoreo de activos móviles Mexico CDMX",
    "gps para transporte y logística Mexico CDMX",
    "sistema gps para empresas Mexico CDMX",
    "monitoreo 24/7 vehículos Mexico CDMX",
    "rastreo gps méxico Mexico CDMX",
    "monitoreo gps méxico Mexico CDMX",
    "control de flotillas méxico Mexico CDMX",
    "rastreo gps cdmx Mexico CDMX",
    "rastreo gps monterrey Mexico CDMX",
    "rastreo gps guadalajara Mexico CDMX",
    "tecnología satelital para vehículos Mexico CDMX",
  ];
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
      text: 'Ideal para transporte, logística, seguridad privada, maquinaria, reparto y vehículos particulares.',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Monitoreo activo' },
    { value: '8,500+', label: 'Unidades vigiladas' },
    { value: '120k+', label: 'Eventos procesados' },
    { value: '15+', label: 'Años de experiencia' },
  ];

  const pillars = [
    'Seguridad vehicular profesional',
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

  const products = [
    {
      name: "PRO43G",
      description:
        "Rastreador GPS para vehículos pesados con lectura CANbus (FMS, J1708 y J1939), protección contra interferencias (Jammer) y monitoreo avanzado.",
      features: [
        "Datos de GPS y acelerómetro en tiempo real",
        "Lectura CANbus y seguimiento de combustible",
        "Geo-cercas internas y alertas vía SMS",
        "Admite sensores adicionales",
      ],
    },
    {
      name: "Global Star",
      description:
        "Tecnología satelital para activos fijos y móviles. Funciona con la red Simplex de Globalstar y permite gestión inteligente de activos en zonas remotas.",
      features: [
        "Instalación rápida",
        "Compatible con plataforma EPCOMGPS",
        "Funciona con red eléctrica externa o baterías AAA",
        "Cobertura satelital amplia",
      ],
    },
    {
      name: "CTS-100",
      description:
        "Localizador para vehículo, bolso o activos de valor con consulta por SMS y seguimiento de ubicación en tiempo real.",
      features: [
        "Ubicación por mapa y seguimiento desde móvil",
        "No requiere cuota de plataforma",
        "Imanes integrados para instalación rápida",
        "Alarma SOS y precisión GPS aproximada de 10m",
      ],
    },
    {
      name: "Teléfono Satelital Iridium",
      description:
        "Equipo satelital robusto para operación en campo, resistente al agua, golpes y polvo (IP65), con alta portabilidad.",
      features: [
        "Estándar de durabilidad de grado militar",
        "Pantalla legible a la luz del día",
        "Antena de alta ganancia",
        "Batería de larga duración en espera y conversación",
      ],
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#02050b] text-white">
      <section id="inicio" className="relative isolate min-h-screen border-b border-white/10 bg-[#02050b]">
        <div className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-[70%_center] opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,3,9,0.76)_0%,rgba(1,3,9,0.48)_36%,rgba(1,3,9,0.20)_58%,rgba(1,3,9,0.40)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.12),transparent_16%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.10),transparent_18%),radial-gradient(circle_at_56%_72%,rgba(15,23,42,0.26),transparent_36%)]" />
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
              <a href="#inicio" className="transition hover:text-white">Inicio</a>
              <a href="#tecnologia" className="transition hover:text-white">Tecnología</a>
              <a href="#flotillas" className="transition hover:text-white">Flotillas</a>
              <a href="#quienes-somos" className="transition hover:text-white">Quiénes Somos</a>
              <a href="#tienda" className="transition hover:text-white">Productos</a>
              <a href="#contacto" className="transition hover:text-white">Contacto</a>
            </nav>
            <details className="relative z-[120] md:hidden">
              <summary className="list-none rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white/90">
                <span className="sr-only">Abrir menú</span>
                <span aria-hidden="true">☰</span>
              </summary>
              <nav className="fixed inset-0 z-[220] bg-black/45 p-4">
                <div className="ml-auto mt-20 w-64 rounded-2xl border border-white/15 bg-[#07101c]/98 p-3 text-sm text-white/90 shadow-2xl backdrop-blur-xl">
                  <a href="#inicio" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Inicio</a>
                  <a href="#tecnologia" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Tecnología</a>
                  <a href="#flotillas" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Flotillas</a>
                  <a href="#quienes-somos" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Quiénes Somos</a>
                  <a href="#tienda" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Productos</a>
                  <a href="#contacto" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Contacto</a>
                </div>
              </nav>
            </details>
            <div className="flex items-center gap-3">
              <a
                href="/en"
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                EN
              </a>
              <button className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 md:inline-flex">Acceso clientes</button>
            </div>
          </header>

          <div className="relative flex flex-1 items-center py-20 lg:min-h-[88vh] lg:py-24 xl:py-28">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200">
                Seguridad · Inteligencia · Control total
              </div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                Somos distribuidores SYSCOM Mexico
              </div>
              <h1 className="text-5xl font-semibold leading-[0.92] tracking-tight md:text-6xl xl:text-[5.35rem]">
                Monitoreo GPS con una presencia
                <span className="block bg-gradient-to-r from-white via-amber-200 to-cyan-200 bg-clip-text text-transparent">
                  más fuerte y confiable.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                La V4 fortalece la presencia de Satellite Guard con una imagen más profesional, operación clara y tecnología de precisión para monitoreo empresarial.
              </p>

              <div className="mt-10 overflow-hidden">
                <div className="flex w-max animate-[hero-stats_18s_linear_infinite] gap-4">
                  {[...stats, ...stats].map((item, index) => (
                  <div key={`${item.label}-${index}`} className="w-64 rounded-[1.35rem] border border-white/10 bg-black/30 p-4 shadow-xl shadow-black/30 backdrop-blur-xl">
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-white/55">{item.label}</div>
                  </div>
                ))}
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-amber-300/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tecnologia" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,#040915_0%,#07101c_52%,#040915_100%)] p-6 lg:p-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Centro de control</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Dashboard operativo separado del hero.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/62">
              Monitoreo visual, alertas críticas y estado ejecutivo en un espacio dedicado para lectura clara y toma de decisiones.
            </p>
          </div>

          <div className="relative mx-auto max-w-[68rem]">
            <div className="rounded-[2.5rem] border border-white/10 bg-[#07101c]/58 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="relative h-[38rem] overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(34,211,238,0.20),transparent_14%),radial-gradient(circle_at_75%_22%,rgba(251,191,36,0.18),transparent_16%),linear-gradient(180deg,rgba(3,7,18,0.2),rgba(3,7,18,0.68))]" />
                <div className="absolute inset-0 bg-[url('/dashboard-bg.webp')] bg-cover bg-center opacity-20" />
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <h2 className="text-3xl font-semibold">Servicios GPS en México</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <a href="/servicios/rastreo-gps" className="rounded-xl border border-white/15 p-4 hover:bg-white/5">Rastreo GPS en tiempo real</a>
          <a href="/servicios/control-de-flotillas" className="rounded-xl border border-white/15 p-4 hover:bg-white/5">Control de flotillas</a>
          <a href="/servicios/geocercas" className="rounded-xl border border-white/15 p-4 hover:bg-white/5">Geocercas y alertas</a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <h2 className="text-3xl font-semibold">Preguntas frecuentes</h2>
        <div className="mt-6 space-y-4 text-white/80">
          <div><h3 className="font-semibold text-white">¿Qué incluye el monitoreo GPS?</h3><p>Ubicación en vivo, historial de rutas, alertas críticas y panel de control para operación diaria.</p></div>
          <div><h3 className="font-semibold text-white">¿Sirve para flotillas y activos?</h3><p>Sí, la plataforma está diseñada para flotillas, vehículos particulares y activos móviles.</p></div>
          <div><h3 className="font-semibold text-white">¿Puedo configurar geocercas?</h3><p>Sí, puedes definir zonas y recibir alertas automáticas de entrada, salida o desvíos.</p></div>
        </div>
      </section>
      <section id="contacto" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Nueva dirección visual</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Más cinematográfica, más exclusiva y mucho más vendible.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
              Aquí la marca proyecta una solución profesional de seguridad vehicular y monitoreo empresarial, no solo una web informativa de GPS.
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
          {['Diseño más sólido y aspiracional', 'Hero con enfoque claro de marca', 'Dashboard con mayor presencia visual', 'Mejor percepción de valor comercial'].map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-white/10 bg-[#07101c]/70 p-5 text-sm text-white/68">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="flotillas" className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Soluciones de monitoreo</div>
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
                  Monitoreo visual, seguimiento de rutas, eventos críticos y operación con una presencia digital más clara y confiable.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quienes-somos" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">¿Quiénes Somos?</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Localización sin límites y sin fronteras.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              Somos un grupo de investigadores profesionales calificados dedicados a encontrar
              soluciones a los problemas de inseguridad y robo de autos y camiones.
            </p>
            <p className="mt-4 text-base leading-8 text-white/62">
              Aplicamos tecnología de vanguardia para proporcionar los servicios de rastreo y
              localización. Contamos con los dispositivos y equipos necesarios para que nuestros
              clientes tengan una herramienta de apoyo y control de su parque vehicular.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.10),rgba(255,255,255,0.04),rgba(34,211,238,0.08))] p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Cobertura</div>
            <p className="text-base leading-8 text-white/70">
              Nuestros centros de monitoreo situados estratégicamente en diferentes ciudades del
              mundo permiten una comunicación ágil, precisa y eficiente. Cobertura: Canadá, U.S.A.,
              México, Centroamérica, El Caribe, Colombia, Venezuela y Europa.
            </p>
          </div>
        </div>
      </section>

      <section id="productos" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10">
          <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Productos</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Equipos de vanguardia y alta calidad para rastreo satelital.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.name}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-2xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {product.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <SyscomStoreSection />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 shadow-2xl shadow-black/10">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Lo que cambia en V4</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Ahora el sitio tiene una presencia mucho más memorable.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
              La V4 refuerza la imagen del sitio y separa mejor el hero del dashboard.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.10),rgba(255,255,255,0.04),rgba(34,211,238,0.08))] p-8">
            <div className="text-lg font-semibold">Qué está mejor ahora</div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
              <li>Hero con enfoque visual más claro.</li>
              <li>Composición más cinemática y aspiracional.</li>
              <li>Dashboard con sensación de producto ejecutivo.</li>
              <li>Mejor narrativa para vender seguridad y control.</li>
              <li>Percepción de marca claramente superior.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cobertura" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.14),rgba(255,255,255,0.03),rgba(34,211,238,0.09))] p-8 md:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Solicita una cotización</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Protege vehículos, flotillas y activos con una imagen de marca realmente más fuerte.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Esta V4 ya puede servir como base más sólida para la siguiente etapa del front.
              </p>
            </div>
            <form
              action="https://formspree.io/f/xnjwkdqg"
              method="POST"
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="grid gap-3">
                <input
                  name="nombre"
                  required
                  placeholder="Nombre"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                />
                <input
                  name="telefono"
                  placeholder="Teléfono"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Correo electrónico"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                />
                <textarea
                  name="mensaje"
                  required
                  placeholder="Mensaje"
                  rows={4}
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                >
                  Solicitar Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 bg-black/45">
        <div className="mx-auto flex max-w-7xl justify-center px-6 pt-6 lg:px-10">
          <a href="#inicio" className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
            Back to top
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-xs leading-7 text-white/45 lg:px-10">
          {seoKeywords.join(" · ")}
        </div>
      </footer>
    </div>
  );
}
