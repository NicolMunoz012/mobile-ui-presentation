"use client";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/* ═══════════════════════════ TYPES ═══════════════════════════ */

type TToken = { name: string; value: string; phone: string };
type TokenCategory = {
  key: string; label: string; icon: string;
  color: string; dim: string; tokens: TToken[];
};

/* ═══════════════════════════ DATA ═══════════════════════════ */

const platformComparison = [
  { aspect: "Unidad base",         material: "4 dp",             hig: "8 pt"              },
  { aspect: "Color dinámico",      material: "Material You",     hig: "Dynamic Color"     },
  { aspect: "Sistema de íconos",   material: "Material Symbols", hig: "SF Symbols"        },
  { aspect: "Elevación",           material: "Shadow + tonal",   hig: "Blur + vibrancy"   },
  { aspect: "Navegación principal",material: "Bottom Nav Bar",   hig: "Tab Bar"           },
  { aspect: "Filosofía de motion", material: "Expresiva",        hig: "Spring physics"    },
];

const tokenCategories: TokenCategory[] = [
  {
    key: "color", label: "Color", icon: "🎨", color: "#3DDC84", dim: "rgba(61,220,132,0.1)",
    tokens: [
      { name: "color.primary",    value: "#3DDC84", phone: "color-primary"    },
      { name: "color.surface",    value: "#1A2332", phone: "color-surface"    },
      { name: "color.on-primary", value: "#000000", phone: "color-on-primary" },
      { name: "color.error",      value: "#FF5449", phone: "color-error"      },
      { name: "color.outline",    value: "#8B9BB4", phone: "color-outline"    },
    ],
  },
  {
    key: "type", label: "Tipografía", icon: "🔤", color: "#C084FC", dim: "rgba(192,132,252,0.1)",
    tokens: [
      { name: "type.display.large",   value: "57sp / -0.25", phone: "type-display"  },
      { name: "type.headline.medium", value: "28sp / 0",     phone: "type-headline" },
      { name: "type.body.medium",     value: "14sp / 0.25",  phone: "type-body"     },
      { name: "type.label.small",     value: "11sp / 0.5",   phone: "type-label"    },
    ],
  },
  {
    key: "spacing", label: "Espaciado", icon: "📐", color: "#F59E0B", dim: "rgba(245,158,11,0.1)",
    tokens: [
      { name: "spacing.xs", value: "4dp",  phone: "spacing-xs" },
      { name: "spacing.sm", value: "8dp",  phone: "spacing-sm" },
      { name: "spacing.md", value: "16dp", phone: "spacing-md" },
      { name: "spacing.lg", value: "24dp", phone: "spacing-lg" },
      { name: "spacing.xl", value: "32dp", phone: "spacing-xl" },
    ],
  },
  {
    key: "radius", label: "Radios", icon: "⭕", color: "#22D3EE", dim: "rgba(34,211,238,0.1)",
    tokens: [
      { name: "radius.xs",   value: "4dp",    phone: "radius-xs"   },
      { name: "radius.sm",   value: "8dp",    phone: "radius-sm"   },
      { name: "radius.md",   value: "12dp",   phone: "radius-md"   },
      { name: "radius.lg",   value: "16dp",   phone: "radius-lg"   },
      { name: "radius.full", value: "9999dp", phone: "radius-full" },
    ],
  },
  {
    key: "motion", label: "Motion", icon: "⚡", color: "#FF6B35", dim: "rgba(255,107,53,0.1)",
    tokens: [
      { name: "duration.short",    value: "200ms",                    phone: "motion-short"    },
      { name: "duration.medium",   value: "300ms",                    phone: "motion-medium"   },
      { name: "easing.standard",   value: "cubic-bezier(.2,0,0,1)",   phone: "motion-std"      },
      { name: "easing.emphasized", value: "cubic-bezier(.05,.7,.1,1)", phone: "motion-emp"      },
    ],
  },
  {
    key: "icon", label: "Iconografía", icon: "🏷️", color: "#EC4899", dim: "rgba(236,72,153,0.1)",
    tokens: [
      { name: "icon.size.sm", value: "16dp", phone: "icon-sm" },
      { name: "icon.size.md", value: "24dp", phone: "icon-md" },
      { name: "icon.size.lg", value: "32dp", phone: "icon-lg" },
      { name: "icon.size.xl", value: "48dp", phone: "icon-xl" },
    ],
  },
];

/* ═══════════════════════════ PHONE STATE ═══════════════════════════ */

type PhoneState = {
  screenBg: string; fabBg: string; fabColor: string; fabRadius: number;
  cardBg: string; cardRadius: number; cardPadding: string;
  line1Bg: string; avatarBg: string;
  mcBg: string; mcRadius: number; mcBorder: string;
  menuSize: number; navSize: number;
  showType: boolean; typeText: string; typeSize: number;
  typeUpper: boolean; typeSpacing: string;
  showSpacing: boolean; spLabel: string; spWidth: number;
};

const D: PhoneState = {
  screenBg:"#10161f", fabBg:"#3DDC84", fabColor:"#000", fabRadius:100,
  cardBg:"#1a2332", cardRadius:12, cardPadding:"14px 12px",
  line1Bg:"rgba(255,255,255,0.1)", avatarBg:"#3DDC84",
  mcBg:"#1a2332", mcRadius:10, mcBorder:"none",
  menuSize:14, navSize:16,
  showType:false, typeText:"", typeSize:13, typeUpper:false, typeSpacing:"normal",
  showSpacing:false, spLabel:"", spWidth:16,
};

const PA: Record<string, Partial<PhoneState>> = {
  "color-primary":    { fabBg:"#3DDC84", avatarBg:"#3DDC84", line1Bg:"#3DDC84" },
  "color-surface":    { cardBg:"#2a3545", mcBg:"#2a3545", screenBg:"#0a0f18" },
  "color-on-primary": { fabBg:"#3DDC84", fabColor:"#fff" },
  "color-error":      { fabBg:"#FF5449", avatarBg:"#FF5449", line1Bg:"#FF5449" },
  "color-outline":    { mcBg:"transparent", mcBorder:"1px solid #8B9BB4", cardBg:"transparent", line1Bg:"#8B9BB4" },
  "type-display":     { showType:true, typeText:"Display Large",   typeSize:15, typeUpper:false },
  "type-headline":    { showType:true, typeText:"Headline Medium", typeSize:12, typeUpper:false },
  "type-body":        { showType:true, typeText:"Body medium — texto de contenido para lectura.", typeSize:9, typeUpper:false },
  "type-label":       { showType:true, typeText:"LABEL SMALL",    typeSize:8,  typeUpper:true, typeSpacing:"0.1em" },
  "spacing-xs": { cardPadding:"4px 6px",   showSpacing:true, spLabel:"spacing.xs = 4dp",  spWidth:4  },
  "spacing-sm": { cardPadding:"8px",        showSpacing:true, spLabel:"spacing.sm = 8dp",  spWidth:8  },
  "spacing-md": { cardPadding:"16px 14px",  showSpacing:true, spLabel:"spacing.md = 16dp", spWidth:16 },
  "spacing-lg": { cardPadding:"24px 16px",  showSpacing:true, spLabel:"spacing.lg = 24dp", spWidth:24 },
  "spacing-xl": { cardPadding:"32px 18px",  showSpacing:true, spLabel:"spacing.xl = 32dp", spWidth:32 },
  "radius-xs":   { cardRadius:4,  fabRadius:4,   mcRadius:4  },
  "radius-sm":   { cardRadius:8,  fabRadius:8,   mcRadius:8  },
  "radius-md":   { cardRadius:12, fabRadius:12,  mcRadius:12 },
  "radius-lg":   { cardRadius:16, fabRadius:16,  mcRadius:16 },
  "radius-full": { cardRadius:28, fabRadius:100, mcRadius:28 },
  "motion-short":  { fabBg:"#22D3EE" },
  "motion-medium": { fabBg:"#C084FC" },
  "motion-std":    { fabBg:"#3DDC84" },
  "motion-emp":    { fabBg:"#F59E0B" },
  "icon-sm": { menuSize:10, navSize:10 },
  "icon-md": { menuSize:14, navSize:14 },
  "icon-lg": { menuSize:20, navSize:20 },
  "icon-xl": { menuSize:26, navSize:26 },
};

/* ═══════════════════════════ PHONE MOCKUP ═══════════════════════════ */

function Phone({ s }: { s: PhoneState }) {
  return (
    <div style={{
      width:220, height:440,
      background:"linear-gradient(145deg,#1a1f2e,#0d1018)",
      borderRadius:40, border:"1.5px solid rgba(255,255,255,0.12)",
      position:"relative", overflow:"hidden", flexShrink:0,
      boxShadow:"0 40px 80px rgba(0,0,0,.75), 0 0 0 1px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)",
      animation:"phonefloat 4s ease-in-out infinite",
    }}>
      {/* shine */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"50%", background:"linear-gradient(180deg,rgba(255,255,255,.04),transparent)", borderRadius:"40px 40px 0 0", pointerEvents:"none", zIndex:10 }} />
      {/* notch */}
      <div style={{ height:28, background:"#0a0e18", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#fff", fontWeight:600 }}>9:41</span>
        <div style={{ width:40, height:8, background:"#0a0e18", borderRadius:100, border:"1px solid rgba(255,255,255,.1)" }} />
      </div>
      {/* screen */}
      <div style={{ background:s.screenBg, display:"flex", flexDirection:"column", height:"calc(100% - 48px)", transition:"background .4s" }}>
        {/* appbar */}
        <div style={{ display:"flex", alignItems:"center", padding:"8px 12px", gap:8, background:s.screenBg, transition:"background .4s" }}>
          <span style={{ fontSize:s.menuSize, color:"#fff", transition:"font-size .3s", lineHeight:1 }}>☰</span>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#fff", flex:1 }}>Material App</span>
          <div style={{ width:22, height:22, borderRadius:"50%", background:s.avatarBg, transition:"background .4s" }} />
        </div>
        {/* content */}
        <div style={{ flex:1, padding:"8px 12px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
          {!s.showType && (
            <div style={{ background:s.cardBg, borderRadius:s.cardRadius, padding:s.cardPadding, display:"flex", flexDirection:"column", gap:7, transition:"all .4s" }}>
              <div style={{ height:8, borderRadius:4, background:s.line1Bg, transition:"background .4s" }} />
              <div style={{ height:8, borderRadius:4, background:"rgba(255,255,255,0.07)", width:"60%" }} />
            </div>
          )}
          {s.showType && (
            <div style={{ background:s.cardBg, borderRadius:s.cardRadius, padding:"12px 10px", transition:"all .4s" }}>
              <div style={{ fontSize:s.typeSize, fontWeight:700, lineHeight:1.2, color:"#fff", textTransform:s.typeUpper?"uppercase":"none", letterSpacing:s.typeSpacing, transition:"font-size .3s" }}>{s.typeText}</div>
              {s.typeSize > 9 && <div style={{ fontSize:7, color:"rgba(255,255,255,.45)", marginTop:4 }}>Subtitle · Secondary</div>}
            </div>
          )}
          {s.showSpacing && (
            <div style={{ background:"#1a2332", borderRadius:9, padding:"8px 10px" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:"rgba(245,158,11,.85)", marginBottom:5 }}>{s.spLabel}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:Math.min(s.spWidth,56), height:14, background:"#F59E0B", borderRadius:3, transition:"width .4s" }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:"#F59E0B" }}>{s.spWidth}dp</span>
              </div>
            </div>
          )}
          {/* FAB */}
          <div>
            <div style={{ background:s.fabBg, color:s.fabColor, borderRadius:s.fabRadius, padding:"11px 0", fontSize:11, fontWeight:700, textAlign:"center", transition:"all .4s" }}>
              Acción principal
            </div>
          </div>
          {/* mini cards */}
          <div style={{ display:"flex", gap:7 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ flex:1, height:44, background:s.mcBg, borderRadius:s.mcRadius, border:s.mcBorder, transition:"all .4s" }} />
            ))}
          </div>
        </div>
        {/* navbar */}
        <div style={{ height:42, background:"rgba(10,14,24,.95)", borderTop:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"space-around" }}>
          {["🏠","⊕","♡","👤"].map((ic,i) => (
            <span key={i} style={{ fontSize:s.navSize, opacity:i===0?1:.45, transition:"font-size .3s", lineHeight:1 }}>{ic}</span>
          ))}
        </div>
      </div>
      {/* home bar */}
      <div style={{ height:20, display:"flex", alignItems:"center", justifyContent:"center", background:"#0a0e18" }}>
        <div style={{ width:56, height:4, background:"rgba(255,255,255,.2)", borderRadius:2 }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════ TOKEN EXPLORER ═══════════════════════════ */

function TokenExplorer() {
  const [open, setOpen]   = useState<Set<string>>(new Set(["color"]));
  const [active, setActive] = useState<TToken | null>(null);
  const [ps, setPs]       = useState<PhoneState>(D);
  const [pk, setPk]       = useState(0);

  function toggle(key: string) {
    setOpen(p => { const n = new Set(p); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function pick(tok: TToken) {
    setActive(tok);
    setPs({ ...D, ...(PA[tok.phone] ?? {}) });
    setPk(k => k + 1);
  }

  /* css injected once */
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes phonefloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
      @keyframes tokpulse{from{opacity:.9;transform:scale(.94)}to{opacity:0;transform:scale(1.18)}}
      
      .token-explorer-grid {
        display: grid;
        grid-template-columns: 1fr 260px;
        gap: 24px;
        align-items: start;
      }
      
      @media (max-width: 900px) {
        .token-explorer-grid {
          grid-template-columns: 1fr;
        }
        .phone-sticky-container {
          position: relative !important;
          top: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      {/* header bar */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", letterSpacing:".16em", textTransform:"uppercase" as const, color:"#FF6B35" }}>
          🪙 Design Tokens · Explorer Interactivo
        </span>
        <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,107,53,.35),transparent)" }} />
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem", color:"#6B7A96" }}>Clic en un token → celular en vivo</span>
      </div>

      <div className="token-explorer-grid">

        {/* ── LEFT: categories ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {tokenCategories.map(cat => {
            const isOpen = open.has(cat.key);
            return (
              <div key={cat.key} style={{
                background:"rgba(255,255,255,0.025)",
                border:`1px solid ${isOpen ? cat.color+"35" : "rgba(255,255,255,0.06)"}`,
                borderRadius:14, overflow:"hidden", transition:"border-color .2s",
              }}>
                {/* group header */}
                <button onClick={() => toggle(cat.key)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10,
                  padding:"13px 16px", background:"transparent", border:"none",
                  cursor:"pointer", textAlign:"left" as const,
                }}>
                  <span style={{ fontSize:17 }}>{cat.icon}</span>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.9rem", fontWeight:700, color:"#E8EDF5", flex:1 }}>{cat.label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.63rem", color:"#6B7A96", background:"rgba(255,255,255,0.05)", padding:"2px 8px", borderRadius:100 }}>
                    {cat.tokens.length} tokens
                  </span>
                  <span style={{ fontSize:11, color:"#6B7A96", transition:"transform .25s", transform:isOpen?"rotate(180deg)":"rotate(0deg)", display:"inline-block" }}>▾</span>
                </button>

                {/* tokens */}
                {isOpen && (
                  <div style={{ padding:"0 10px 10px", display:"flex", flexDirection:"column", gap:4 }}>
                    {cat.tokens.map(tok => {
                      const isAct = active?.name === tok.name;
                      return (
                        <button key={tok.name} onClick={() => pick(tok)} style={{
                          display:"flex", alignItems:"center", gap:12, padding:"9px 10px",
                          borderRadius:9, cursor:"pointer",
                          border: isAct ? `1px solid ${cat.color}55` : "1px solid transparent",
                          background: isAct ? cat.dim : "transparent",
                          transition:"background .2s, border-color .2s",
                          width:"100%", textAlign:"left" as const,
                        }}
                        onMouseEnter={e => { if (!isAct) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={e => { if (!isAct) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          {/* swatch */}
                          <div style={{
                            width:28, height:28, borderRadius:7, flexShrink:0,
                            background: cat.key === "color" ? tok.value : cat.dim,
                            border:`1px solid ${cat.color}40`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }}>
                            {cat.key !== "color" && <span style={{ fontSize:13 }}>{cat.icon}</span>}
                          </div>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color: isAct ? "#E8EDF5" : "#8B9BB4", flex:1 }}>{tok.name}</span>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color: isAct ? cat.color : "#6B7A96", whiteSpace:"nowrap" as const }}>{tok.value}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── RIGHT: phone ── */}
        <div className="phone-sticky-container" style={{ position:"sticky", top:24, display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
          {/* active badge */}
          <div style={{
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem",
            color:"#FF6B35", background:"rgba(255,107,53,.1)",
            border:"1px solid rgba(255,107,53,.3)", padding:"5px 14px",
            borderRadius:100, opacity: active ? 1 : 0, transition:"opacity .3s",
            whiteSpace:"nowrap" as const, maxWidth:"100%", overflow:"hidden", textOverflow:"ellipsis",
          }}>
            {active ? `${active.name} · ${active.value}` : "—"}
          </div>

          {/* phone + pulse ring */}
          <div style={{ position:"relative" }}>
            <div key={pk} style={{
              position:"absolute", inset:-12, borderRadius:52,
              border:"2px solid rgba(61,220,132,.55)",
              animation: pk > 0 ? "tokpulse .55s ease forwards" : "none",
              pointerEvents:"none",
            }} />
            <Phone s={ps} />
          </div>

          {/* detail card */}
          <div style={{
            background:"rgba(14,20,32,1)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:12, padding:"13px 16px", width:"100%",
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", lineHeight:1.9,
          }}>
            <div style={{ color:"#6B7A96" }}>Token activo</div>
            <div style={{ color:"#FF6B35", fontWeight:500 }}>{active?.name ?? "—"}</div>
            <div style={{ color:"#9BA8BE" }}>{active?.value ?? "Selecciona un token de la lista"}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════ TOOLTIP ═══════════════════════════ */

function Tip({ text, children }: { text: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position:"relative", display:"inline-flex" }}>
      {children}
      {open && (
        <span style={{ position:"absolute", bottom:"120%", left:"50%", transform:"translateX(-50%)", background:"var(--surface-raised)", backdropFilter:"blur(6px)", border:"1px solid var(--border)", padding:"6px 10px", borderRadius:8, whiteSpace:"nowrap", fontSize:"0.7rem", color:"var(--text-dim)", zIndex:20 }}>
          {text}
        </span>
      )}
    </span>
  );
}

function tipForToken(token: string) {
  if (token.includes("color"))   return "Tokens de color para paletas semánticas y estados.";
  if (token.includes("type"))    return "Escalas tipográficas para jerarquía y legibilidad.";
  if (token.includes("spacing")) return "Espaciados consistentes basados en múltiplos de 4/8.";
  if (token.includes("radius"))  return "Radio de bordes para personalidad y accesibilidad táctil.";
  if (token.includes("grid"))    return "Columnas, gutters y márgenes para layout responsivo.";
  if (token.includes("icon"))    return "Tamaños y stroke de iconos según plataforma.";
  return "Token de diseño.";
}

/* ═══════════════════════════ MAIN SECTION ═══════════════════════════ */

export default function Section3() {
  const [platform, setPlatform] = useState<"material" | "hig">("material");
  const [activeTab, setActiveTab] = useState<"md" | "hig">("md");
  const [activeTopic, setActiveTopic] = useState<null | "platforms" | "tokens" | "components" | "typography" | "grid" | "icons">(null);
  const [aTab, setATab] = useState(0);
  const [iTab, setITab] = useState(0);

  const ref   = useReveal();
  const ref2  = useReveal();
  const ref3  = useReveal();
  const ref4  = useReveal();
  const ref5  = useReveal();
  const ref6  = useReveal();
  const ref7  = useReveal();
  const ref8  = useReveal();
  const ref9  = useReveal();
  const ref10 = useReveal();

  /* ── shared style helpers ── */
  const S = {
    bg: "var(--bg)",
    surface: "var(--surface)",
    border: "var(--border)",
    borderHi: "var(--border-hi)",
    android: "#3DDC84",
    ios: "#007AFF",
    comp: "#22D3EE",
    text: "var(--text)",
    muted: "var(--muted)",
    dim: "var(--dim)",
    fh: "'Syne',sans-serif",
    fm: "'JetBrains Mono',monospace",
  };

  const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: S.surface, border: `1px solid ${S.border}`,
    borderRadius:16, padding:"24px 28px", ...extra,
  });

  const eyebrow: React.CSSProperties = {
    display:"inline-flex", alignItems:"center", gap:8,
    fontFamily:S.fm, fontSize:"0.68rem", letterSpacing:".17em",
    textTransform:"uppercase", color:S.comp, marginBottom:18,
  };

  const pill = (color: string, dim: string): React.CSSProperties => ({
    display:"inline-block", padding:"3px 12px", borderRadius:100,
    fontSize:"0.72rem", fontFamily:S.fm,
    background: dim, color, border:`1px solid ${color}40`,
  });

  return (
    <section id="sistemas" style={{ position:"relative", background:S.bg, padding:"80px 0 120px", overflow:"hidden" }}>



      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>

        {/* ══════════ HEADER ══════════ */}
        <div ref={ref} className="reveal" style={{ marginBottom:64 }}>
          <div style={{...eyebrow,
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            padding: '8px 16px',
            borderRadius: '999px',
            color: '#22D3EE',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              fontFamily: S.fm,
              fontSize: '0.7rem',
              fontWeight: 700
            }}>
              03 - SISTEMAS
            </span>
          </div>
          <h2 style={{ fontFamily:S.fh, fontSize:"clamp(2.2rem,5vw,4rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-.03em", marginBottom:"1rem" }}>
            Sistemas de Diseño &{" "}
            <span style={{ background:"linear-gradient(135deg,#22D3EE,#007AFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Guías de Plataforma
            </span>
          </h2>
          <p style={{ color:S.dim, fontSize:"1.05rem", maxWidth:560, lineHeight:1.75, fontWeight:300 }}>
            Fundamentos esenciales para construir interfaces móviles consistentes, escalables y alineadas con los estándares de cada ecosistema.
          </p>

          {/* stats bar */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:S.border, border:`1px solid ${S.border}`, borderRadius:14, overflow:"hidden", marginTop:40 }}>
            {[["2","Plataformas"],["6","Temas clave"],["∞","Tokens posibles"],["1×","Componentes"]].map(([n,l]) => (
              <div key={l} style={{ background:S.surface, padding:"24px 16px", textAlign:"center" }}>
                <div style={{ fontFamily:S.fh, fontSize:"2.2rem", fontWeight:800, letterSpacing:"-.04em", background:"linear-gradient(135deg,#22D3EE,#007AFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4 }}>{n}</div>
                <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, letterSpacing:".08em", textTransform:"uppercase" as const }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ TOPIC BUTTONS ══════════ */}
        <div ref={ref2} className="reveal" style={{ marginBottom:32 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[
              { key:"platforms",  label:"Material vs iOS",  color:"#22D3EE", icon:"🧭" },
              { key:"tokens",     label:"Design Tokens",    color:"#FF6B35", icon:"🪙" },
              { key:"components", label:"Componentes UI",   color:"#3DDC84", icon:"🧩" },
              { key:"typography", label:"Tipografía",       color:"#C084FC", icon:"🔤" },
              { key:"grid",       label:"Grid & Spacing",   color:"#F59E0B", icon:"📐" },
              { key:"icons",      label:"Iconografía",      color:"#EC4899", icon:"🏷️" },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTopic(t.key as typeof activeTopic)}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:12, border:`1px solid ${t.color}30`, background:`${t.color}10`, color:t.color, fontFamily:S.fm, fontSize:"0.78rem", cursor:"pointer", transition:"transform .15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <span style={{ fontSize:15 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ PLATFORM BATTLE ══════════ */}
        <div ref={ref3} className="reveal" style={{ marginBottom:56 }}>

          {/* Android vs iOS cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 56px 1fr", marginBottom:32 }}>

            {/* Android */}
            <div style={{ ...card({ borderRadius:"20px 0 0 20px", borderRight:"none", paddingTop:32, paddingBottom:32 }), position:"relative", overflow:"hidden", transition:"transform .3s, border-color .3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,220,132,.35)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = S.border; }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#3DDC84,transparent)" }} />
              <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", background:"#3DDC84", filter:"blur(70px)", opacity:.09, top:-60, left:-40, pointerEvents:"none" }} />
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:100, background:"rgba(61,220,132,.1)", color:"#3DDC84", fontFamily:S.fm, fontSize:"0.7rem", letterSpacing:".1em", textTransform:"uppercase" as const, marginBottom:18 }}>
                🤖 Android
              </div>
              <div style={{ fontFamily:S.fh, fontSize:"1.3rem", fontWeight:700, color:S.android, marginBottom:4 }}>Material Design</div>
              <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:22 }}>material.io · Google LLC</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {["Superficies físicas con elevación tonal (Material You)","Sistema de componentes M3 con color dinámico","Grilla de 4dp como unidad base de espaciado","Motion: curvas expresivas y shared axis transitions","Iconografía Material Symbols — outlined, rounded, sharp"].map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"0.82rem", color:S.dim, lineHeight:1.55 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#3DDC84", marginTop:6, flexShrink:0 }} />{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* VS divider */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <div style={{ position:"absolute", top:0, bottom:0, left:"50%", width:1, background:`linear-gradient(180deg,transparent,${S.borderHi},transparent)` }} />
              <div style={{ width:44, height:44, background:S.bg, border:`1px solid ${S.borderHi}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:S.fh, fontSize:"0.75rem", fontWeight:800, color:S.muted, position:"relative", zIndex:2 }}>VS</div>
            </div>

            {/* iOS */}
            <div style={{ ...card({ borderRadius:"0 20px 20px 0", borderLeft:"none", paddingTop:32, paddingBottom:32 }), position:"relative", overflow:"hidden", transition:"transform .3s, border-color .3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,122,255,.35)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = S.border; }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#007AFF)" }} />
              <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", background:"#007AFF", filter:"blur(70px)", opacity:.09, top:-60, right:-40, pointerEvents:"none" }} />
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:100, background:"rgba(0,122,255,.1)", color:"#007AFF", fontFamily:S.fm, fontSize:"0.7rem", letterSpacing:".1em", textTransform:"uppercase" as const, marginBottom:18 }}>
                🍎 iOS
              </div>
              <div style={{ fontFamily:S.fh, fontSize:"1.3rem", fontWeight:700, color:S.ios, marginBottom:4 }}>Human Interface Guidelines</div>
              <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:22 }}>developer.apple.com/design · Apple Inc.</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {["Principios: Claridad, Deferencia y Profundidad","Componentes UIKit / SwiftUI nativos adaptativos","Unidad base 8pt con Safe Areas obligatorias","Motion: spring physics y continuidad gestual","Iconografía SF Symbols con peso variable y localización"].map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"0.82rem", color:S.dim, lineHeight:1.55 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#007AFF", marginTop:6, flexShrink:0 }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison table */}
          <div style={{ ...card({ padding:0 }), overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr", background:"rgba(20,27,40,1)", borderBottom:`1px solid ${S.border}` }}>
              {["Característica","🤖 Material Design","🍎 HIG / Apple"].map((h,i) => (
                <div key={h} style={{ padding:"13px 20px", fontFamily:S.fm, fontSize:"0.68rem", letterSpacing:".1em", textTransform:"uppercase" as const, color: i===0 ? S.muted : i===1 ? S.android : S.ios, borderRight: i<2 ? `1px solid ${S.border}` : "none" }}>{h}</div>
              ))}
            </div>
            {platformComparison.map((row,i) => (
              <div key={row.aspect} style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr", borderBottom: i<platformComparison.length-1 ? `1px solid ${S.border}` : "none", transition:"background .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <div style={{ padding:"13px 20px", fontWeight:600, fontSize:"0.82rem", color:S.text, borderRight:`1px solid ${S.border}`, display:"flex", alignItems:"center" }}>{row.aspect}</div>
                <div style={{ padding:"13px 20px", fontSize:"0.8rem", color:S.dim, borderRight:`1px solid ${S.border}`, display:"flex", alignItems:"center" }}>
                  <span style={{ ...pill(S.android,"rgba(61,220,132,.1)") }}>{row.material}</span>
                </div>
                <div style={{ padding:"13px 20px", fontSize:"0.8rem", color:S.dim, display:"flex", alignItems:"center" }}>
                  <span style={{ ...pill(S.ios,"rgba(0,122,255,.1)") }}>{row.hig}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs: principles */}
          <div style={{ ...card({ padding:0, marginTop:20 }), overflow:"hidden" }}>
            <div style={{ display:"flex", background:"rgba(20,27,40,1)", borderBottom:`1px solid ${S.border}`, padding:"0 8px", gap:2 }}>
              {([["md","Material Design 3"],["hig","Human Interface"]] as const).map(([k,l]) => (
                <button key={k} onClick={() => setActiveTab(k)}
                  style={{ padding:"13px 20px", fontFamily:S.fm, fontSize:"0.72rem", letterSpacing:".08em", textTransform:"uppercase" as const, color: activeTab===k ? S.comp : S.muted, background:"transparent", border:"none", borderBottom: activeTab===k ? `2px solid ${S.comp}` : "2px solid transparent", marginBottom:-1, cursor:"pointer", transition:"color .2s, border-color .2s" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ padding:28 }}>
              <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, letterSpacing:".1em", textTransform:"uppercase" as const, marginBottom:20 }}>
                {activeTab === "md" ? "Principios de Material Design 3" : "Principios HIG · Apple"}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14 }}>
                {(activeTab === "md" ? [
                  ["🎨","Color Dinámico","Paletas personalizadas desde el wallpaper del usuario vía tonalidad algorítmica."],
                  ["📐","Elevación Tonal","Las capas se distinguen con variaciones de color, no solo sombras físicas."],
                  ["⚡","Motion Expresivo","Transiciones con personalidad: arc upward, fade through, shared axis."],
                  ["♿","Accesibilidad","Contraste 4.5:1 y targets táctiles de 48dp con soporte TalkBack."],
                  ["🔧","Adaptabilidad","Layouts responsive para teléfono, tablet y desktop desde un sistema."],
                  ["🧩","Composición","Componentes modulares que respetan jerarquía visual y roles semánticos."],
                ] : [
                  ["🔍","Claridad","Texto legible, íconos precisos y adornos que nunca compiten con el contenido."],
                  ["🎭","Deferencia","La UI sirve al contenido. Fondos fluidos y translucencia dan contexto."],
                  ["🌊","Profundidad","Capas visuales y movimiento realista comunican jerarquía en el flujo."],
                  ["🤝","Consistencia","Familiaridad con controles estándar reduce la carga cognitiva."],
                  ["🎯","Feedback","Cada acción tiene respuesta visual, táctil o sonora inmediata."],
                  ["🔄","Continuidad","Las transiciones mantienen el hilo cognitivo entre vistas."],
                ]).map(([ico,name,desc]) => (
                  <div key={name} style={{ background:S.bg, border:`1px solid ${S.border}`, borderRadius:12, padding:18, transition:"border-color .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = S.borderHi; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = S.border; }}>
                    <div style={{ fontSize:22, marginBottom:10 }}>{ico}</div>
                    <div style={{ fontFamily:S.fh, fontSize:"0.85rem", fontWeight:700, marginBottom:5, color:S.text }}>{name}</div>
                    <div style={{ fontSize:"0.75rem", color:S.muted, lineHeight:1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ DESIGN TOKENS EXPLORER ══════════ */}
        <div ref={ref4} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:8, color:S.text }}>Design Tokens</h3>
          <p style={{ color:S.muted, fontSize:"0.9rem", marginBottom:24, lineHeight:1.65 }}>
            Variables que almacenan decisiones de diseño. Selecciona cualquier token y observa cómo transforma la app en tiempo real.
          </p>
          <div style={{ ...card() }}>
            <TokenExplorer />
          </div>
        </div>

        {/* ══════════ TYPOGRAPHY SCALE ══════════ */}
        <div ref={ref5} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:16, color:S.text }}>Escala Tipográfica Móvil</h3>
          <div style={card()}>
            {[
              { name:"Display",    size:"57sp / 57pt", sample:"Aa",                        weight:400, fs:"2.6rem" },
              { name:"Headline L", size:"32sp / 32pt", sample:"Aa",                        weight:400, fs:"1.8rem" },
              { name:"Title L",    size:"22sp / 22pt", sample:"Título",                    weight:500, fs:"1.3rem" },
              { name:"Body L",     size:"16sp / 16pt", sample:"Texto de cuerpo principal", weight:400, fs:"1rem"   },
              { name:"Label M",    size:"12sp / 12pt", sample:"Etiqueta componente",       weight:500, fs:"0.75rem"},
            ].map((t,i) => (
              <div key={t.name} style={{ display:"flex", alignItems:"center", gap:20, padding:"12px 0", borderBottom: i<4 ? `1px solid ${S.border}` : "none" }}>
                <span style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, width:82, flexShrink:0 }}>{t.name}</span>
                <span style={{ fontFamily:S.fh, fontSize:t.fs, fontWeight:t.weight, flex:1, color:S.text, lineHeight:1.2 }}>{t.sample}</span>
                <span style={{ fontFamily:S.fm, fontSize:"0.68rem", color:"#6366f1" }}>{t.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ COMPONENTS ══════════ */}
        <div ref={ref6} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:12, color:S.text }}>Componentes Reutilizables</h3>
          <p style={{ color:S.muted, fontSize:"1.125rem", marginBottom:20, lineHeight:1.65 }}>Variaciones según plataforma aplicando tokens de color, radio y tipografía.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {/* atoms grid */}
            {[["ATOMS","Button · Icon\nBadge · Label"],["MOLECULES","Card · ListItem\nSearchBar · Chip"],["ORGANISMS","AppBar · NavBar\nBottomSheet · Modal"],["TEMPLATES","Feed · Profile\nCheckout · Onboarding"]].map(([level,items]) => (
              <div key={level} style={{ 
                padding:"18px 20px", 
                borderRadius:"16px",
                background:"var(--surface)",
                border:"0.8px solid var(--border)",
                color:"var(--text)",
                lineHeight:"25.6px",
                transition: "all 0.3s ease"
              }}>
                <div style={{ fontFamily:S.fm, fontSize:"1rem", color:S.comp, marginBottom:10, letterSpacing:".1em", fontWeight: 700 }}>{level}</div>
                <div style={{ fontSize:"1.125rem", color:"var(--muted)", lineHeight:1.7, whiteSpace:"pre-line" as const }}>{items}</div>
              </div>
            ))}
          </div>
          {/* live component demo */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:16 }}>
            <div style={card({ display:"flex", flexDirection:"column", gap:12 })}>
              <span style={{ fontFamily:S.fm, fontSize:"1rem", color:S.muted }}>Botón Primario</span>
              <button style={{ padding: platform==="material"?"12px 18px":"12px 22px", background: platform==="material"?"#3DDC84":"rgba(0,122,255,0.12)", color: platform==="material"?"#031B1A":"#C7C8FF", borderRadius: platform==="material"?14:12, border: platform==="material"?"none":"1px solid rgba(0,122,255,0.4)", fontFamily:S.fh, fontWeight:700, transition:"all .2s", cursor:"pointer" }}>Continuar</button>
            </div>
            <div style={card({ display:"flex", flexDirection:"column", gap:12 })}>
              <span style={{ fontFamily:S.fm, fontSize:"1rem", color:S.muted }}>Card</span>
              <div style={{ background:"var(--surface2)", border:`1px solid ${S.border}`, borderRadius: platform==="material"?16:20, padding:14, boxShadow: platform==="material"?"0 8px 24px rgba(0,0,0,.25)":"0 2px 12px rgba(0,0,0,.15)" }}>
                <div style={{ fontFamily:S.fh, fontWeight:700, marginBottom:5, color:S.text, fontSize:"1.125rem" }}>Título</div>
                <div style={{ color:S.muted, fontSize:"1rem" }}>Descripción breve del contenido.</div>
              </div>
            </div>
            <div style={card({ display:"flex", flexDirection:"column", gap:12 })}>
              <span style={{ fontFamily:S.fm, fontSize:"1rem", color:S.muted }}>FAB</span>
              <div style={{ height:56, display:"flex", alignItems:"center" }}>
                <div style={{ width: platform==="material"?56:48, height: platform==="material"?56:48, borderRadius:999, background: platform==="material"?"#22D3EE":"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", border: platform==="material"?"none":`1px solid ${S.border}`, boxShadow: platform==="material"?"0 10px 28px rgba(34,211,238,0.35)":"none", color: platform==="material"?"#001B22":S.dim, fontSize:22, fontWeight:700 }}>+</div>
              </div>
            </div>
          </div>
          {/* platform toggle */}
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            {[{k:"material",l:"🤖 Android",c:"#3DDC84"},{k:"hig",l:"🍎 iOS",c:"#007AFF"}].map(p => (
              <button key={p.k} onClick={() => setPlatform(p.k as "material"|"hig")}
                style={{ padding:"10px 20px", borderRadius:100, border:`1px solid ${platform===p.k?p.c:S.border}`, background: platform===p.k?`${p.c}15`:"transparent", color: platform===p.k?p.c:S.muted, fontFamily:S.fm, fontSize:"1rem", cursor:"pointer", transition:"all .2s" }}>
                {p.l}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ ICONOGRAFÍA ══════════ */}
        <div ref={ref7} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:12, color:S.text }}>Iconografía</h3>
          <p style={{ color:S.muted, fontSize:"0.9rem", marginBottom:16, lineHeight:1.65 }}>Los íconos son lenguaje visual universal. Tamaño táctil mínimo 24dp.</p>
          <div style={card()}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:8, marginBottom:20 }}>
              {["🏠","🔍","👤","⚙️","🔔","❤️","↗️","✏️","🗑️","➕","☰","✕","📱","💬","📷","🎵"].map((ic,i) => (
                <div key={i} style={{ aspectRatio:"1", background:S.bg, border:`1px solid ${S.border}`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, cursor:"default", transition:"background .2s, border-color .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(236,72,153,.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(236,72,153,.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = S.bg; (e.currentTarget as HTMLElement).style.borderColor = S.border; }}>
                  {ic}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" as const }}>
              {[["24dp min","#EC4899"],["Outlined","#EC4899"],["Filled","#EC4899"],["SF Symbols","#EC4899"]].map(([t,c]) => (
                <span key={t} style={{ ...pill(c,"rgba(236,72,153,.1)") }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ GRID ══════════ */}
        <div ref={ref8} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:12, color:S.text }}>Grid & Espaciado</h3>
          <div style={card()}>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[{label:"📱 Teléfono · 4 columnas · margin 16dp", cols:4, marginW:16},{label:"📟 Tablet · 8 columnas · margin 24dp", cols:8, marginW:24}].map(g => (
                <div key={g.label}>
                  <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:6 }}>{g.label}</div>
                  <div style={{ display:"flex", gap:4, height:28 }}>
                    <div style={{ width:g.marginW, flexShrink:0, background:"rgba(245,158,11,.3)", borderRadius:3, border:"1px solid rgba(245,158,11,.5)" }} />
                    {Array.from({length:g.cols}).map((_,i) => (
                      <div key={i} style={{ flex:1, background:"rgba(245,158,11,.12)", borderRadius:3, border:"1px solid rgba(245,158,11,.2)" }} />
                    ))}
                    <div style={{ width:g.marginW, flexShrink:0, background:"rgba(245,158,11,.3)", borderRadius:3, border:"1px solid rgba(245,158,11,.5)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, marginTop:16, flexWrap:"wrap" as const }}>
              {[["4dp base","#F59E0B"],["Gutters","#F59E0B"],["Safe Area","#F59E0B"],["Breakpoints","#F59E0B"]].map(([t,c]) => (
                <span key={t} style={{ ...pill(c,"rgba(245,158,11,.1)") }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ REAL SCENARIOS ══════════ */}
        <div ref={ref9} className="reveal" style={{ marginBottom:56 }}>
          <h3 style={{ fontFamily:S.fh, fontSize:"1.4rem", fontWeight:700, marginBottom:12, color:S.text }}>Escenarios reales de uso</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {[
              { title:"Onboarding", tip:"3–5 pantallas, claro y medible",  icon:"🚀", tokens:["color.primary","type.title","spacing.md"]    },
              { title:"Checkout",   tip:"Progreso visible y feedback",     icon:"💳", tokens:["color.success","type.body","radius.md"]       },
              { title:"Perfil",     tip:"Jerarquía visual estable",        icon:"👤", tokens:["type.headline","icon.size.md","grid.columns"] },
            ].map(sc => (
              <div key={sc.title} style={card({ display:"grid", gap:10 })}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:20 }}>{sc.icon}</span>
                  <span style={{ fontFamily:S.fh, fontWeight:700, color:S.text }}>{sc.title}</span>
                </div>
                <div style={{ fontFamily:S.fm, fontSize:"0.78rem", color:S.muted }}>{sc.tip}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
                  {sc.tokens.map(t => <span key={t} style={{ ...pill(S.comp,"rgba(34,211,238,.08)") }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ BEST PRACTICES + ERRORS ══════════ */}
        <div ref={ref10} className="reveal" style={{ marginBottom:32 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div>
              <h3 style={{ fontFamily:S.fh, fontSize:"1.1rem", fontWeight:700, marginBottom:12, color:S.text }}>Buenas prácticas</h3>
              {[["👍","Elementos clave en zona inferior (zona pulgar)."],["🔍","Contraste mínimo y fuente ≥ 14px."],["🧭","Máximo 5 destinos en navegación."],["⚡","Feedback inmediato en cada acción."]].map(([ico,txt],i) => (
                <div key={i} style={{ display:"flex", gap:10, padding:"10px 14px", background:S.surface, border:`1px solid ${S.border}`, borderRadius:10, marginBottom:8, fontSize:"0.82rem", color:S.muted }}>
                  <span style={{ fontSize:16 }}>{ico}</span><span>{txt}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily:S.fh, fontSize:"1.1rem", fontWeight:700, marginBottom:12, color:S.text }}>Errores comunes</h3>
              {[["❌","Sobrecargar la pantalla con demasiadas acciones."],["❌","Inconsistencia en espaciados entre pantallas."],["❌","Iconos sin etiqueta — accesibilidad reducida."],["❌","No considerar safe areas y notch en iOS."]].map(([ico,txt],i) => (
                <div key={i} style={{ display:"flex", gap:10, padding:"10px 14px", background:S.surface, border:`1px solid ${S.border}`, borderRadius:10, marginBottom:8, fontSize:"0.82rem", color:S.muted }}>
                  <span style={{ fontSize:16 }}>{ico}</span><span>{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ TOPIC MODAL ══════════ */}
        {activeTopic && (
          <div role="dialog" aria-modal="true" onClick={() => setActiveTopic(null)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, zIndex:1000 }}>
            <div onClick={e => e.stopPropagation()}
              style={{ width:"min(900px,96vw)", maxHeight:"86vh", overflowY:"auto", background:"linear-gradient(180deg,rgba(14,20,32,.97),rgba(8,12,20,.97))", border:`1px solid ${S.borderHi}`, borderRadius:18, padding:28 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h3 style={{ fontFamily:S.fh, fontWeight:800, fontSize:"1.25rem", color:S.text }}>
                  {activeTopic==="platforms"  && "Material Design vs HIG"}
                  {activeTopic==="tokens"     && "Design Tokens"}
                  {activeTopic==="components" && "Componentes Reutilizables"}
                  {activeTopic==="typography" && "Tipografía Móvil"}
                  {activeTopic==="grid"       && "Grid & Espaciado Responsive"}
                  {activeTopic==="icons"      && "Iconografía en Apps Móviles"}
                </h3>
                <button onClick={() => setActiveTopic(null)}
                  style={{ border:`1px solid ${S.border}`, background:"rgba(255,255,255,0.04)", color:S.dim, borderRadius:10, padding:"7px 14px", fontFamily:S.fm, fontSize:"0.75rem", cursor:"pointer" }}>
                  Cerrar ✕
                </button>
              </div>

              {activeTopic === "tokens" && (
                <div style={{ display:"grid", gap:14 }}>
                  <div style={card({ padding:20 })}>
                    <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:10 }}>Estructura JSON</div>
                    <pre style={{ background:S.bg, padding:14, borderRadius:10, overflowX:"auto", fontSize:"0.72rem", fontFamily:S.fm, color:"#86efac" }}>{`{\n  "color": { "primary": "#3DDC84", "surface": "#1A2332" },\n  "type": { "body": { "size": 16, "line": 24, "weight": 400 } },\n  "radius": { "md": 12 },\n  "spacing": { "md": 16 }\n}`}</pre>
                  </div>
                  <div style={card({ padding:20 })}>
                    <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:10 }}>CSS Variables + React</div>
                    <pre style={{ background:S.bg, padding:14, borderRadius:10, overflowX:"auto", fontSize:"0.72rem", fontFamily:S.fm, color:"#93c5fd" }}>{`:root {\n  --color-primary: #3DDC84;\n  --radius-md: 12px;\n  --spacing-md: 16px;\n}\n\nfunction Button({ children }) {\n  return (\n    <button style={{\n      background: "var(--color-primary)",\n      borderRadius: "var(--radius-md)",\n      padding: "12px var(--spacing-md)"\n    }}>\n      {children}\n    </button>\n  );\n}`}</pre>
                  </div>
                </div>
              )}
              {activeTopic === "platforms" && (
                <div style={{ display:"grid", gap:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div style={card({ padding:20 })}>
                      <div style={{ fontFamily:S.fm, fontWeight:700, color:S.android, marginBottom:10, fontSize:"0.8rem" }}>Android • Material 3</div>
                      <ul style={{ color:S.muted, fontSize:"0.82rem", lineHeight:1.7, paddingLeft:16 }}>
                        <li>Unidades dp/sp. Mínimo táctil 48×48dp.</li>
                        <li>Color dinámico Material You.</li>
                        <li>Bottom App Bar + Navigation Bar.</li>
                        <li>Elevación tonal para jerarquía.</li>
                        <li>Material Symbols en 3 estilos.</li>
                      </ul>
                    </div>
                    <div style={card({ padding:20 })}>
                      <div style={{ fontFamily:S.fm, fontWeight:700, color:S.ios, marginBottom:10, fontSize:"0.8rem" }}>iOS • Human Interface</div>
                      <ul style={{ color:S.muted, fontSize:"0.82rem", lineHeight:1.7, paddingLeft:16 }}>
                        <li>Unidades pt. Mínimo táctil 44×44pt.</li>
                        <li>SF Pro + Dynamic Type adaptativo.</li>
                        <li>Tab Bar con Navigation Stack.</li>
                        <li>Blur + vibrancy para capas.</li>
                        <li>SF Symbols con pesos variables.</li>
                      </ul>
                    </div>
                  </div>
                  <div style={card({ padding:20 })}>
                    <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:10 }}>CSS Safe Areas</div>
                    <pre style={{ background:S.bg, padding:14, borderRadius:10, overflowX:"auto", fontSize:"0.72rem", fontFamily:S.fm, color:"#86efac" }}>{`panel {\n  padding-bottom: max(16px, env(safe-area-inset-bottom));\n  padding-top: max(12px, env(safe-area-inset-top));\n}`}</pre>
                  </div>
                  {/* mini nav demos */}
                  <div style={card({ padding:20 })}>
                    <div style={{ fontFamily:S.fm, fontSize:"0.68rem", color:S.muted, marginBottom:16 }}>Bottom Nav vs Tab Bar</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                      <div style={{ background:"#141422", borderRadius:14, padding:12 }}>
                        <div style={{ height:130, borderRadius:12, background:"rgba(255,255,255,0.03)", border:`1px solid ${S.border}`, marginBottom:10 }} />
                        <div style={{ height:52, borderRadius:10, display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"rgba(0,0,0,.5)", border:`1px solid ${S.border}` }}>
                          {["Inicio","Buscar","Fav","Perfil"].map((l,idx) => (
                            <button key={l} onClick={() => setATab(idx)} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, color: aTab===idx?"#3DDC84":"#9AA0C2", fontSize:9, background:"transparent", border:"none", cursor:"pointer" }}>
                              <div style={{ width:16,height:16,borderRadius:4, background: aTab===idx?"rgba(61,220,132,.25)":"rgba(255,255,255,.06)", border: aTab===idx?"1px solid rgba(61,220,132,.5)":"1px solid rgba(255,255,255,.08)" }} />{l}
                            </button>
                          ))}
                        </div>
                        <div style={{ fontFamily:S.fm, color:S.android, marginTop:6, fontSize:"0.65rem" }}>Android · M3</div>
                      </div>
                      <div style={{ background:"#141422", borderRadius:14, padding:12 }}>
                        <div style={{ height:130, borderRadius:12, background:"rgba(255,255,255,0.03)", border:`1px solid ${S.border}`, marginBottom:10 }} />
                        <div style={{ height:58, borderRadius:20, display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"rgba(20,20,34,.5)", backdropFilter:"blur(8px)", border:`1px solid ${S.border}` }}>
                          {["Inicio","Buscar","Fav","Perfil"].map((l,idx) => (
                            <button key={l} onClick={() => setITab(idx)} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, color: iTab===idx?"#C8C8FF":"#9AA0C2", fontSize:9, background:"transparent", border:"none", cursor:"pointer" }}>
                              <div style={{ width:14,height:14,borderRadius:4, background:"transparent", border:"2px solid rgba(0,122,255,.6)", boxShadow: iTab===idx?"0 0 0 3px rgba(0,122,255,.15) inset":"none" }} />{l}
                            </button>
                          ))}
                        </div>
                        <div style={{ fontFamily:S.fm, color:S.ios, marginTop:6, fontSize:"0.65rem" }}>iOS · HIG Tab Bar</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTopic === "components" && (
                <div style={{ display:"grid", gap:14 }}>
                  <div style={card({ padding:20 })}>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const, marginBottom:14 }}>
                      <button style={{ padding:"10px 16px", borderRadius:12, background:"rgba(61,220,132,.15)", border:"1px solid rgba(61,220,132,.4)", color:"#3DDC84", cursor:"pointer" }}>Primario</button>
                      <button style={{ padding:"10px 16px", borderRadius:12, background:"transparent", border:`1px solid ${S.border}`, color:S.dim, cursor:"pointer" }}>Secundario</button>
                      <button style={{ padding:"10px 16px", borderRadius:999, background:"rgba(34,211,238,.12)", border:"1px solid rgba(34,211,238,.35)", color:"#22D3EE", cursor:"pointer" }}>FAB +</button>
                    </div>
                    <div style={{ fontFamily:S.fm, fontSize:"0.75rem", color:S.muted }}>Estados: enabled · hover · pressed · disabled</div>
                  </div>
                  <div style={card({ padding:20 })}>
                    <pre style={{ background:S.bg, padding:14, borderRadius:10, overflowX:"auto", fontSize:"0.72rem", fontFamily:S.fm, color:"#93c5fd" }}>{`type Variant = "filled" | "outline";\nfunction Button({ variant = "filled", children }) {\n  const style = variant === "filled"\n    ? { background: "var(--color-primary)", color: "#000", border: "none" }\n    : { background: "transparent", color: "#E8EDF5", border: "1px solid rgba(255,255,255,.12)" };\n  return <button style={{ ...style, padding: "12px 16px", borderRadius: 12 }}>{children}</button>;\n}`}</pre>
                  </div>
                </div>
              )}
              {(activeTopic === "typography" || activeTopic === "grid" || activeTopic === "icons") && (
                <div style={{ display:"grid", gap:14 }}>
                  <div style={card({ padding:20 })}>
                    <ul style={{ color:S.muted, fontSize:"0.88rem", lineHeight:1.75, paddingLeft:16 }}>
                      {activeTopic === "typography" && <>
                        <li>Cuerpo base: Android 16sp · iOS Body 17pt.</li>
                        <li>Altura de línea recomendada: 1.3–1.6.</li>
                        <li>Mínimo legible: 12px; recomendado 14px+.</li>
                        <li>Roboto / SF Pro para mejor rendimiento.</li>
                      </>}
                      {activeTopic === "grid" && <>
                        <li>Mobile 4 cols · tablet 8 · desktop 12. Gutter 8–16.</li>
                        <li>Múltiplos de 4/8 para espaciado consistente.</li>
                        <li>Usar clamp() para tipografía fluida.</li>
                      </>}
                      {activeTopic === "icons" && <>
                        <li>Material: grid 24dp, filled/outlined, pesos ajustables.</li>
                        <li>SF Symbols: 20/24pt, pesos y renders multicolor.</li>
                        <li>Evitar trazos inferiores a 1–1.5pt. Labels en nav.</li>
                      </>}
                    </ul>
                  </div>
                  <div style={card({ padding:20 })}>
                    <pre style={{ background:S.bg, padding:14, borderRadius:10, overflowX:"auto", fontSize:"0.72rem", fontFamily:S.fm, color:"#86efac" }}>
                      {activeTopic === "typography" && `h1 { font: 800 32px/40px var(--font-display); }\nbody { font: 400 16px/24px var(--font-body); }`}
                      {activeTopic === "grid" && `.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }\n@media (min-width: 768px)  { .grid { grid-template-columns: repeat(8, 1fr); } }\n@media (min-width: 1024px) { .grid { grid-template-columns: repeat(12, 1fr); } }`}
                      {activeTopic === "icons" && `icon { width: 24px; height: 24px; }\n.nav-item { gap: 6px; font-size: 12px; }`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}