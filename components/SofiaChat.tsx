"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { usePathname } from "next/navigation";

const SITE_CODE = "sateliteguard";
const LEAD_ENDPOINT = "https://www.o7digital.com/api/o7-lead";
const CHAT_ENDPOINT = "https://www.o7digital.com/api/o7-chat";

const COPY = {
  es: {
    title: "Sofia",
    subtitle: "Asistente Satellite Guard",
    status: "En linea",
    teaser: "Necesitas ayuda?",
    open: "Abrir chat",
    close: "Cerrar chat",
    welcome: "Hola, soy Sofia. En que puedo ayudarte?",
    leadIntro: "Deja tus datos para que un asesor de Satellite Guard pueda contactarte.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    phone: "Telefono",
    submitLead: "Enviar datos",
    leadThanks: "Gracias. Tus datos fueron enviados y un asesor te contactara pronto.",
    placeholder: "Escribe tu pregunta...",
    send: "Enviar",
    error: "No pude enviar el mensaje. Intenta de nuevo o contacta directamente a Satellite Guard.",
  },
  en: {
    title: "Sofia",
    subtitle: "Satellite Guard Assistant",
    status: "Online",
    teaser: "Need help?",
    open: "Open chat",
    close: "Close chat",
    welcome: "Hello, I am Sofia. How can I help you?",
    leadIntro: "Leave your details so a Satellite Guard advisor can contact you.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    submitLead: "Send details",
    leadThanks: "Thanks. Your details were sent and an advisor will contact you soon.",
    placeholder: "Write your question...",
    send: "Send",
    error: "I could not send the message. Please try again or contact Satellite Guard directly.",
  },
};

function getLanguage(pathname: string | null) {
  return pathname?.startsWith("/en") ? "en" : "es";
}

function detectMessageLanguage(message: string, fallbackLanguage: "es" | "en") {
  const value = message.toLowerCase();
  const spanishHints = /\b(hola|gracias|quiero|precio|precios|tarifa|tarifas|cita|informacion|rastreo|monitoreo|flotilla|vehiculo|gps|seguridad|geocerca|telefono)\b/;
  const englishHints = /\b(hello|thanks|price|prices|quote|appointment|information|tracking|monitoring|fleet|vehicle|gps|security|geofence|phone)\b/;

  if (spanishHints.test(value)) return "es";
  if (englishHints.test(value)) return "en";
  return fallbackLanguage;
}

export default function SofiaChat() {
  const pathname = usePathname();
  const language = getLanguage(pathname);
  const copy = COPY[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(true);
  const [lead, setLead] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [messages, setMessages] = useState([{ role: "assistant", content: copy.welcome }]);

  const transcript = useMemo(
    () => messages.map((message) => `${message.role}: ${message.content}`).join("\n"),
    [messages],
  );

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const payload = {
      firstName: lead.firstName.trim(),
      lastName: lead.lastName.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
      source: "Chat Sofia Satellite Guard",
      language,
      siteCode: SITE_CODE,
      message: `Lead Chat Sofia Satellite Guard (${language}, ${SITE_CODE})\n\n${transcript}`,
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) return;

    setIsLoading(true);
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Lead delivery failed");

      setLeadSent(true);
      setMessages((current) => [...current, { role: "assistant", content: copy.leadThanks }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading || !leadSent) return;
    const messageLanguage = detectMessageLanguage(message, language);

    setInput("");
    setMessages((current) => [...current, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: messageLanguage, siteCode: SITE_CODE }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: "assistant", content: data.reply || copy.error }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      {isOpen && (
        <section className="mb-3 flex h-[min(650px,calc(100vh-110px))] w-[min(390px,calc(100vw-28px))] flex-col overflow-hidden rounded-2xl border border-cyan-300/25 bg-slate-950 text-white shadow-2xl shadow-cyan-950/50">
          <header className="flex items-center justify-between gap-4 border-b border-cyan-300/15 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-5">
            <div>
              <p className="text-lg font-black uppercase tracking-wide text-cyan-200">{copy.title}</p>
              <p className="text-sm text-slate-300">{copy.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-cyan-300/25 px-3 py-1 text-xs text-cyan-100">{copy.status}</span>
              <button type="button" className="h-10 w-10 rounded-full bg-cyan-300 font-black text-slate-950" onClick={() => setIsOpen(false)} aria-label={copy.close}>
                x
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:100%_44px] p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`w-fit max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-cyan-300 text-slate-950" : "bg-slate-800 text-slate-100"}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="w-fit rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-100">...</div>}
          </div>

          {!leadSent && (
            <form className="grid grid-cols-2 gap-2 border-t border-white/10 bg-slate-900 p-4" onSubmit={submitLead}>
              <p className="col-span-2 text-sm leading-relaxed text-slate-300">{copy.leadIntro}</p>
              <input required className="min-w-0 rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-sm outline-none focus:border-cyan-300" placeholder={copy.firstName} value={lead.firstName} onChange={(event) => setLead((current) => ({ ...current, firstName: event.target.value }))} />
              <input required className="min-w-0 rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-sm outline-none focus:border-cyan-300" placeholder={copy.lastName} value={lead.lastName} onChange={(event) => setLead((current) => ({ ...current, lastName: event.target.value }))} />
              <input required type="email" className="min-w-0 rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-sm outline-none focus:border-cyan-300" placeholder={copy.email} value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} />
              <input required type="tel" className="min-w-0 rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-sm outline-none focus:border-cyan-300" placeholder={copy.phone} value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} />
              <button type="submit" disabled={isLoading} className="col-span-2 rounded-xl bg-cyan-300 px-4 py-3 font-black text-slate-950 disabled:opacity-60">
                {copy.submitLead}
              </button>
            </form>
          )}

          <div className="grid grid-cols-[1fr_52px] gap-2 border-t border-white/10 bg-slate-950 p-4">
            <input value={input} disabled={!leadSent || isLoading} placeholder={copy.placeholder} className="min-w-0 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-cyan-300 disabled:opacity-60" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} />
            <button type="button" onClick={sendMessage} disabled={!leadSent || isLoading} className="rounded-xl bg-cyan-300 font-black text-slate-950 disabled:opacity-60" aria-label={copy.send}>
              &gt;
            </button>
          </div>
        </section>
      )}

      {!isOpen && (
        <button type="button" className="mb-3 ml-auto flex items-center gap-3 rounded-full border border-cyan-300/30 bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-950/40" onClick={() => setIsOpen(true)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 font-black text-slate-950">S</span>
          {copy.teaser}
        </button>
      )}
      <button type="button" className="ml-auto block h-16 min-w-16 rounded-full bg-cyan-300 px-4 font-black text-slate-950 shadow-xl shadow-cyan-950/40" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? copy.close : copy.open}>
        {isOpen ? "x" : "Sofia"}
      </button>
    </div>
  );
}
