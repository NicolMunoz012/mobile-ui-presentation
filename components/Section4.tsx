"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const navPatterns = [
  {
    name: "Bottom Navigation Bar",
    icon: "⊟",
    platform: "Android + iOS",
    desc: "Barra inferior con 3-5 destinos principales. El patrón más adoptado en móvil por ser accesible con el pulgar.",
    pros: ["Thumb-friendly", "Siempre visible", "Fácil de entender"],
    cons: ["Máximo 5 items", "Ocupa espacio"],
    color: "#6366f1",
  },
  {
    name: "Tab Bar",
    icon: "⊞",
    platform: "iOS nativo",
    desc: "Similar al bottom nav, pero siguiendo las guidelines de Apple. Usa SF Symbols y transiciones nativas.",
    pros: ["Convención iOS", "Animaciones fluidas", "Familiar para usuarios"],
    cons: ["Solo iOS feel", "Limitado en Android"],
    color: "#8b5cf6",
  },
  {
    name: "Navigation Drawer",
    icon: "☰",
    platform: "Principalmente Android",
    desc: "Menú lateral deslizable que se muestra con un gesto o botón hamburguesa. Ideal para apps con muchas secciones.",
    pros: ["Muchas secciones", "Flexible", "No ocupa espacio"],
    cons: ["Baja descubribilidad", "Gestos conflictivos"],
    color: "#06b6d4",
  },
  {
    name: "Stack Navigation",
    icon: "⧉",
    platform: "Universal",
    desc: "Navegación en pila: cada pantalla se apila sobre la anterior. El botón atrás desapila y regresa.",
    pros: ["Flujo natural", "Jerarquía clara", "Universal"],
    cons: ["Puede perder contexto", "Muchos niveles = confusión"],
    color: "#10b981",
  },
];

const gestures = [
  { gesture: "Tap", icon: "👆", desc: "Seleccionar, activar" },
  { gesture: "Double Tap", icon: "✌️", desc: "Like, zoom" },
  { gesture: "Long Press", icon: "🤜", desc: "Menú contextual, drag" },
  { gesture: "Swipe →", icon: "👉", desc: "Navegar atrás, descartar" },
  { gesture: "Swipe ↑", icon: "☝️", desc: "Scroll, revelar contenido" },
  { gesture: "Pinch", icon: "🤏", desc: "Zoom in/out" },
  { gesture: "Drag", icon: "✋", desc: "Mover, reordenar" },
  { gesture: "Rotate", icon: "🔄", desc: "Rotar objetos" },
];

export default function Section4() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  const bottomTabs = ["⊞ Inicio", "🔍 Buscar", "⊕ Crear", "🔔 Alertas", "◈ Perfil"];

  return (
    <section id="navegacion" className="relative py-32 overflow-hidden" style={{ background: "#0D0D14" }}>
      <div
        style={{
          position: "absolute", top: "30%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="reveal mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="badge"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#10b981",
              }}
            >
              04 — Navegación
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <span className="section-number">04</span>
            Patrones de{" "}
            <span className="gradient-text-emerald">Navegación</span>
          </h2>
          <p style={{ color: "#6B6B8A", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
            Los diferentes modelos de navegación móvil, gestos del sistema,
            safe areas y diseño responsivo.
          </p>
        </div>

        {/* Interactive Nav Patterns */}
        <div ref={ref2} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Patrones de Navegación
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
            {/* Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {navPatterns.map((p, i) => (
                <div
                  key={p.name}
                  onClick={() => setActiveNav(i)}
                  className="card"
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderColor: activeNav === i ? `${p.color}50` : "rgba(255,255,255,0.06)",
                    background: activeNav === i ? `${p.color}08` : "#12121A",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: 22, color: p.color }}>{p.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</div>
                    <div className="mono" style={{ fontSize: "0.7rem", color: "#6B6B8A" }}>{p.platform}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail + mock */}
            <div>
              <div className="card p-6 mb-4" style={{ borderColor: `${navPatterns[activeNav].color}30` }}>
                <p style={{ color: "#A0A0C0", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: 16 }}>
                  {navPatterns[activeNav].desc}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#10b981", fontFamily: "JetBrains Mono", marginBottom: 6 }}>✓ Ventajas</div>
                    {navPatterns[activeNav].pros.map((pro) => (
                      <div key={pro} style={{ fontSize: "0.8rem", color: "#6B6B8A", marginBottom: 3 }}>• {pro}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#f43f5e", fontFamily: "JetBrains Mono", marginBottom: 6 }}>✗ Limitaciones</div>
                    {navPatterns[activeNav].cons.map((con) => (
                      <div key={con} style={{ fontSize: "0.8rem", color: "#6B6B8A", marginBottom: 3 }}>• {con}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live bottom nav demo */}
              <div style={{ fontFamily: "JetBrains Mono", fontSize: "0.7rem", color: "#6B6B8A", marginBottom: 8 }}>
                // demo interactivo — bottom nav
              </div>
              <div
                className="phone-screen"
                style={{
                  height: 160,
                  position: "relative",
                  background: "#0f0f1a",
                }}
              >
                <div style={{ padding: "16px 16px 0", fontSize: "0.85rem", color: "#A0A0C0", fontFamily: "Syne", fontWeight: 600 }}>
                  {bottomTabs[activeBottomTab].split(" ")[1]}
                </div>
                <div style={{ padding: "8px 16px", display: "flex", gap: 6 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ height: 40, flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6 }} />
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    background: "rgba(15,15,26,0.95)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    padding: "8px 0 4px",
                  }}
                >
                  {bottomTabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveBottomTab(i)}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        color: activeBottomTab === i ? navPatterns[activeNav].color : "#6B6B8A",
                        transition: "color 0.2s",
                      }}
                    >
                      <span>{tab.split(" ")[0]}</span>
                      <span style={{ fontSize: 8, fontFamily: "JetBrains Mono" }}>{tab.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gestures */}
        <div ref={ref3} className="reveal">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Gestos Táctiles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {gestures.map((g) => (
              <div key={g.gesture} className="card p-5 text-center" style={{ transition: "all 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>{g.gesture}</div>
                <div style={{ color: "#6B6B8A", fontSize: "0.75rem" }}>{g.desc}</div>
              </div>
            ))}
          </div>

          {/* Safe areas */}
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16 }}>
            Safe Areas y Notch
          </h3>
          <div className="card p-6">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }}>
              <div>
                <p style={{ color: "#A0A0C0", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: 12 }}>
                  Las <strong style={{ color: "#F0F0FF" }}>safe areas</strong> son zonas garantizadas
                  donde el contenido no será obstruido por elementos del sistema (notch, home indicator,
                  barras de estado).
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { zone: "Status Bar", height: "44pt (iPhone con notch)", color: "#6366f1" },
                    { zone: "Dynamic Island", height: "Variable — iPhone 14 Pro+", color: "#8b5cf6" },
                    { zone: "Content Area", height: "Zona segura de trabajo", color: "#10b981" },
                    { zone: "Home Indicator", height: "34pt en iPhones modernos", color: "#06b6d4" },
                  ].map((z) => (
                    <div key={z.zone} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: z.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{z.zone}</span>
                      <span style={{ color: "#6B6B8A", fontSize: "0.8rem" }}>— {z.height}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Safe area diagram */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className="phone-screen"
                  style={{ width: 160, height: 300, position: "relative", flexShrink: 0 }}
                >
                  {/* Status bar */}
                  <div style={{ height: 30, background: "rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#6366f1", fontFamily: "JetBrains Mono" }}>
                    Status Bar
                  </div>
                  {/* Notch */}
                  <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 60, height: 14, background: "#0A0A0F", borderRadius: 7, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#8b5cf6" }}>
                    Dynamic Island
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, background: "rgba(16,185,129,0.08)", margin: "0 6px", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#10b981", fontFamily: "JetBrains Mono", border: "1px dashed rgba(16,185,129,0.3)", borderRadius: 4 }}>
                    Safe Content Area
                  </div>
                  {/* Home indicator */}
                  <div style={{ height: 26, background: "rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 40, height: 4, background: "#06b6d4", borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
