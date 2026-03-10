"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const navPatterns = [
  {
    name: "Bottom Navigation",
    icon: "⊟",
    platform: "Android + iOS",
    desc: "Barra inferior con destinos principales accesibles con el pulgar.",
    pros: ["Thumb-friendly", "Siempre visible", "Aprendizaje rápido"],
    cons: ["Máximo 5 opciones", "Ocupa espacio"],
    apps: "Instagram, TikTok, Spotify",
    use: "Apps con pocas secciones principales",
    color: "#6366f1",
  },
  {
    name: "Tab Bar",
    icon: "⊞",
    platform: "iOS",
    desc: "Patrón típico de iOS para navegar entre secciones principales.",
    pros: ["Familiar en iOS", "Transiciones fluidas"],
    cons: ["Menos usado en Android"],
    apps: "App Store, Apple Music",
    use: "Apps con categorías claras",
    color: "#8b5cf6",
  },
  {
    name: "Navigation Drawer",
    icon: "☰",
    platform: "Android",
    desc: "Menú lateral que aparece deslizando desde el borde.",
    pros: ["Muchas secciones", "Flexible"],
    cons: ["Difícil de descubrir"],
    apps: "Gmail, Google Drive",
    use: "Apps con muchas categorías",
    color: "#06b6d4",
  },
  {
    name: "Stack Navigation",
    icon: "⧉",
    platform: "Universal",
    desc: "Sistema jerárquico donde cada pantalla se apila.",
    pros: ["Flujo natural", "Jerarquía clara"],
    cons: ["Muchos niveles confunden"],
    apps: "Amazon, LinkedIn",
    use: "Flujos profundos",
    color: "#10b981",
  },
];

const gestures = [
  { gesture: "Tap", icon: "👆", desc: "Seleccionar elemento" },
  { gesture: "Double Tap", icon: "✌️", desc: "Zoom o like rápido" },
  { gesture: "Long Press", icon: "🤜", desc: "Menú contextual" },
  { gesture: "Swipe", icon: "👉", desc: "Navegar o descartar" },
  { gesture: "Pinch", icon: "🤏", desc: "Zoom in/out" },
  { gesture: "Drag", icon: "✋", desc: "Mover elementos" },
];

const demoScreens = [
  { title: "Inicio", text: "Feed de contenido principal." },
  { title: "Buscar", text: "Explorar contenido y usuarios." },
  { title: "Crear", text: "Publicar contenido nuevo." },
  { title: "Alertas", text: "Notificaciones recientes." },
  { title: "Perfil", text: "Información del usuario." },
];

export default function Section4() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);

  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  const bottomTabs = ["🏠", "🔍", "➕", "🔔", "👤"];

  return (
    <section id="navegacion" className="py-28 relative overflow-hidden" style={{background:"var(--surface)"}}>

      <div className="max-w-6xl mx-auto px-6">

      {/* HEADER */}

      <div ref={ref} className="reveal mb-20">

      <span className="badge"
      style={{
      background:"rgba(16,185,129,0.1)",
      border:"1px solid rgba(16,185,129,0.3)",
      color:"#10b981"
      }}>
      04 — Navegación
      </span>

      <h2 className="text-4xl font-bold mt-4 mb-4" style={{ color: "var(--text)" }}>
      Patrones de Navegación Móvil
      </h2>

      <p className="max-w-xl" style={{ color: "var(--muted)" }}>
      Los patrones de navegación definen cómo los usuarios se mueven dentro de una
      aplicación móvil y acceden a sus diferentes secciones.
      </p>

      </div>

      {/* NAVIGATION PATTERNS */}

      <div ref={ref2} className="reveal grid md:grid-cols-2 gap-10 mb-24">

      <div className="flex flex-col gap-3">

      {navPatterns.map((p,i)=>(
      <button
      key={p.name}
      onClick={()=>setActiveNav(i)}
      className="p-4 text-left border rounded-lg transition active:scale-95"
      style={{
      borderColor:activeNav===i?p.color:"rgba(255,255,255,0.1)",
      background:activeNav===i?`${p.color}15`:"transparent"
      }}
      >

      <div className="flex gap-3 items-center">

      <span style={{color:p.color}}>{p.icon}</span>

      <div>

      <div className="font-semibold" style={{ color: "var(--text)" }}>{p.name}</div>

      <div className="text-xs" style={{ color: "var(--muted)" }}>{p.platform}</div>

      </div>

      </div>

      </button>
      ))}

      </div>

      <div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>

      <p className="mb-6" style={{ color: "var(--text)" }}>
      {navPatterns[activeNav].desc}
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">

      <div>

      <div className="text-sm mb-2" style={{ color: "#10b981" }}>Ventajas</div>

      {navPatterns[activeNav].pros.map(p=>(
      <div key={p} className="text-sm" style={{ color: "var(--muted)" }}>• {p}</div>
      ))}

      </div>

      <div>

      <div className="text-sm mb-2" style={{ color: "#f43f5e" }}>Limitaciones</div>

      {navPatterns[activeNav].cons.map(c=>(
      <div key={c} className="text-sm" style={{ color: "var(--muted)" }}>• {c}</div>
      ))}

      </div>

      </div>

      <div className="text-sm mb-2" style={{ color: "var(--muted)" }}>
      <strong style={{ color: "var(--text)" }}>Cuándo usar:</strong> {navPatterns[activeNav].use}
      </div>

      <div className="text-sm" style={{ color: "var(--muted)" }}>
      <strong style={{ color: "var(--text)" }}>Apps que lo usan:</strong> {navPatterns[activeNav].apps}
      </div>

      </div>

      </div>

      {/* DEMO APP */}

      <div ref={ref3} className="mb-24">

      <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
      Demo de navegación móvil
      </h3>

      <div className="phone-screen h-64 border rounded-xl relative" style={{ borderColor: "var(--border)", background: "var(--surface2)" }}>

      <div className="p-6 text-center">

      <h4 className="font-semibold" style={{ color: "var(--text)" }}>
      {demoScreens[activeBottomTab].title}
      </h4>

      <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
      {demoScreens[activeBottomTab].text}
      </p>

      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t flex" style={{ borderColor: "var(--border)" }}>

      {bottomTabs.map((icon,i)=>(
      <button
      key={i}
      onClick={()=>setActiveBottomTab(i)}
      className="flex-1 py-3 text-lg transition active:scale-90"
      style={{
      color:activeBottomTab===i?navPatterns[activeNav].color:"var(--muted)"
      }}
      >
      {icon}
      </button>
      ))}

      </div>

      </div>

      </div>

      {/* GESTURES */}

      <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
      Gestos táctiles
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-24">

      {gestures.map(g=>(
      <div key={g.gesture}
      className="border rounded-lg p-5 text-center" style={{ borderColor: "var(--border)" }}>

      <div className="text-2xl mb-2">{g.icon}</div>

      <div className="font-semibold" style={{ color: "var(--text)" }}>{g.gesture}</div>

      <div className="text-sm" style={{ color: "var(--muted)" }}>{g.desc}</div>

      </div>
      ))}

      </div>

      {/* SAFE AREAS */}

      <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
      Safe Areas y Elementos del Sistema
      </h3>

      <div className="border rounded-xl p-8 grid md:grid-cols-2 gap-10 items-center mb-24" style={{ borderColor: "var(--border)" }}>

      <div>

      <p className="mb-6" style={{ color: "var(--text)" }}>
      Las <strong>safe areas</strong> son zonas donde el contenido de una aplicación
      puede mostrarse sin ser obstruido por elementos físicos o del sistema como
      el notch, barras de estado o el indicador de gestos.
      </p>

      <ul className="space-y-3 text-sm" style={{ color: "var(--muted)" }}>

      <li>🟣 <strong style={{ color: "var(--text)" }}>Status Bar</strong> — Información del sistema</li>
      <li>🟣 <strong style={{ color: "var(--text)" }}>Dynamic Island</strong> — Área de sensores</li>
      <li>🟢 <strong style={{ color: "var(--text)" }}>Content Area</strong> — Zona segura para contenido</li>
      <li>🔵 <strong style={{ color: "var(--text)" }}>Home Indicator</strong> — Área de gestos</li>

      </ul>

      </div>

      {/* PHONE DIAGRAM */}

      <div className="flex justify-center">

      <div className="relative w-40 h-80 rounded-3xl border" style={{ borderColor: "var(--border)", background: "var(--surface2)" }}>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full text-[8px] flex items-center justify-center" style={{ background: "var(--bg)", color: "#8b5cf6" }}>
      Dynamic Island
      </div>

      <div className="absolute top-10 left-3 right-3 bottom-16 border border-dashed flex items-center justify-center text-xs" style={{ borderColor: "#10b981", color: "#10b981" }}>
      Safe Content Area
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full animate-pulse" style={{ background: "#06b6d4" }}></div>

      </div>

      </div>

      </div>

      {/* PRINCIPIOS UX */}

<h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
Principios de UX móvil
</h3>

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="border p-6 rounded-lg hover:scale-[1.03] transition" style={{ borderColor: "var(--border)" }}>
<h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>👍 Thumb Zone</h4>
<p className="text-sm" style={{ color: "var(--muted)" }}>
Las acciones principales deben colocarse en zonas accesibles al pulgar para mejorar la usabilidad.
</p>
</div>

<div className="border p-6 rounded-lg hover:scale-[1.03] transition" style={{ borderColor: "var(--border)" }}>
<h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>✋ One-hand usability</h4>
<p className="text-sm" style={{ color: "var(--muted)" }}>
Las apps deben poder utilizarse cómodamente con una sola mano.
</p>
</div>

<div className="border p-6 rounded-lg hover:scale-[1.03] transition" style={{ borderColor: "var(--border)" }}>
<h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>🧠 Baja carga cognitiva</h4>
<p className="text-sm" style={{ color: "var(--muted)" }}>
Interfaces simples ayudan a que los usuarios entiendan rápidamente cómo usar la aplicación.
</p>
</div>

</div>

{/* EXPLICACIÓN EXTRA */}

<div className="border rounded-xl p-6" style={{ borderColor: "rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.05)" }}>

<h4 className="font-semibold mb-3 text-lg" style={{ color: "var(--text)" }}>
📱 ¿Por qué son importantes estos principios?
</h4>

<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
En el diseño de interfaces móviles, la mayoría de los usuarios interactúa con el dispositivo usando una sola mano. Por ello, colocar los elementos interactivos en zonas accesibles y mantener interfaces simples mejora significativamente la experiencia de usuario.
</p>

<div className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>

<p>👍 Botones importantes en la parte inferior facilitan la navegación.</p>
<p>✋ Diseñar para una mano reduce esfuerzo y mejora accesibilidad.</p>
<p>🧠 Interfaces simples reducen errores y aprendizaje.</p>

</div>

</div>

</div>
</section>

);
}