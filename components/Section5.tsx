"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const processSteps = [
  {
    step: "01",
    name: "Research",
    icon: "🔍",
    color: "#6366f1",
    desc: "Entrevistas con usuarios, análisis competitivo, encuestas y mapas de empatía para entender el problema real.",
    deliverables: ["User personas", "Journey map", "Mapa de empatía", "Benchmarking"],
  },
  {
    step: "02",
    name: "Definir",
    icon: "🎯",
    color: "#8b5cf6",
    desc: "Sintetizar los hallazgos del research para identificar el problema central y los objetivos de diseño.",
    deliverables: ["Problem statement", "How Might We", "User stories", "KPIs de UX"],
  },
  {
    step: "03",
    name: "Ideación",
    icon: "💡",
    color: "#06b6d4",
    desc: "Generación de ideas mediante técnicas como Crazy 8s, SCAMPER o Design Sprint para explorar soluciones.",
    deliverables: ["Sketches", "Crazy 8s", "Sitemap", "Flujos de usuario"],
  },
  {
    step: "04",
    name: "Wireframes",
    icon: "⬜",
    color: "#10b981",
    desc: "Esqueleto estructural de la app en baja o media fidelidad. Define layouts sin preocuparse por el visual.",
    deliverables: ["Lo-fi wireframes", "Hi-fi wireframes", "Arquitectura IA", "Flujos de navegación"],
  },
  {
    step: "05",
    name: "Prototipo",
    icon: "📱",
    color: "#f59e0b",
    desc: "Versión interactiva del diseño que simula el comportamiento real de la app para poder testearlo.",
    deliverables: ["Prototipo Figma", "Micro-interacciones", "Animaciones", "Handoff specs"],
  },
  {
    step: "06",
    name: "Testing",
    icon: "🧪",
    color: "#f43f5e",
    desc: "Pruebas de usabilidad con usuarios reales para validar decisiones de diseño e identificar problemas.",
    deliverables: ["Test reports", "Heatmaps", "A/B testing", "NPS / SUS Score"],
  },
];

const tools = [
  {
    name: "Figma",
    icon: "🎨",
    category: "Diseño & Prototipado",
    desc: "El estándar de la industria. Colaborativo, en la nube, con auto-layout y variables nativas.",
    level: 95,
    color: "#6366f1",
  },
  {
    name: "Adobe XD",
    icon: "⬡",
    category: "Prototipado",
    desc: "Solución de Adobe para diseño UI/UX. Integrado con el ecosistema Creative Cloud.",
    level: 70,
    color: "#f43f5e",
  },
  {
    name: "Sketch",
    icon: "◈",
    category: "Diseño (macOS)",
    desc: "Pionero del diseño UI moderno. Solo macOS, con ecosistema maduro de plugins.",
    level: 75,
    color: "#f59e0b",
  },
  {
    name: "Maze",
    icon: "🧩",
    category: "User Testing",
    desc: "Testing remoto y no moderado. Métricas cuantitativas automáticas de usabilidad.",
    level: 65,
    color: "#10b981",
  },
  {
    name: "Zeplin",
    icon: "🔗",
    category: "Design Handoff",
    desc: "Puente entre diseñadores y developers. Genera specs, assets y tokens automáticamente.",
    level: 80,
    color: "#06b6d4",
  },
  {
    name: "Lottie",
    icon: "✨",
    category: "Animaciones",
    desc: "Exporta animaciones de After Effects a JSON para integrarlas en apps nativas.",
    level: 60,
    color: "#8b5cf6",
  },
];

const metrics = [
  { name: "SUS Score", full: "System Usability Scale", desc: "Cuestionario de 10 ítems. >70 = bueno, >85 = excelente", color: "#6366f1" },
  { name: "NPS", full: "Net Promoter Score", desc: "Probabilidad de recomendar la app. Escala 0-10", color: "#8b5cf6" },
  { name: "Task Success Rate", full: "Tasa de Éxito", desc: "% de usuarios que completan una tarea sin errores", color: "#10b981" },
  { name: "Time on Task", full: "Tiempo por Tarea", desc: "Tiempo promedio para completar acciones clave", color: "#f59e0b" },
];

export default function Section5() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  return (
    <section id="proceso" className="relative py-32 overflow-hidden">
      <div
        style={{
          position: "absolute", bottom: "20%", left: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
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
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                color: "#f59e0b",
              }}
            >
              05 — Proceso
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
            <span className="section-number">05</span>
            Proceso y{" "}
            <span className="gradient-text-amber">Herramientas</span>
          </h2>
          <p style={{ color: "#6B6B8A", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
            El flujo completo de diseño — desde investigación hasta testing —
            y las herramientas profesionales que usa la industria.
          </p>
        </div>

        {/* Design Process */}
        <div ref={ref2} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Flujo de Diseño Móvil
          </h3>

          {/* Steps row */}
          <div style={{ display: "flex", gap: 0, marginBottom: 24, overflowX: "auto" }}>
            {processSteps.map((s, i) => (
              <div key={s.step} style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => setActiveStep(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 20px",
                    background: activeStep === i ? `${s.color}12` : "transparent",
                    border: `1px solid ${activeStep === i ? s.color + "50" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    minWidth: 90,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <span className="mono" style={{ fontSize: "0.7rem", color: activeStep === i ? s.color : "#6B6B8A" }}>
                    {s.step}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: activeStep === i ? "#F0F0FF" : "#6B6B8A" }}>
                    {s.name}
                  </span>
                </button>
                {i < processSteps.length - 1 && (
                  <div style={{ width: 20, height: 2, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          {/* Active step detail */}
          <div
            className="card p-6"
            style={{ borderColor: `${processSteps[activeStep].color}30` }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{processSteps[activeStep].icon}</span>
                  <div>
                    <div className="mono" style={{ fontSize: "0.7rem", color: processSteps[activeStep].color }}>
                      Paso {processSteps[activeStep].step}
                    </div>
                    <h4 style={{ fontFamily: "Syne", fontSize: "1.2rem", fontWeight: 700, color: processSteps[activeStep].color }}>
                      {processSteps[activeStep].name}
                    </h4>
                  </div>
                </div>
                <p style={{ color: "#A0A0C0", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {processSteps[activeStep].desc}
                </p>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontFamily: "JetBrains Mono", color: "#6B6B8A", marginBottom: 10 }}>
                  // entregables
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {processSteps[activeStep].deliverables.map((d) => (
                    <span
                      key={d}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 100,
                        fontSize: "0.78rem",
                        background: `${processSteps[activeStep].color}10`,
                        color: processSteps[activeStep].color,
                        border: `1px solid ${processSteps[activeStep].color}25`,
                        fontFamily: "JetBrains Mono",
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div ref={ref3} className="reveal">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Herramientas de la Industria
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {tools.map((tool) => (
              <div key={tool.name} className="card p-5">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{tool.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700 }}>{tool.name}</div>
                    <div className="mono" style={{ fontSize: "0.65rem", color: tool.color }}>{tool.category}</div>
                  </div>
                </div>
                <p style={{ color: "#6B6B8A", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 12 }}>
                  {tool.desc}
                </p>
                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: "0.7rem", color: "#6B6B8A", fontFamily: "JetBrains Mono" }}>adopción industria</span>
                    <span style={{ fontSize: "0.7rem", color: tool.color, fontFamily: "JetBrains Mono" }}>{tool.level}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${tool.level}%`,
                        background: tool.color,
                        borderRadius: 2,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* UX Metrics */}
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16 }}>
            Métricas de UX
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.name} className="card p-5" style={{ borderColor: `${m.color}25` }}>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: m.color,
                    marginBottom: 4,
                  }}
                >
                  {m.name}
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.8rem", marginBottom: 8 }}>{m.full}</div>
                <p style={{ color: "#6B6B8A", fontSize: "0.78rem", lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
