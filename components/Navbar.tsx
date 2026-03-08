"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "fundamentos", label: "Fundamentos" },
  { id: "usabilidad", label: "Usabilidad" },
  { id: "sistemas", label: "Sistemas" },
  { id: "navegacion", label: "Navegación" },
  { id: "proceso", label: "Proceso" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 40);
      
      // Siempre visible en el top
      if (currentScrollY < 10) {
        setVisible(true);
      } else {
        // Ocultar al bajar, mostrar al subir
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,15,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "none",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease, background 0.5s, backdrop-filter 0.5s",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            UI
          </div>
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "Cabinet Grotesk, sans-serif", color: "#F0F0FF" }}
          >
            Mobile Design
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "Fira Code, monospace",
                color: active === s.id ? "#6366f1" : "#6B6B8A",
                background: active === s.id ? "rgba(99,102,241,0.1)" : "transparent",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "#6366f1", marginRight: 4 }}>0{i + 1}.</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Tag */}
        <div
          className="badge"
          style={{
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#6366f1",
          }}
        >
          Diseño de Software
        </div>
      </div>
    </nav>
  );
}
