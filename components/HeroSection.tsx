"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ paddingTop: "80px" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute animate-pulse-glow"
        style={{
          top: "10%", left: "5%",
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute animate-pulse-glow"
        style={{
          bottom: "5%", right: "5%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "1.5s",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div
          className="flex-1 text-center lg:text-left"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s ease 0.2s",
          }}
        >
          <div
            className="badge mb-6 inline-flex"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#6366f1",
            }}
          >
            <span>⬡</span> Presentación Académica 2025
          </div>

          <h1
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            Diseño de{" "}
            <span className="gradient-text-indigo">Interfaces</span>
            <br />
            para Apps{" "}
            <span className="gradient-text-violet" style={{
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Móviles
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--muted)",
              maxWidth: 480,
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            Una exploración profunda de los principios, sistemas y procesos
            que definen las experiencias digitales en dispositivos móviles.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start mb-8">
            {[
              { value: "5", label: "Secciones" },
              { value: "6.8B", label: "Usuarios móviles" },
              { value: "92%", label: "Tiempo en apps" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#6366f1",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.05em", fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="flex items-center gap-3"
            style={{ color: "var(--muted)", fontSize: "0.8rem", fontFamily: "JetBrains Mono" }}
          >
            <div
              style={{
                width: 24, height: 40,
                border: "2px solid rgba(99,102,241,0.4)",
                borderRadius: 12,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "4px 0",
              }}
            >
              <div
                style={{
                  width: 4, height: 8,
                  borderRadius: 2,
                  background: "#6366f1",
                  animation: "float 2s ease-in-out infinite",
                }}
              />
            </div>
            scroll para explorar
          </div>
        </div>

        {/* Phone mockup cluster */}
        <div
          className="flex-1 flex justify-center items-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s ease 0.5s",
          }}
        >
          <div className="relative" style={{ width: 320, height: 560 }}>
            {/* Back phone */}
            <div
              className="phone-screen animate-float-delayed"
              style={{
                position: "absolute",
                width: 200,
                height: 380,
                top: 60,
                left: -20,
                opacity: 0.5,
                transform: "rotate(-8deg)",
              }}
            >
              <div style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", height: "100%", padding: 16 }}>
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 8 }} />
                <div style={{ height: 6, background: "rgba(99,102,241,0.4)", borderRadius: 3, marginBottom: 16, width: "70%" }} />
                {[1,2,3].map(i => (
                  <div key={i} style={{ height: 60, background: "rgba(255,255,255,0.05)", borderRadius: 8, marginBottom: 8 }} />
                ))}
              </div>
            </div>

            {/* Main phone */}
            <div
              className="phone-screen animate-float glow-indigo"
              style={{
                position: "absolute",
                width: 240,
                height: 480,
                top: 20,
                left: 50,
                zIndex: 2,
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 18,
                  background: "#0A0A0F",
                  borderRadius: 9,
                  zIndex: 10,
                }}
              />
              {/* Screen content */}
              <div style={{ background: "linear-gradient(160deg, #0f0f1a, #1a1a2e)", height: "100%", padding: "48px 16px 16px" }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div
                    style={{
                      width: 48, height: 48,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      margin: "0 auto 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    📱
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700, fontFamily: "Plus Jakarta Sans" }}>
                    MobileUI
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>
                    v2.4.1
                  </div>
                </div>
                {/* Fake UI elements */}
                <div style={{ background: "rgba(99,102,241,0.15)", borderRadius: 10, padding: 10, marginBottom: 8, border: "1px solid rgba(99,102,241,0.2)" }}>
                  <div style={{ height: 8, background: "rgba(99,102,241,0.6)", borderRadius: 4, marginBottom: 4, width: "80%" }} />
                  <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, width: "60%" }} />
                </div>
                {[
                  { color: "#6366f1", w: "90%" },
                  { color: "#8b5cf6", w: "75%" },
                  { color: "#06b6d4", w: "85%" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${row.color}30`, border: `1px solid ${row.color}50`, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, marginBottom: 4, width: row.w }} />
                      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, width: "50%" }} />
                    </div>
                  </div>
                ))}
                {/* Bottom nav */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    right: 12,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 16,
                    padding: "8px 0",
                    display: "flex",
                    justifyContent: "space-around",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {["⊞", "◎", "⊕", "◈"].map((icon, i) => (
                    <div key={i} style={{ fontSize: 14, opacity: i === 1 ? 1 : 0.3, color: i === 1 ? "#6366f1" : "white" }}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right accent phone */}
            <div
              className="phone-screen animate-float"
              style={{
                position: "absolute",
                width: 180,
                height: 320,
                top: 100,
                right: -30,
                opacity: 0.4,
                transform: "rotate(6deg)",
                animationDelay: "1s",
              }}
            >
              <div style={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", height: "100%", padding: 12 }}>
                <div style={{ height: 100, background: "rgba(6,182,212,0.15)", borderRadius: 8, marginBottom: 8 }} />
                <div style={{ height: 6, background: "rgba(6,182,212,0.4)", borderRadius: 3, marginBottom: 6 }} />
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, width: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 200,
          background: "linear-gradient(to bottom, transparent, #0A0A0F)",
        }}
      />
    </section>
  );
}
