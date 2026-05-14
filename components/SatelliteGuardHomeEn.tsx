export default function SatelliteGuardPremiumMockup() {
  const features = [
    {
      title: 'Real-time monitoring',
      text: 'Accurate location, routes, geofences, history, and critical events in a clear executive interface.',
    },
    {
      title: '24/7 control center',
      text: 'Designed to convey active surveillance, immediate response, and continuous operations for demanding clients.',
    },
    {
      title: 'Smart alerts',
      text: 'Speeding, unauthorized movement, ignition, route deviations, and restricted zones.',
    },
    {
      title: 'Fleets and assets',
      text: 'Ideal for transportation, logistics, private security, machinery, delivery operations, and personal vehicles.',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Active monitoring' },
    { value: '8,500+', label: 'Tracked units' },
    { value: '120k+', label: 'Processed events' },
    { value: '15+', label: 'Years of experience' },
  ];

  const pillars = [
    'Professional vehicle security',
    'Enterprise monitoring',
    'Fleet control',
    'Recovery and response',
    'Advanced geolocation',
    'Complete operational visibility',
  ];

  const solutions = [
    'Transportation and logistics',
    'Personal vehicles',
    'Car rental',
    'Escorts and security',
    'Machinery and assets',
    'Corporate fleets',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#02050b] text-white">
      <section className="relative isolate min-h-screen border-b border-white/10 bg-[#02050b]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-[70%_center] opacity-65" />
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
              <a href="#" className="transition hover:text-white">Home</a>
              <a href="#" className="transition hover:text-white">Technology</a>
              <a href="#" className="transition hover:text-white">Fleets</a>
              <a href="#" className="transition hover:text-white">Coverage</a>
              <a href="#" className="transition hover:text-white">Contact</a>
            </nav>
            <details className="relative md:hidden">
              <summary className="list-none rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white/90">
                <span className="sr-only">Open menu</span>
                <span aria-hidden="true">☰</span>
              </summary>
              <nav className="absolute right-0 top-12 z-30 w-52 rounded-2xl border border-white/15 bg-[#07101c]/95 p-3 text-sm text-white/85 shadow-2xl backdrop-blur-xl">
                <a href="#" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Home</a>
                <a href="#" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Technology</a>
                <a href="#" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Fleets</a>
                <a href="#" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Coverage</a>
                <a href="#" className="block rounded-lg px-2 py-1.5 transition hover:bg-white/10">Contact</a>
              </nav>
            </details>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                ES
              </a>
              <button className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 md:inline-flex">Client access</button>
              <button className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">Schedule demo</button>
            </div>
          </header>

          <div className="relative flex flex-1 items-center py-20 lg:min-h-[88vh] lg:py-24 xl:py-28">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200">
                Security · Intelligence · Total control
              </div>
              <h1 className="text-5xl font-semibold leading-[0.92] tracking-tight md:text-6xl xl:text-[5.35rem]">
                GPS monitoring with a presence
                <span className="block bg-gradient-to-r from-white via-amber-200 to-cyan-200 bg-clip-text text-transparent">
                  stronger and more reliable.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                V4 strengthens Satellite Guard's presence with a more professional image, clear operations, and precision technology for enterprise monitoring.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:scale-[1.02]">
                  Explore the platform
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Request a quote
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
              <div className="mt-8 flex items-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-amber-300/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,#040915_0%,#07101c_52%,#040915_100%)] p-6 lg:p-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Control center</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Operational dashboard separated from the hero section.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/62">
              Visual monitoring, critical alerts, and executive status in a dedicated area for clear reading and faster decision-making.
            </p>
          </div>

          <div className="relative mx-auto max-w-[68rem]">
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
                    Online operational
                  </div>
                </div>

                <div className="absolute inset-x-6 top-24 bottom-6 grid gap-4 lg:grid-cols-[1.1fr_0.62fr]">
                  <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,16,28,0.76),rgba(8,18,33,0.88))] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/45">Geospatial view</div>
                        <div className="text-xl font-semibold">Coverage táctica de unidades</div>
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
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Priority unit</div>
                        <div className="mt-1 text-sm font-semibold">SUV Executive 07</div>
                        <div className="text-xs text-white/50">Route monitored in real time</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                      <div className="text-sm text-white/45">Critical alerts</div>
                      <div className="mt-2 text-3xl font-semibold">03</div>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        High-priority events with immediate follow-up and active protocol.
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                      <div className="text-sm text-white/45">Latest incident</div>
                      <div className="mt-2 text-lg font-semibold">Unauthorized movement</div>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        Geofence deviation. Trace recorded and operator notified.
                      </p>
                    </div>

                    <div className="rounded-[1.6rem] border border-white/10 bg-[#07101c]/78 p-5 backdrop-blur-xl">
                      <div className="text-sm text-white/45">Executive status</div>
                      <div className="mt-4 space-y-3 text-sm text-white/60">
                        <div className="flex items-center justify-between"><span>Active units</span><span className="font-semibold text-white">126</span></div>
                        <div className="flex items-center justify-between"><span>Active geofences</span><span className="font-semibold text-white">41</span></div>
                        <div className="flex items-center justify-between"><span>Monitored routes</span><span className="font-semibold text-white">18</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 left-8 rounded-[1.6rem] border border-white/10 bg-[#07101c]/86 px-5 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">Average response</div>
              <div className="mt-1 text-2xl font-semibold text-white">2m 34s</div>
              <div className="text-xs text-white/50">Priority event handling</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">New visual direction</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              More cinematic, more exclusive, and far more marketable.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
              The brand now projects a professional vehicle-security and enterprise-monitoring solution, not just an informational GPS website.
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
          {['Stronger, more aspirational design', 'Hero section with clear brand focus', 'Dashboard with stronger visual presence', 'Better perceived commercial value'].map((item) => (
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
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Monitoring solutions</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Built for fleets, private security, logistics, and high-value assets.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/62">
              This section clarifies the business case and positions the offer as a serious protection and operational-visibility service.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {solutions.map((item) => (
              <div key={item} className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
                <div className="text-sm uppercase tracking-[0.22em] text-white/40">Solution</div>
                <div className="mt-3 text-xl font-semibold">{item}</div>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Visual monitoring, route tracking, critical events, and operations with a clearer and more reliable digital presence.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 shadow-2xl shadow-black/10">
            <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">What changes in V4</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              The site now has a much more memorable presence.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
              V4 reinforces the site's image and better separates the hero from the dashboard.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.10),rgba(255,255,255,0.04),rgba(34,211,238,0.08))] p-8">
            <div className="text-lg font-semibold">What's better now</div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
              <li>Hero with clearer visual focus.</li>
              <li>More cinematic and aspirational composition.</li>
              <li>Dashboard with an executive product feel.</li>
              <li>Stronger narrative to sell security and control.</li>
              <li>Clearly stronger brand perception.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.14),rgba(255,255,255,0.03),rgba(34,211,238,0.09))] p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Request a demo</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Protect vehicles, fleets, and assets with a truly stronger brand image.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                This V4 can now serve as a stronger foundation for the next frontend phase.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Approve design</button>
              <button className="rounded-full border border-white/15 bg-black/20 px-6 py-3 text-sm font-medium text-white">Request backend demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
