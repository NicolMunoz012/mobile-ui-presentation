"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const platformComparison = [
  { aspect: "Filosofía", material: "Material You — Diseño dinámico y adaptable", hig: "Human Interface — Claridad, deferencia, profundidad" },
  { aspect: "Navegación", material: "Bottom Nav Bar, Navigation Drawer", hig: "Tab Bar, Navigation Controller" },
  { aspect: "Tipografía", material: "Roboto / Google Sans", hig: "SF Pro (San Francisco)" },
  { aspect: "Iconografía", material: "Material Icons — Outlined y Filled", hig: "SF Symbols — Adaptables al peso de fuente" },
  { aspect: "Color", material: "Color dinámico basado en wallpaper", hig: "Paletas semánticas del sistema" },
  { aspect: "Componentes", material: "Cards, FAB, Chips, Snackbar", hig: "Action Sheets, Alerts, Pickers" },
  { aspect: "Gestos", material: "Back gesture desde borde", hig: "Swipe desde borde izquierdo" },
];

const tokens = [
  { category: "Color", tokens: ["color.primary", "color.surface", "color.on-primary", "color.error"], color: "#6366f1" },
  { category: "Tipografía", tokens: ["type.display.large", "type.headline", "type.body.medium", "type.label.small"], color: "#8b5cf6" },
  { category: "Espaciado", tokens: ["spacing.xs: 4dp", "spacing.sm: 8dp", "spacing.md: 16dp", "spacing.lg: 24dp"], color: "#06b6d4" },
  { category: "Radio", tokens: ["radius.sm: 4dp", "radius.md: 8dp", "radius.lg: 16dp", "radius.full: 50%"], color: "#10b981" },
];

export default function Section3() {
  const [platform, setPlatform] = useState<"material" | "hig">("material");
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  return (
    <section id="sistemas" className="relative py-32 overflow-hidden">
      <div
        style={{
          position: "absolute", bottom: "10%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
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
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#06b6d4",
              }}
            >
              03 — Sistemas de Diseño
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
            <span className="section-number">03</span>
            Sistemas de Diseño{" "}
            <span className="gradient-text-cyan">y Guías de Plataforma</span>
          </h2>
          <p style={{ color: "#6B6B8A", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
            Material Design vs Human Interface Guidelines, design tokens,
            tipografía móvil y componentes reutilizables.
          </p>
        </div>

        {/* Platform toggle */}
        <div ref={ref2} className="reveal mb-20">
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[
              { key: "material", label: "🤖  Material Design (Android)", color: "#10b981" },
              { key: "hig", label: "🍎  Human Interface (iOS)", color: "#6366f1" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPlatform(p.key as "material" | "hig")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: `1px solid ${platform === p.key ? p.color : "rgba(255,255,255,0.08)"}`,
                  background: platform === p.key ? `${p.color}15` : "transparent",
                  color: platform === p.key ? p.color : "#6B6B8A",
                  fontFamily: "JetBrains Mono",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Comparison table */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: platform === "material" ? "rgba(16,185,129,0.06)" : "rgba(99,102,241,0.06)",
                padding: "12px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: "0.75rem", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em" }}>Aspecto</span>
              <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: "0.75rem", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em" }}>Material Design</span>
              <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: "0.75rem", color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.1em" }}>Human Interface</span>
            </div>
            {platformComparison.map((row, i) => (
              <div
                key={row.aspect}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "14px 20px",
                  borderBottom: i < platformComparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#A0A0C0" }}>{row.aspect}</span>
                <span style={{ fontSize: "0.8rem", color: "#6B6B8A", paddingRight: 12, lineHeight: 1.5 }}>{row.material}</span>
                <span style={{ fontSize: "0.8rem", color: "#6B6B8A", lineHeight: 1.5 }}>{row.hig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Design Tokens */}
        <div ref={ref3} className="reveal">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            Design Tokens
          </h3>
          <p style={{ color: "#6B6B8A", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
            Variables que almacenan decisiones de diseño (colores, espaciados, tipografías) y se comparten
            entre diseñadores y desarrolladores para garantizar consistencia.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {tokens.map((t) => (
              <div key={t.category} className="card p-5" style={{ borderColor: `${t.color}25` }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, color: t.color, marginBottom: 12, fontSize: "0.9rem" }}>
                  {t.category}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {t.tokens.map((tk) => (
                    <div
                      key={tk}
                      className="mono"
                      style={{
                        fontSize: "0.7rem",
                        color: "#6B6B8A",
                        background: `${t.color}08`,
                        padding: "4px 8px",
                        borderRadius: 4,
                        border: `1px solid ${t.color}15`,
                      }}
                    >
                      {tk}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Typography scale */}
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16 }}>
            Escala Tipográfica Móvil
          </h3>
          <div className="card p-6">
            {[
              { name: "Display", size: "57sp / 57pt", sample: "Aa", weight: "400" },
              { name: "Headline L", size: "32sp / 32pt", sample: "Aa", weight: "400" },
              { name: "Title L", size: "22sp / 22pt", sample: "Título", weight: "500" },
              { name: "Body L", size: "16sp / 16pt", sample: "Texto de cuerpo principal", weight: "400" },
              { name: "Label M", size: "12sp / 12pt", sample: "Etiqueta componente", weight: "500" },
            ].map((type, i) => (
              <div
                key={type.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "12px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span className="mono" style={{ fontSize: "0.7rem", color: "#6B6B8A", width: 80, flexShrink: 0 }}>
                  {type.name}
                </span>
                <span
                  style={{
                    fontFamily: "Syne",
                    fontSize: type.size.split("/")[0].trim().replace("sp", "px"),
                    fontWeight: parseInt(type.weight),
                    flex: 1,
                    color: "#F0F0FF",
                  }}
                >
                  {type.sample}
                </span>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#6366f1" }}>{type.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
