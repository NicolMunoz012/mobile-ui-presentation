"use client";

export default function Footer() {
  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{
        background: "#08080E",
        borderTop: "1px solid rgba(99,102,241,0.1)",
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 200,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "Syne",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Diseño Móvil que{" "}
            <span className="gradient-text-indigo">Importa</span>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            El buen diseño no es solo cómo se ve — es cómo funciona,
            cómo se siente, y cómo resuelve problemas reales de personas reales.
          </p>
          <p style={{ color: "var(--muted-dark)", marginTop: 8, fontSize: "0.85rem", fontStyle: "italic" }}>
            — Inspirado en Steve Jobs
          </p>
        </div>

        {/* Section summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {[
            { num: "01", label: "Fundamentos", color: "#6366f1" },
            { num: "02", label: "Usabilidad", color: "#8b5cf6" },
            { num: "03", label: "Sistemas", color: "#06b6d4" },
            { num: "04", label: "Navegación", color: "#10b981" },
            { num: "05", label: "Proceso", color: "#f59e0b" },
          ].map((s) => (
            <a
              key={s.num}
              href={`#${["fundamentos","usabilidad","sistemas","navegacion","proceso"][parseInt(s.num)-1]}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 100,
                background: `${s.color}10`,
                border: `1px solid ${s.color}25`,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = `${s.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = `${s.color}10`;
              }}
            >
              <span className="mono" style={{ fontSize: "0.7rem", color: s.color }}>{s.num}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{s.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, fontFamily: "Syne",
              }}
            >
              UI
            </div>
            <span style={{ fontFamily: "Syne", fontSize: "0.85rem", color: "var(--muted)" }}>
              Diseño de Interfaces Móviles
            </span>
          </div>
          <div className="mono" style={{ fontSize: "0.7rem", color: "var(--muted-dark)" }}>
            Diseño de Software · 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
