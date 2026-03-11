"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const processSteps = [
  {
    step: "01",
    name: "Research",
    icon: "🔍",
    color: "#6366f1",
    desc: "Fase crítica para entender al usuario, sus necesidades y el mercado. Se aplican metodologías como Design Thinking y Lean UX.",
    methodologies: ["Design Thinking", "Lean UX", "Google Design Sprint"],
    techniques: [
      "Entrevistas 1:1",
      "Encuestas masivas",
      "User Personas",
      "Mapas de Empatía",
      "Análisis de la Competencia (Benchmarking)",
    ],
    bestPractices: [
      "Evitar sesgos de confirmación",
      "Validar hipótesis tempranas",
      "Documentar insights clave",
    ],
    deliverables: [
      "User personas",
      "Journey map",
      "Mapa de empatía",
      "Reporte de Benchmarking",
    ],
  },
  {
    step: "02",
    name: "Definición",
    icon: "🎯",
    color: "#8b5cf6",
    desc: "Sintetizar los hallazgos del research para identificar el problema central y los objetivos estratégicos del producto.",
    methodologies: ["Problem Statementing", "How Might We (HMW)"],
    techniques: [
      "Agrupación por afinidad",
      "Priorización MoSCoW",
      "Historias de Usuario",
      "Definición de KPIs",
    ],
    bestPractices: [
      "Alinear objetivos con el negocio",
      "Mantener al usuario en el centro",
      "Definir métricas de éxito claras",
    ],
    deliverables: [
      "Problem statement",
      "HMW Questions",
      "User stories",
      "Matriz de priorización",
    ],
  },
  {
    step: "03",
    name: "Ideación & Arquitectura",
    icon: "💡",
    color: "#06b6d4",
    desc: "Generación masiva de ideas y estructuración de la información. Se define cómo se organiza y fluye el contenido.",
    methodologies: ["Crazy 8s", "SCAMPER", "Brainstorming"],
    techniques: [
      "Card Sorting",
      "Mapas de sitio",
      "Flujos de navegación (User Flows)",
      "Wireframes de papel",
    ],
    bestPractices: [
      "No juzgar ideas prematuramente",
      "Fomentar la cantidad sobre la calidad inicial",
      "Iterar rápido",
    ],
    deliverables: [
      "Sketches iniciales",
      "Sitemap detallado",
      "User flows",
      "Arquitectura de Información",
    ],
  },
  {
    step: "04",
    name: "Wireframes & Prototipo",
    icon: "📱",
    color: "#10b981",
    desc: "Construcción del esqueleto y la interactividad. Desde esquemas básicos hasta modelos navegables de alta fidelidad.",
    methodologies: ["Atomic Design", "Mobile-First Design"],
    techniques: [
      "Wireframes Lo-Fi, Mid-Fi y Hi-Fi",
      "Prototipado interactivo",
      "Micro-interacciones",
      "Design Systems",
    ],
    bestPractices: [
      "Consistencia visual",
      "Accesibilidad desde el inicio",
      "Usar contenido real siempre que sea posible",
    ],
    deliverables: [
      "Prototipo navegable",
      "Library de componentes",
      "Especificaciones visuales",
      "Handoff para dev",
    ],
  },
  {
    step: "05",
    name: "Testing & Validación",
    icon: "🧪",
    color: "#f43f5e",
    desc: "Pruebas con usuarios reales para validar decisiones. Proceso iterativo para pulir la experiencia antes del lanzamiento.",
    methodologies: ["Testing Moderado", "Testing No Moderado", "A/B Testing"],
    techniques: [
      "Protocolo de pensamiento en voz alta",
      "Pruebas de guerrilla",
      "Heatmaps",
      "Cuestionarios SUS/NPS",
    ],
    bestPractices: [
      "No guiar al usuario en las tareas",
      "Observar el lenguaje no verbal",
      "Iterar basándose en datos, no opiniones",
    ],
    deliverables: [
      "Reporte de usabilidad",
      "Heatmap analysis",
      "Listado de mejoras (Backlog)",
      "NPS/SUS Score",
    ],
  },
];

const toolComparison = [
  {
    name: "Figma",
    icon: "🎨",
    color: "#6366f1",
    pros: [
      "Colaboración en tiempo real sin fricciones",
      "Basado en navegador (OS agnóstico)",
      "Auto Layout líder en la industria",
      "Dev Mode integrado para handoff",
    ],
    cons: [
      "Requiere conexión constante para colaboración fluida",
      "Curva de aprendizaje en variables avanzadas",
    ],
    mobile: [
      "Figma Mirror para previsualización nativa",
      "Gestos de prototipado móviles avanzados",
    ],
    pricing: "Gratis (Starter), $12/mes (Pro), $45/mes (Org)",
    bestFor: "Equipos colaborativos y diseño de sistemas escalables.",
  },
  {
    name: "Sketch",
    icon: "◈",
    color: "#f59e0b",
    pros: [
      "Excelente rendimiento offline",
      "Ecosistema de plugins masivo y maduro",
      "Símbolos y overrides muy potentes",
      "Compra única disponible",
    ],
    cons: ["Exclusivo de macOS", "Colaboración menos integrada que Figma"],
    mobile: [
      "Sketch Mirror para iOS",
      "Exportación de assets muy optimizada para desarrollo",
    ],
    pricing: "$9/mes por editor o licencia perpetua",
    bestFor: "Diseñadores individuales o equipos en ecosistema Apple puro.",
  },
  {
    name: "Adobe XD",
    icon: "⬡",
    color: "#f43f5e",
    pros: [
      "Integración nativa con Photoshop/Illustrator",
      "Auto-animate para micro-interacciones",
      "Prototipado por voz",
      "Repetición de cuadrícula rápida",
    ],
    cons: [
      "Menos actualizaciones que la competencia",
      "Ecosistema de plugins más limitado",
    ],
    mobile: ["Device preview vía USB/WiFi", "Interacciones de voz y gestos"],
    pricing: "Incluido en Creative Cloud o plan individual",
    bestFor: "Diseñadores que ya utilizan el ecosistema de Adobe.",
  },
];

const handoffProtocols = [
  {
    title: "Documentación Técnica",
    items: [
      "Guía de estilos interactiva",
      "Flujos de usuario anotados",
      "Especificaciones de comportamiento",
    ],
  },
  {
    title: "Entrega de Assets",
    items: [
      "Iconografía en SVG/Vector",
      "Imágenes en WebP/PNG @2x/@3x",
      "Fuentes y licencias",
    ],
  },
  {
    title: "Design Tokens",
    items: [
      "Variables de color (HEX/RGBA)",
      "Escalas de espaciado (rem/px)",
      "Tipografía (Size/Weight/Leading)",
    ],
  },
  {
    title: "Herramientas",
    items: [
      "Zeplin (Inspección avanzada)",
      "Figma Dev Mode",
      "Avocode / Storybook",
    ],
  },
];

const usabilityMetrics = [
  {
    name: "Task Success Rate",
    full: "Tasa de Éxito",
    kpi: "KPI Crítico",
    desc: "% de usuarios que completan una tarea con éxito.",
    color: "#10b981",
    tool: "Maze",
  },
  {
    name: "Time on Task",
    full: "Tiempo por Tarea",
    kpi: "Eficiencia",
    desc: "Tiempo promedio para realizar acciones clave.",
    color: "#06b6d4",
    tool: "Google Analytics",
  },
  {
    name: "Error Rate",
    full: "Tasa de Error",
    kpi: "Fricción",
    desc: "Frecuencia de errores cometidos por el usuario.",
    color: "#f43f5e",
    tool: "Hotjar",
  },
  {
    name: "SUS Score",
    full: "Usability Scale",
    kpi: "Satisfacción",
    desc: "Escala estándar de 0-100 para usabilidad percibida.",
    color: "#8b5cf6",
    tool: "Cuestionarios",
  },
];

const caseStudies = [
  {
    company: "Airbnb",
    challenge: "Inconsistencia visual entre plataformas globales.",
    solution: "Implementaron un 'Design Language System' (DLS) unificado.",
    result:
      "Redujeron el tiempo de diseño en un 50% y mejoraron la velocidad de desarrollo.",
    color: "#f43f5e",
  },
  {
    company: "Spotify",
    challenge: "Alta tasa de abandono en el flujo de onboarding móvil.",
    solution:
      "Aplicaron A/B Testing intensivo y simplificaron la carga cognitiva.",
    result: "Aumentaron la conversión de usuarios premium en un 24%.",
    color: "#10b981",
  },
];

export default function Section5() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();
  const ref4 = useReveal();
  const ref5 = useReveal();
  const ref6 = useReveal();

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
              05 — Proceso & Herramientas
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <span className="section-number">05</span>
            Flujo de Trabajo{" "}
            <span className="gradient-text-amber">Profesional</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", maxWidth: 650, lineHeight: 1.7 }}>
            Desde la investigación inicial hasta la entrega final al equipo de desarrollo,
            documentamos el proceso estándar de la industria para crear apps de alto impacto.
          </p>
        </div>

        {/* 1. Design Process Detailed */}
        <div ref={ref2} className="reveal mb-32">
          <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.8rem", fontWeight: 700, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#f59e0b" }}>01.</span> Flujo de Diseño Detallado
          </h3>

          <div style={{ display: "flex", gap: 12, marginBottom: 32, overflowX: "auto", paddingBottom: 10 }} className="hide-scrollbar">
            {processSteps.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 20px",
                  background: activeStep === i ? `${s.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeStep === i ? s.color + "50" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  minWidth: "fit-content",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: activeStep === i ? "var(--text)" : "var(--muted)" }}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>

          <div className="card p-8" style={{ borderColor: `${processSteps[activeStep].color}30`, background: "rgba(13,13,20,0.4)" }}>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ 
                    width: 56, height: 56, borderRadius: 16, 
                    background: `${processSteps[activeStep].color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, color: processSteps[activeStep].color,
                    border: `1px solid ${processSteps[activeStep].color}30`
                  }}>
                    {processSteps[activeStep].icon}
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: "0.75rem", color: processSteps[activeStep].color, letterSpacing: "0.1em" }}>PHASE {processSteps[activeStep].step}</div>
                    <h4 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.5rem", fontWeight: 700 }}>{processSteps[activeStep].name}</h4>
                  </div>
                </div>
                <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "1rem", marginBottom: 24 }}>
                  {processSteps[activeStep].desc}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <div style={{ fontSize: "0.7rem", fontFamily: "JetBrains Mono", color: processSteps[activeStep].color, marginBottom: 12, textTransform: "uppercase" }}>{"// Metodologías"}</div>
                    <div className="flex flex-wrap gap-2">
                      {processSteps[activeStep].methodologies.map(m => (
                        <span key={m} style={{ padding: "4px 12px", borderRadius: 6, fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#D1D1E0" }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontFamily: "JetBrains Mono", color: processSteps[activeStep].color, marginBottom: 12, textTransform: "uppercase" }}>{"// Técnicas y Prácticas"}</div>
                    <ul className="space-y-2">
                      {processSteps[activeStep].techniques.map(t => (
                        <li key={t} style={{ color: "var(--muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: processSteps[activeStep].color }}>•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "0.75rem", fontFamily: "JetBrains Mono", color: "var(--muted)", marginBottom: 20, textAlign: "right" }}>
                  OUTPUTS_AND_BEST_PRACTICES.log
                </div>
                
                <div style={{ marginBottom: 32 }}>
                  <h5 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Entregables Clave:</h5>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {processSteps[activeStep].deliverables.map((d) => (
                      <div key={d} style={{ 
                        padding: "12px", borderRadius: 12, fontSize: "0.85rem",
                        background: "rgba(0,0,0,0.2)", color: "var(--muted)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        display: "flex", alignItems: "center", gap: 10
                      }}>
                        <span style={{ color: processSteps[activeStep].color }}>📄</span> {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Mejores Prácticas:</h5>
                  <div className="space-y-3">
                    {processSteps[activeStep].bestPractices.map((bp) => (
                      <div key={bp} style={{ 
                        padding: "10px 16px", borderRadius: 10, fontSize: "0.85rem",
                        background: `${processSteps[activeStep].color}08`, color: "var(--text)",
                        borderLeft: `3px solid ${processSteps[activeStep].color}`
                      }}>
                        {bp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Tool Comparison */}
        <div ref={ref3} className="reveal mb-32">
          <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.8rem", fontWeight: 700, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#f59e0b" }}>02.</span> Análisis de Herramientas
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {toolComparison.map((tool) => (
              <div key={tool.name} className="card p-0 overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div style={{ background: `${tool.color}10`, padding: "24px", borderBottom: `1px solid ${tool.color}20` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 32 }}>{tool.icon}</span>
                    <span className="badge" style={{ background: `${tool.color}20`, color: tool.color, border: `1px solid ${tool.color}40` }}>{tool.name}</span>
                  </div>
                  <p style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 600 }}>{tool.bestFor}</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>Ventajas</div>
                    <ul className="space-y-2">
                      {tool.pros.map(p => <li key={p} style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", gap: 8 }}><span>✅</span> {p}</li>)}
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>Limitaciones</div>
                    <ul className="space-y-2">
                      {tool.cons.map(c => <li key={c} style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", gap: 8 }}><span>❌</span> {c}</li>)}
                    </ul>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>Capacidades Móviles</div>
                    <ul className="space-y-2">
                      {tool.mobile.map(m => <li key={m} style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", gap: 8 }}><span>📱</span> {m}</li>)}
                    </ul>
                  </div>

                  <div style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Precio:</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text)", fontWeight: 600 }}>{tool.pricing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Design Handoff */}
        <div ref={ref4} className="reveal mb-32">
          <div className="card p-10" style={{ background: "linear-gradient(145deg, rgba(99,102,241,0.05) 0%, rgba(13,13,20,1) 100%)", border: "1px solid rgba(99,102,241,0.15)" }}>
            <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.8rem", fontWeight: 700, marginBottom: 12 }}>
              <span style={{ color: "#6366f1" }}>03.</span> Design Handoff
            </h3>
            <p style={{ color: "var(--muted)", marginBottom: 40, maxWidth: 600 }}>
              El puente crítico entre el diseño y el código. Una transferencia exitosa asegura que la visión del producto se implemente con precisión técnica.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              {handoffProtocols.map((protocol) => (
                <div key={protocol.title}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }}></span>
                    {protocol.title}
                  </h4>
                  <ul className="space-y-3">
                    {protocol.items.map(item => (
                      <li key={item} style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Metrics & Testing */}
        <div ref={ref5} className="reveal mb-32">
          <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.8rem", fontWeight: 700, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#f59e0b" }}>04.</span> Métricas y Validación de UX
          </h3>
          
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {usabilityMetrics.map((m) => (
              <div key={m.name} className="card p-6 group hover:bg-white/[0.02] transition-colors" style={{ borderColor: `${m.color}25` }}>
                <div style={{ color: m.color, fontSize: "0.7rem", fontWeight: 700, fontFamily: "JetBrains Mono", marginBottom: 8, letterSpacing: "0.1em" }}>{m.kpi}</div>
                <h4 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.2rem", fontWeight: 800, marginBottom: 4 }}>{m.name}</h4>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: 12 }}>{m.full}</div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 16 }}>{m.desc}</p>
                <div style={{ fontSize: "0.7rem", color: m.color, background: `${m.color}10`, padding: "4px 8px", borderRadius: 4, display: "inline-block" }}>
                  Tool: {m.tool}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Case Studies */}
        <div ref={ref6} className="reveal mb-32">
          <h3 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.8rem", fontWeight: 700, marginBottom: 32 }}>
            <span style={{ color: "#f59e0b" }}>05.</span> Casos de Estudio Reales
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.company} className="card p-8 border-l-4" style={{ borderLeftColor: study.color }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: study.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white" }}>
                    {study.company[0]}
                  </div>
                  <h4 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1.4rem", fontWeight: 700 }}>{study.company}</h4>
                </div>
                <div className="space-y-4">
                  <p style={{ fontSize: "0.95rem", color: "var(--muted)" }}><strong>Desafío:</strong> {study.challenge}</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--muted)" }}><strong>Solución:</strong> {study.solution}</p>
                  <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: "0.95rem", color: study.color }}><strong>Resultado:</strong> {study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
