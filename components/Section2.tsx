"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const heuristics = [
  {
    num: "01",
    title: "Visibilidad del estado",
    desc: "El sistema siempre informa al usuario sobre qué está pasando. Ejemplo: barras de progreso, indicadores de carga.",
    example: "⬛⬛⬛⬛⬜⬜⬜ 57%",
    color: "#6366f1",
  },
  {
    num: "02",
    title: "Match con el mundo real",
    desc: "Usa lenguaje familiar al usuario, no jerga técnica. Los iconos deben representar conceptos conocidos.",
    example: "🗑️ = Eliminar, no 'DELETE_RECORD'",
    color: "#8b5cf6",
  },
  {
    num: "03",
    title: "Control y libertad",
    desc: "Los usuarios necesitan 'salidas de emergencia'. Siempre ofrece deshacer, cancelar y regresar.",
    example: "← Volver | Deshacer ↩",
    color: "#06b6d4",
  },
  {
    num: "04",
    title: "Consistencia y estándares",
    desc: "No hagas que los usuarios se pregunten si distintas palabras significan lo mismo. Sigue convenciones de plataforma.",
    example: "Siempre 'Guardar' no 'Guardar/Salvar/OK'",
    color: "#10b981",
  },
  {
    num: "05",
    title: "Prevención de errores",
    desc: "Diseña para que los errores no ocurran. Confirmaciones antes de acciones destructivas.",
    example: "¿Eliminar esta cuenta? Esta acción no se puede deshacer.",
    color: "#f59e0b",
  },
  {
    num: "06",
    title: "Reconocimiento > Recuerdo",
    desc: "Minimiza la carga cognitiva. El usuario no debe recordar información entre pantallas.",
    example: "Historial reciente, búsqueda predictiva",
    color: "#f43f5e",
  },
];

const accessibility = [
  { icon: "👆", label: "Área táctil mínima", value: "44×44 pt (Apple)\n48×48 dp (Google)", color: "#6366f1" },
  { icon: "🎨", label: "Contraste de color", value: "4.5:1 texto normal\n3:1 texto grande", color: "#8b5cf6" },
  { icon: "📏", label: "Tamaño de fuente", value: "Mínimo 11pt\nRecomendado 16pt+", color: "#06b6d4" },
  { icon: "🔊", label: "Lector de pantalla", value: "VoiceOver (iOS)\nTalkBack (Android)", color: "#10b981" },
];

export default function Section2() {
  const [activeHeuristic, setActiveHeuristic] = useState(0);
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  return (
    <section id="usabilidad" className="relative py-32 overflow-hidden" style={{ background: "#0D0D14" }}>
      <div
        style={{
          position: "absolute", top: "50%", left: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
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
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#8b5cf6",
              }}
            >
              02 — Usabilidad
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
            <span className="section-number">02</span>
            Principios de{" "}
            <span className="gradient-text-violet" style={{
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Usabilidad
            </span>
          </h2>
          <p style={{ color: "#6B6B8A", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
            Las Heurísticas de Nielsen adaptadas al móvil, accesibilidad e
            inclusividad como pilares fundamentales del buen diseño.
          </p>
        </div>

        {/* Interactive heuristics */}
        <div ref={ref2} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Heurísticas de Nielsen — Aplicadas al Móvil
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 0, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* List */}
            <div style={{ background: "#12121A" }}>
              {heuristics.map((h, i) => (
                <div
                  key={h.num}
                  onClick={() => setActiveHeuristic(i)}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderBottom: i < heuristics.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: activeHeuristic === i ? `${h.color}10` : "transparent",
                    borderLeft: activeHeuristic === i ? `3px solid ${h.color}` : "3px solid transparent",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span className="mono" style={{ color: activeHeuristic === i ? h.color : "#6B6B8A", fontSize: "0.75rem", flexShrink: 0 }}>
                    {h.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: activeHeuristic === i ? "#F0F0FF" : "#6B6B8A",
                    }}
                  >
                    {h.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Detail */}
            <div
              style={{
                background: "#0A0A0F",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: heuristics[activeHeuristic].color,
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {heuristics[activeHeuristic].num}
              </div>
              <h4
                style={{
                  fontFamily: "Syne",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: heuristics[activeHeuristic].color,
                  marginBottom: 12,
                }}
              >
                {heuristics[activeHeuristic].title}
              </h4>
              <p style={{ color: "#A0A0C0", lineHeight: 1.7, marginBottom: 20, fontSize: "0.95rem" }}>
                {heuristics[activeHeuristic].desc}
              </p>
              <div
                style={{
                  background: `${heuristics[activeHeuristic].color}10`,
                  border: `1px solid ${heuristics[activeHeuristic].color}30`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontFamily: "JetBrains Mono",
                  fontSize: "0.8rem",
                  color: heuristics[activeHeuristic].color,
                }}
              >
                {heuristics[activeHeuristic].example}
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div ref={ref3} className="reveal">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Accesibilidad en Móvil
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {accessibility.map((a) => (
              <div key={a.label} className="card p-6 text-center" style={{ borderColor: `${a.color}30` }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.85rem", marginBottom: 8 }}>
                  {a.label}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.75rem",
                    color: a.color,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  {a.value}
                </div>
              </div>
            ))}
          </div>

          {/* WCAG levels */}
          <div className="card p-6">
            <h4 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: 16 }}>
              Niveles de Conformidad WCAG 2.1
            </h4>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { level: "A", desc: "Nivel básico. Requisitos mínimos de accesibilidad.", color: "#f59e0b" },
                { level: "AA", desc: "Estándar recomendado. Cubre la mayoría de usuarios.", color: "#10b981" },
                { level: "AAA", desc: "Nivel óptimo. Máxima accesibilidad posible.", color: "#6366f1" },
              ].map((w) => (
                <div
                  key={w.level}
                  style={{
                    flex: 1,
                    minWidth: 200,
                    padding: "16px 20px",
                    borderRadius: 10,
                    background: `${w.color}08`,
                    border: `1px solid ${w.color}20`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: w.color,
                    }}
                  >
                    WCAG {w.level}
                  </span>
                  <p style={{ color: "#6B6B8A", fontSize: "0.85rem", marginTop: 6, lineHeight: 1.5 }}>
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
