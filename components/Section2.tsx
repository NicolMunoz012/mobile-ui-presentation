"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const heuristics = [
  {
    num: "01",
    title: "Visibilidad del estado del sistema",
    desc: "El sistema debe informar siempre al usuario sobre lo que ocurre. En móvil: indicadores de carga, barras de progreso, badges de notificaciones, animaciones de transición.",
    example: "⬛⬛⬛⬛⬜⬜⬜ 57%",
    color: "#6366f1",
  },
  {
    num: "02",
    title: "Coincidencia con el mundo real",
    desc: "Hablar el lenguaje del usuario. En móvil: 'Guardar' en vez de 'Persistir datos', iconos reconocibles, metáforas de carpetas.",
    example: "🗑️ = Eliminar, no 'DELETE_RECORD'",
    color: "#8b5cf6",
  },
  {
    num: "03",
    title: "Control y libertad del usuario",
    desc: "Salidas de emergencia claras. En móvil: swipe para deshacer en iOS, 'Deshacer envío' en Gmail, confirmación antes de eliminar.",
    example: "← Volver | Deshacer ↩",
    color: "#06b6d4",
  },
  {
    num: "04",
    title: "Consistencia y estándares",
    desc: "Seguir convenciones de la plataforma. En móvil: pull-to-refresh, swipe-left para eliminar, botón atrás en Android.",
    example: "Siempre 'Guardar' no 'Guardar/Salvar/OK'",
    color: "#10b981",
  },
  {
    num: "05",
    title: "Prevención de errores",
    desc: "Diseño que evita errores antes de que ocurran. En móvil: validación en tiempo real, teclado numérico en campos de teléfono, autocompletar en direcciones.",
    example: "¿Eliminar esta cuenta? Esta acción no se puede deshacer.",
    color: "#f59e0b",
  },
  {
    num: "06",
    title: "Reconocer antes que recordar",
    desc: "Minimizar carga de memoria. En móvil: historial de búsqueda visible, sugerencias por uso previo, breadcrumbs.",
    example: "Historial reciente, búsqueda predictiva",
    color: "#f43f5e",
  },
  {
    num: "07",
    title: "Flexibilidad y eficiencia",
    desc: "Aceleradores para usuarios expertos. En móvil: 3D Touch, gestos personalizados, widgets en pantalla de inicio.",
    example: "Atajos de teclado, gestos avanzados",
    color: "#ec4899",
  },
  {
    num: "08",
    title: "Diseño estético y minimalista",
    desc: "Sin información irrelevante. En móvil: progressive disclosure, una acción principal por pantalla, menús contextuales reducidos.",
    example: "Una acción principal por pantalla",
    color: "#14b8a6",
  },
  {
    num: "09",
    title: "Ayuda para reconocer y recuperarse de errores",
    desc: "Mensajes en lenguaje claro con solución. En móvil: 'Sin conexión' + botón Reintentar, formularios que conservan datos al fallar.",
    example: "❌ Sin conexión [Reintentar]",
    color: "#f97316",
  },
  {
    num: "10",
    title: "Ayuda y documentación",
    desc: "Fácil de encontrar y centrada en la tarea. En móvil: tooltips en primer uso, onboarding guiado, coachmarks contextuales.",
    example: "💡 Tooltips contextuales",
    color: "#a855f7",
  },
];

const affordanceData = [
  {
    type: "Affordance Real",
    desc: "Propiedad funcional que permite una acción (un botón puede presionarse).",
    examples: ["Botón físicamente presionable", "Campo de texto editable", "Slider deslizable"],
    color: "#6366f1",
  },
  {
    type: "Affordance Percibida",
    desc: "Lo que el usuario cree que puede hacer (un botón con sombra comunica 'presiónme' aunque sea plano).",
    examples: ["Sombras y elevación", "Bordes redondeados", "Iconografía consistente", "Animaciones de respuesta"],
    color: "#8b5cf6",
  },
];

const feedbackLevels = [
  {
    level: "Inmediato",
    time: "<100ms",
    examples: ["Animación al tocar botón", "Vibración háptica", "Highlight en listas"],
    color: "#10b981",
  },
  {
    level: "De proceso",
    time: "1-10s",
    examples: ["Barra de progreso", "Skeleton screens", "Spinner con texto"],
    color: "#f59e0b",
  },
  {
    level: "De resultado",
    time: "Completado",
    examples: ["Toast 'Mensaje enviado'", "Pantalla de confirmación", "Animación checkmark", "Banner de error"],
    color: "#06b6d4",
  },
];

const consistencyDimensions = [
  {
    dimension: "Visual",
    desc: "Mismo color para acciones del mismo tipo, 8pt grid, iconos de un solo estilo.",
    color: "#6366f1",
  },
  {
    dimension: "Funcional",
    desc: "Swipe-left siempre elimina, FAB siempre crea, back siempre regresa.",
    color: "#8b5cf6",
  },
  {
    dimension: "De plataforma",
    desc: "Respetar iOS Human Interface Guidelines y Android Material Design.",
    color: "#06b6d4",
  },
  {
    dimension: "De contenido",
    desc: "Mismo tono de voz, mismos términos, mismas convenciones de mayúsculas.",
    color: "#10b981",
  },
];

const accessibility = [
  { icon: "👆", label: "Área táctil mínima", value: "44×44 pt (Apple)\n48×48 dp (Google)", color: "#6366f1" },
  { icon: "🎨", label: "Contraste de color", value: "4.5:1 texto normal\n3:1 texto grande", color: "#8b5cf6" },
  { icon: "📏", label: "Tamaño de fuente", value: "Mínimo 11pt\nRecomendado 16pt+", color: "#06b6d4" },
  { icon: "🔊", label: "Lector de pantalla", value: "VoiceOver (iOS)\nTalkBack (Android)", color: "#10b981" },
  { icon: "🌙", label: "Modo oscuro", value: "Adaptación automática\nContraste ajustado", color: "#8b5cf6" },
  { icon: "♿", label: "Zona del pulgar", value: "Diseño para uso\ncon una mano", color: "#f59e0b" },
];

const inclusiveDesign = [
  {
    principle: "Modelo de Exclusión",
    desc: "Discapacidad permanente, temporal y situacional. Diseñar para el caso más extremo resuelve los tres.",
    example: "Subtítulos ayudan a sordos, personas en ambientes ruidosos y quienes aprenden el idioma.",
    color: "#6366f1",
  },
  {
    principle: "Diseño Universal",
    desc: "Uso equitativo, flexible, simple, de bajo esfuerzo físico.",
    example: "Puertas automáticas benefician a personas en silla de ruedas, con carriolas y con las manos ocupadas.",
    color: "#8b5cf6",
  },
  {
    principle: "Intercultural",
    desc: "El rojo significa peligro en occidente y suerte en China. Checkmark significa correcto en USA e incorrecto en Japón.",
    example: "Layouts RTL para idiomas como árabe o hebreo.",
    color: "#06b6d4",
  },
  {
    principle: "Edad",
    desc: "Adultos mayores necesitan objetivos táctiles más grandes y gestos simples. Niños pueden no comprender metáforas abstractas.",
    example: "Botones grandes, texto legible, instrucciones claras.",
    color: "#10b981",
  },
];

export default function Section2() {
  const [activeHeuristic, setActiveHeuristic] = useState(0);
  const [activeAffordance, setActiveAffordance] = useState(0);
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();
  const ref4 = useReveal();
  const ref5 = useReveal();
  const ref6 = useReveal();
  const ref7 = useReveal();

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
            Las 10 Heurísticas de Nielsen — Aplicadas al Móvil
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
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
                minHeight: 280,
              }}
            >
              <div
                style={{
                  fontFamily: "Syne",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
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
                  fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                  fontWeight: 700,
                  color: heuristics[activeHeuristic].color,
                  marginBottom: 12,
                }}
              >
                {heuristics[activeHeuristic].title}
              </h4>
              <p style={{ color: "#A0A0C0", lineHeight: 1.7, marginBottom: 20, fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
                {heuristics[activeHeuristic].desc}
              </p>
              <div
                style={{
                  background: `${heuristics[activeHeuristic].color}10`,
                  border: `1px solid ${heuristics[activeHeuristic].color}30`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontFamily: "JetBrains Mono",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                  color: heuristics[activeHeuristic].color,
                  wordBreak: "break-word",
                }}
              >
                {heuristics[activeHeuristic].example}
              </div>
            </div>
          </div>
        </div>

        {/* Affordance */}
        <div ref={ref3} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            Affordance
          </h3>
          <p style={{ color: "#6B6B8A", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
            La affordance es la propiedad percibida de un objeto que sugiere cómo usarlo. En móvil es crítica porque no hay cursor. El diseño visual asume toda la carga.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affordanceData.map((a, i) => (
              <div
                key={a.type}
                className="card p-6"
                style={{ borderColor: `${a.color}30` }}
              >
                <h4 style={{ fontFamily: "Syne", fontSize: "1.1rem", fontWeight: 700, color: a.color, marginBottom: 10 }}>
                  {a.type}
                </h4>
                <p style={{ color: "#A0A0C0", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 12 }}>
                  {a.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {a.examples.map((ex) => (
                    <div
                      key={ex}
                      style={{
                        fontSize: "0.75rem",
                        color: "#6B6B8A",
                        background: `${a.color}08`,
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `1px solid ${a.color}20`,
                      }}
                    >
                      • {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div ref={ref4} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            Feedback
          </h3>
          <p style={{ color: "#6B6B8A", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
            Cada acción debe tener respuesta del sistema. Tres niveles de feedback:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feedbackLevels.map((f) => (
              <div
                key={f.level}
                className="card p-6"
                style={{ borderColor: `${f.color}30` }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <h4 style={{ fontFamily: "Syne", fontSize: "1.1rem", fontWeight: 700, color: f.color }}>
                    {f.level}
                  </h4>
                  <span className="mono" style={{ fontSize: "0.7rem", color: f.color, background: `${f.color}15`, padding: "2px 8px", borderRadius: 4 }}>
                    {f.time}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {f.examples.map((ex) => (
                    <div
                      key={ex}
                      style={{
                        fontSize: "0.75rem",
                        color: "#6B6B8A",
                        background: `${f.color}08`,
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `1px solid ${f.color}20`,
                      }}
                    >
                      • {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consistencia */}
        <div ref={ref5} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            Consistencia
          </h3>
          <p style={{ color: "#6B6B8A", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
            Reduce la carga cognitiva: lo predecible libera al usuario para pensar en su objetivo. Cuatro dimensiones:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consistencyDimensions.map((c) => (
              <div
                key={c.dimension}
                className="card p-6"
                style={{ borderColor: `${c.color}30` }}
              >
                <h4 style={{ fontFamily: "Syne", fontSize: "1.1rem", fontWeight: 700, color: c.color, marginBottom: 10 }}>
                  {c.dimension}
                </h4>
                <p style={{ color: "#A0A0C0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div ref={ref6} className="reveal mb-20">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
            Accesibilidad en Móvil
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
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

        {/* Diseño Inclusivo */}
        <div ref={ref7} className="reveal">
          <h3 style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>
            Diseño Inclusivo
          </h3>
          <p style={{ color: "#6B6B8A", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
            No existe el "usuario promedio". Principios clave para diseñar para todos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inclusiveDesign.map((d) => (
              <div
                key={d.principle}
                className="card p-6"
                style={{ borderColor: `${d.color}30` }}
              >
                <h4 style={{ fontFamily: "Syne", fontSize: "1.1rem", fontWeight: 700, color: d.color, marginBottom: 10 }}>
                  {d.principle}
                </h4>
                <p style={{ color: "#A0A0C0", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 10 }}>
                  {d.desc}
                </p>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: d.color,
                    background: `${d.color}08`,
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: `1px solid ${d.color}20`,
                    fontStyle: "italic",
                  }}
                >
                  Ejemplo: {d.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
