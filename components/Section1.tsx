"use client";
import { useReveal } from "@/hooks/useReveal";

const timeline = [
  { year: "2007", event: "iPhone lanza touch UI", color: "#6366f1" },
  { year: "2008", event: "App Store crea ecosistema", color: "#8b5cf6" },
  { year: "2014", event: "Material Design estandariza diseño móvil", color: "#10b981" },
  { year: "2019", event: "Dark mode como estándar", color: "#f59e0b" },
  { year: "2024", event: "Diseño adaptativo con IA", color: "#f43f5e" },
];

const differences = [
  {
    aspect: "Pantalla",
    web: "Grande, espacio abundante",
    mobile: "Pequeña → priorizar contenido",
    icon: "🖥️",
  },
  {
    aspect: "Interacción",
    web: "Mouse, precisión pixel",
    mobile: "Dedos → área táctil mínima 44pt",
    icon: "👆",
  },
  {
    aspect: "Contexto de uso",
    web: "Escritorio, estático",
    mobile: "En movimiento → sesiones cortas",
    icon: "🏃",
  },
  {
    aspect: "Conectividad",
    web: "Conexión estable",
    mobile: "Variable → diseñar para offline",
    icon: "�",
  },
];

export default function Section1() {
  const ref = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  return (
    <section id="fundamentos" className="relative py-32 overflow-hidden">
      {/* Section blob */}
      <div
        style={{
          position: "absolute", top: "20%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
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
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#6366f1",
              }}
            >
              01 — Fundamentos
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
            <span className="section-number">01</span>
            Fundamentos del{" "}
            <span className="gradient-text-indigo">Diseño Móvil</span>
          </h2>
          <p style={{ color: "#6B6B8A", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
            UI/UX móvil, diferencias con web, evolución histórica y por qué el diseño
            decide si una app se usa o se desinstala.
          </p>
        </div>

        {/* Stats */}
        <div ref={ref2} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { value: "6.8B", label: "Usuarios móviles globales", color: "#6366f1" },
            { value: "92%", label: "Tiempo digital en apps", color: "#8b5cf6" },
            { value: "3.8M", label: "Apps en tiendas", color: "#06b6d4" },
            { value: "88%", label: "No vuelven tras mala experiencia", color: "#f43f5e" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card p-6 text-center"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 3,
                  background: stat.color,
                }}
              />
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: stat.color,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6B6B8A", lineHeight: 1.4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* UI vs UX */}
        <div ref={ref3} className="reveal grid md:grid-cols-2 gap-6 mb-20">
          <div className="card p-8" style={{ borderColor: "rgba(99,102,241,0.3)" }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(99,102,241,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
              }}
            >
              🎨
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: "1.3rem", fontWeight: 700, marginBottom: 8, color: "#6366f1" }}>
              UI — User Interface
            </h3>
            <p style={{ color: "#6B6B8A", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Es el <strong style={{ color: "#F0F0FF" }}>aspecto visual</strong> de una app.
              Incluye colores, botones, tipografía y todos los elementos visuales.
              Es lo que el usuario ve y toca.
            </p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Colores", "Tipografía", "Iconos", "Botones", "Layouts"].map((t) => (
                <span key={t} className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-8" style={{ borderColor: "rgba(139,92,246,0.3)" }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(139,92,246,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
              }}
            >
              🧠
            </div>
            <h3 style={{ fontFamily: "Syne", fontSize: "1.3rem", fontWeight: 700, marginBottom: 8, color: "#8b5cf6" }}>
              UX — User Experience
            </h3>
            <p style={{ color: "#6B6B8A", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Es la <strong style={{ color: "#F0F0FF" }}>experiencia completa</strong> del usuario.
              Incluye flujos, emociones, usabilidad y cómo se <em>siente</em> al usar la app.
              UI y UX son complementarios.
            </p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Flujos", "Research", "Wireframes", "Testing", "Empatía"].map((t) => (
                <span key={t} className="badge" style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 style={{ fontFamily: "Syne", fontSize: "1.5rem", fontWeight: 700, marginBottom: 24 }}>
            Timeline histórico
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map((item, i) => (
              <div
                key={item.year}
                style={{ display: "flex", alignItems: "stretch", gap: 0 }}
              >
                {/* Line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 6, zIndex: 1 }} />
                  {i < timeline.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: "rgba(255,255,255,0.06)", minHeight: 32 }} />
                  )}
                </div>
                {/* Content */}
                <div
                  className="card mb-3 flex items-center gap-4"
                  style={{ padding: "14px 20px", flex: 1, marginLeft: 12 }}
                >
                  <span
                    className="mono"
                    style={{ color: item.color, fontWeight: 600, fontSize: "0.85rem", flexShrink: 0 }}
                  >
                    {item.year}
                  </span>
                  <span style={{ color: "#A0A0C0", fontSize: "0.95rem" }}>{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differences table */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontFamily: "Syne", fontSize: "1.5rem", fontWeight: 700, marginBottom: 24 }}>
            Diseño Web vs. Diseño Móvil
          </h3>
          <div className="card" style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: "rgba(99,102,241,0.08)",
                padding: "12px 20px",
                borderBottom: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.8rem", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em" }}>Aspecto</span>
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.8rem", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em" }}>Web</span>
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.8rem", color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.1em" }}>Móvil</span>
            </div>
            {differences.map((row, i) => (
              <div
                key={row.aspect}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "14px 20px",
                  borderBottom: i < differences.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: "0.9rem" }}>
                  <span>{row.icon}</span> {row.aspect}
                </span>
                <span style={{ color: "#6B6B8A", fontSize: "0.85rem" }}>{row.web}</span>
                <span style={{ color: "#A0C0FF", fontSize: "0.85rem" }}>{row.mobile}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
