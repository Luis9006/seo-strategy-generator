import { useState } from "react";

const COLORS = {
  orange: "#FF7A59",
  teal: "#00BDA5",
  navy: "#1C3A56",
  slate: "#516F90",
  light: "#F5F8FA",
  border: "#DFE3EB",
  text: "#33475B",
};

const steps = ["Tu sitio web", "Autoridad SEO", "Objetivo SMART", "KPIs", "Estrategias"];

const industrias = ["E-commerce", "Servicios profesionales", "Educación", "Salud y bienestar", "Tecnología", "Medios y entretenimiento", "Otro"];

const nivelesAutoridad = [
  {
    id: "bajo",
    label: "Autoridad baja",
    desc: "Pocos o ningún enlace externo. Sitio relativamente nuevo. Google aún está descubriendo tu contenido.",
    pilar: "Tu prioridad principal es el descubrimiento y la relevancia — asegúrate de que Google pueda rastrear e indexar tu sitio antes de enfocarte en los enlaces externos.",
  },
  {
    id: "medio",
    label: "Autoridad media",
    desc: "Algunos enlaces externos. Presencia establecida pero con oportunidades de crecimiento claras.",
    pilar: "Tienes relevancia establecida. Es momento de equilibrar la creación de contenido con la construcción activa de autoridad a través de enlaces externos de calidad.",
  },
  {
    id: "alto",
    label: "Autoridad alta",
    desc: "Muchos enlaces externos de calidad. Tu sitio es reconocido como referente en tu industria.",
    pilar: "Tu sitio ya tiene autoridad sólida. Enfócate en defender tu posición y crear contenido que genere enlaces de forma natural — como los bestsellers en el estante principal de la biblioteca.",
  },
];

const kpisDisponibles = [
  { id: "trafico", label: "Tráfico orgánico", desc: "Visitas que llegan a tu sitio desde búsqueda sin pago. Refleja qué tan bien te están descubriendo." },
  { id: "palabras", label: "Clasificación de palabras clave", desc: "Posición de tus términos en los resultados de búsqueda. Indica tu nivel de relevancia para esas consultas." },
  { id: "conversion", label: "Tasa de conversión", desc: "Porcentaje de visitantes que completan una acción. Conecta el tráfico orgánico con resultados de negocio." },
  { id: "rebote", label: "Tasa de rebote", desc: "Visitantes que salen sin interactuar. Una tasa alta puede indicar que el contenido no es relevante para la consulta." },
  { id: "carga", label: "Tiempo de carga", desc: "Velocidad con que carga tu sitio. Afecta directamente la experiencia del usuario y la clasificación." },
  { id: "enlaces", label: "Enlaces externos recibidos", desc: "Sitios que enlacen al tuyo. El indicador más directo de autoridad SEO." },
];

const estrategiasPorNivel = {
  bajo: [
    "Verifica que Google puede rastrear e indexar tu sitio — usa Google Search Console para identificar errores de crawling",
    "Crea contenido estructurado y relevante alrededor de 3 a 5 palabras clave principales de tu industria",
    "Optimiza los títulos, meta descripciones y estructura de URLs de tus páginas existentes",
    "Mejora la velocidad de carga de tu sitio — es un factor de clasificación directo para Google",
    "Registra tu sitio en directorios relevantes de tu industria para comenzar a construir tu perfil de enlaces",
  ],
  medio: [
    "Desarrolla una estrategia de contenido pillar-cluster: un artículo principal por tema y varios artículos secundarios que lo refuercen",
    "Analiza tu perfil de enlaces externos con una herramienta como Moz o SEMrush e identifica oportunidades",
    "Busca oportunidades de guest posting en sitios con autoridad en tu industria",
    "Actualiza y mejora el contenido existente que ya recibe tráfico orgánico — puede clasificar aún mejor",
    "Construye enlaces internos estratégicos entre tus páginas para distribuir la autoridad dentro de tu sitio",
  ],
  alto: [
    "Crea contenido de investigación original — estudios, encuestas o datos propios — que genere enlaces naturalmente",
    "Identifica y captura Featured Snippets y rich results para términos clave de tu industria",
    "Desarrolla una estrategia de relaciones públicas digitales para amplificar tu autoridad con menciones en medios",
    "Optimiza para búsquedas de alta intención comercial donde tu autoridad te da ventaja competitiva",
    "Monitorea y actualiza regularmente tu contenido más valioso para mantener su relevancia y clasificación",
  ],
};

const plazoOptions = ["3 meses", "6 meses", "12 meses", "18 meses"];

function generateHTML(data) {
  const { sitio, industria, autoridad, objetivo, plazo, kpis, estrategias } = data;
  const fecha = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  const nivelLabel = nivelesAutoridad.find(n => n.id === autoridad)?.label || "";
  const nivelPilar = nivelesAutoridad.find(n => n.id === autoridad)?.pilar || "";
  const kpiLabels = kpis.map(k => kpisDisponibles.find(d => d.id === k)?.label || k);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Estrategia SEO — ${sitio}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #F5F8FA; padding: 32px 24px; color: #33475B; }
  .page { max-width: 780px; margin: 0 auto; }
  .header { background: #1C3A56; border-radius: 12px 12px 0 0; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; }
  .header-title { color: white; font-size: 20px; font-weight: 800; }
  .header-sub { color: rgba(255,255,255,0.7); font-size: 13px; margin-top: 4px; }
  .badge { background: #FF7A59; color: white; font-size: 10px; font-weight: 800; letter-spacing: 1px; padding: 6px 12px; border-radius: 6px; white-space: nowrap; }
  .body { background: white; border-radius: 0 0 12px 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  .section { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #F5F8FA; }
  .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .section-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #FF7A59; margin-bottom: 12px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .info-item { background: #F5F8FA; border-radius: 8px; padding: 12px 16px; }
  .info-label { font-size: 11px; color: #516F90; font-weight: 600; margin-bottom: 3px; }
  .info-value { font-size: 14px; color: #1C3A56; font-weight: 700; }
  .pilar-box { background: #F0F7FF; border-left: 4px solid #1C3A56; border-radius: 0 8px 8px 0; padding: 14px 18px; font-size: 13px; color: #1C3A56; line-height: 1.6; margin-top: 12px; }
  .objetivo-box { background: #FFF5F2; border-left: 4px solid #FF7A59; border-radius: 0 8px 8px 0; padding: 16px 20px; }
  .objetivo-text { font-size: 15px; color: #1C3A56; font-weight: 700; line-height: 1.5; font-style: italic; }
  .plazo { font-size: 12px; color: #516F90; margin-top: 6px; }
  .kpi-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .kpi-tag { background: #E8F8F6; color: #00BDA5; border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 700; }
  .estrategia-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F5F8FA; align-items: flex-start; }
  .estrategia-item:last-child { border-bottom: none; }
  .num { background: #FF7A59; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; margin-top: 1px; }
  .estrategia-text { font-size: 14px; line-height: 1.6; color: #33475B; }
  .reminder { background: #F0FDF4; border-radius: 8px; padding: 16px 18px; margin-top: 24px; }
  .reminder-title { font-size: 12px; font-weight: 800; color: #00BDA5; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .reminder-text { font-size: 13px; color: #516F90; line-height: 1.7; }
  .footer { margin-top: 20px; display: flex; justify-content: space-between; font-size: 11px; color: #516F90; padding-top: 16px; border-top: 1px solid #DFE3EB; }
  @media print { body { background: white; padding: 0; } .body { box-shadow: none; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="header-title">Estrategia SEO — ${sitio}</div>
      <div class="header-sub">Generada el ${fecha} · Certificación SEO, HubSpot Academy</div>
    </div>
    <div class="badge">HUBSPOT ACADEMY</div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-label">Perfil del sitio</div>
      <div class="grid-2">
        <div class="info-item"><div class="info-label">Sitio web</div><div class="info-value">${sitio}</div></div>
        <div class="info-item"><div class="info-label">Industria</div><div class="info-value">${industria}</div></div>
        <div class="info-item"><div class="info-label">Nivel de autoridad SEO</div><div class="info-value">${nivelLabel}</div></div>
        <div class="info-item"><div class="info-label">Plazo de la estrategia</div><div class="info-value">${plazo}</div></div>
      </div>
      <div class="pilar-box">💡 ${nivelPilar}</div>
    </div>

    <div class="section">
      <div class="section-label">Objetivo SMART</div>
      <div class="objetivo-box">
        <div class="objetivo-text">"${objetivo}"</div>
        <div class="plazo">⏱ Plazo: ${plazo}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">KPIs seleccionados</div>
      <div class="kpi-list">${kpiLabels.map(k => `<span class="kpi-tag">${k}</span>`).join("")}</div>
    </div>

    <div class="section">
      <div class="section-label">Estrategias prioritarias</div>
      ${estrategias.map((e, i) => `<div class="estrategia-item"><div class="num">${i + 1}</div><div class="estrategia-text">${e}</div></div>`).join("")}
    </div>

    <div class="reminder">
      <div class="reminder-title">Recuerda</div>
      <div class="reminder-text">El SEO es un proceso continuo y acumulativo. No existe una fórmula mágica — los resultados pueden tardar semanas o meses en aparecer. Revisa tus KPIs con regularidad, ajusta tus estrategias según los datos y mantén el enfoque en tus usuarios. A medida que tu sitio crece y genera más autoridad, el efecto se acelera.</div>
    </div>

    <div class="footer">
      <span>HubSpot Academy · Certificación SEO</span>
      <span>${sitio} · ${fecha}</span>
    </div>
  </div>
</div>
</body>
</html>`;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    sitio: "", industria: "", autoridad: "",
    objetivo: "", plazo: "12 meses", kpis: [], estrategias: [],
  });
  const [done, setDone] = useState(false);

  const update = (field, val) => setData(prev => ({ ...prev, [field]: val }));

  const toggleKpi = (id) => setData(prev => ({
    ...prev,
    kpis: prev.kpis.includes(id)
      ? prev.kpis.filter(k => k !== id)
      : prev.kpis.length < 4 ? [...prev.kpis, id] : prev.kpis,
  }));

  const toggleEstrategia = (e) => setData(prev => ({
    ...prev,
    estrategias: prev.estrategias.includes(e)
      ? prev.estrategias.filter(x => x !== e)
      : [...prev.estrategias, e],
  }));

  const canNext = () => {
    if (step === 0) return data.sitio.trim().length > 0 && data.industria;
    if (step === 1) return data.autoridad;
    if (step === 2) return data.objetivo.trim().length >= 20;
    if (step === 3) return data.kpis.length >= 1;
    if (step === 4) return data.estrategias.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (step === steps.length - 1) { setDone(true); return; }
    setStep(s => s + 1);
  };

  const downloadHTML = () => {
    const html = generateHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estrategia-seo-${data.sitio.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setDone(false);
    setStep(0);
    setData({ sitio: "", industria: "", autoridad: "", objetivo: "", plazo: "12 meses", kpis: [], estrategias: [] });
  };

  if (done) return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", background: "white", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎯</div>
        <h2 style={{ color: COLORS.navy, margin: "0 0 12px", fontSize: 22 }}>Tu estrategia SEO está lista</h2>
        <p style={{ color: COLORS.slate, lineHeight: 1.7, margin: "0 0 24px", fontSize: 14 }}>
          Definiste tu objetivo SMART, seleccionaste tus KPIs y priorizaste las estrategias más relevantes para el nivel de autoridad de tu sitio. Descarga tu estrategia para consultarla cuando la necesites.
        </p>
        <div style={{ background: COLORS.light, borderRadius: 10, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.orange, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Resumen</div>
          <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 2 }}>
            <div>🌐 <strong>Sitio:</strong> {data.sitio}</div>
            <div>📊 <strong>Autoridad:</strong> {nivelesAutoridad.find(n => n.id === data.autoridad)?.label}</div>
            <div>🎯 <strong>Objetivo:</strong> {data.objetivo.length > 60 ? data.objetivo.slice(0, 60) + "..." : data.objetivo}</div>
            <div>📈 <strong>KPIs:</strong> {data.kpis.length} seleccionados · <strong>Estrategias:</strong> {data.estrategias.length} priorizadas</div>
          </div>
        </div>
        <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: COLORS.slate, lineHeight: 1.6, textAlign: "left" }}>
          <strong style={{ color: COLORS.teal }}>Próximo paso:</strong> Comparte esta estrategia con tu equipo, establece una fecha de revisión mensual de tus KPIs y recuerda que el SEO es acumulativo — los resultados mejoran con consistencia.
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={downloadHTML}
            style={{ background: COLORS.teal, color: "white", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            ⬇️ Descargar estrategia
          </button>
          <button onClick={reset}
            style={{ background: COLORS.light, color: COLORS.slate, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Crear otra estrategia
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light }}>
      <div style={{ background: COLORS.navy, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: COLORS.orange, borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>HUBSPOT ACADEMY</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "white" }}>Generador de Estrategia SEO</span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Paso {step + 1} de {steps.length}</span>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 99, background: i <= step ? COLORS.orange : COLORS.border, transition: "background 0.3s" }} />
              <div style={{ fontSize: 10, color: i <= step ? COLORS.orange : COLORS.slate, fontWeight: i === step ? 700 : 400, marginTop: 4, textAlign: "center" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Paso 0 — Tu sitio web */}
        {step === 0 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Cuéntanos sobre tu sitio</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>
              Piensa en tu sitio web como una casa dentro de una gran ciudad. Para definir tu estrategia SEO, primero necesitamos entender en qué parte de esa ciudad estás y a qué audiencia le hablas.
            </p>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Nombre o URL de tu sitio *</label>
              <input value={data.sitio} onChange={e => update("sitio", e.target.value)}
                placeholder="ej: miblog.com o Nombre de tu empresa"
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 7, fontSize: 14, color: COLORS.text, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 8 }}>¿En qué industria opera tu sitio? *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {industrias.map(ind => (
                  <button key={ind} onClick={() => update("industria", ind)}
                    style={{ padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${data.industria === ind ? COLORS.orange : COLORS.border}`, background: data.industria === ind ? COLORS.orange : "white", color: data.industria === ind ? "white" : COLORS.slate, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Paso 1 — Autoridad SEO */}
        {step === 1 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>¿Cuál es tu nivel de autoridad SEO?</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
              La autoridad SEO se determina principalmente por la calidad y cantidad de enlaces externos que apuntan a tu sitio — como las citas en otros libros que le dan credibilidad al tuyo.
            </p>
            <div style={{ background: "#F0F7FF", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: COLORS.navy }}>
              💡 Si no estás seguro de tu nivel de autoridad, puedes medirlo con herramientas gratuitas como Moz, SEMrush o Ahrefs analizando tu perfil de enlaces externos.
            </div>
            {nivelesAutoridad.map(n => (
              <div key={n.id} onClick={() => update("autoridad", n.id)}
                style={{ padding: "14px 16px", border: `1.5px solid ${data.autoridad === n.id ? COLORS.orange : COLORS.border}`, borderRadius: 9, marginBottom: 10, cursor: "pointer", background: data.autoridad === n.id ? "#FFF5F2" : "white" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy, marginBottom: 3 }}>{n.label}</div>
                <div style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.5 }}>{n.desc}</div>
                {data.autoridad === n.id && (
                  <div style={{ marginTop: 10, fontSize: 13, color: COLORS.navy, background: "#F0F7FF", borderRadius: 6, padding: "8px 12px", lineHeight: 1.6 }}>
                    🎯 {n.pilar}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Paso 2 — Objetivo SMART */}
        {step === 2 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Define tu objetivo SMART</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>
              Un objetivo SMART es específico, medible, alcanzable, relevante y limitado en el tiempo. Sin objetivos claros, no podrás saber si tus iniciativas de SEO realmente están dando resultados.
            </p>
            <div style={{ background: COLORS.light, borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.orange, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Ejemplo de objetivo SMART</div>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7, fontStyle: "italic" }}>
                "Quiero aumentar el tráfico orgánico de mi sitio en un 40% en los próximos 12 meses, publicando dos artículos optimizados por semana sobre las palabras clave principales de mi industria."
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Tu objetivo SEO *</label>
              <textarea value={data.objetivo} onChange={e => update("objetivo", e.target.value)}
                placeholder="Escribe tu objetivo específico aquí..."
                rows={4}
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${data.objetivo.length >= 20 ? COLORS.teal : COLORS.border}`, borderRadius: 7, fontSize: 14, color: COLORS.text, boxSizing: "border-box", resize: "vertical" }} />
              <div style={{ fontSize: 12, color: data.objetivo.length >= 20 ? COLORS.teal : COLORS.slate, marginTop: 4 }}>
                {data.objetivo.length >= 20 ? "✓ Objetivo listo" : `Sé específico — mínimo 20 caracteres (${data.objetivo.length}/20)`}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 8 }}>Plazo para alcanzarlo</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {plazoOptions.map(p => (
                  <button key={p} onClick={() => update("plazo", p)}
                    style={{ padding: "8px 18px", borderRadius: 20, border: `1.5px solid ${data.plazo === p ? COLORS.orange : COLORS.border}`, background: data.plazo === p ? COLORS.orange : "white", color: data.plazo === p ? "white" : COLORS.slate, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Paso 3 — KPIs */}
        {step === 3 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Selecciona tus KPIs</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
              Los KPIs son los indicadores que te dirán si tu estrategia SEO está dando resultados. Elige entre 1 y 4 indicadores que estén directamente relacionados con tu objetivo.
            </p>
            <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: COLORS.slate }}>
              💡 Los KPIs deben alinearse con tu objetivo SMART. Si quieres aumentar el tráfico orgánico, el indicador de tráfico orgánico debe estar en tu lista.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {kpisDisponibles.map(k => {
                const sel = data.kpis.includes(k.id);
                return (
                  <div key={k.id} onClick={() => toggleKpi(k.id)}
                    style={{ padding: "13px 16px", border: `1.5px solid ${sel ? COLORS.teal : COLORS.border}`, borderRadius: 9, cursor: "pointer", background: sel ? "#E8F8F6" : "white", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? COLORS.teal : COLORS.border}`, background: sel ? COLORS.teal : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {sel && <span style={{ color: "white", fontSize: 12, fontWeight: 800 }}>✓</span>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{k.label}</div>
                      <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2, lineHeight: 1.5 }}>{k.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 10 }}>{data.kpis.length}/4 KPIs seleccionados</div>
          </div>
        )}

        {/* Paso 4 — Estrategias */}
        {step === 4 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Prioriza tus estrategias</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 6px", lineHeight: 1.6 }}>
              Con base en tu nivel de autoridad <strong>{nivelesAutoridad.find(n => n.id === data.autoridad)?.label?.toLowerCase()}</strong>, estas son las estrategias más recomendadas para {data.sitio}. Selecciona las que vas a implementar en el plazo de {data.plazo}.
            </p>
            <div style={{ background: COLORS.light, borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: COLORS.slate }}>
              💡 Elige entre 3 y 5 estrategias. Es mejor ejecutar pocas cosas bien que dispersar tus recursos en demasiadas iniciativas a la vez.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(estrategiasPorNivel[data.autoridad] || []).map((e, i) => {
                const sel = data.estrategias.includes(e);
                return (
                  <div key={i} onClick={() => toggleEstrategia(e)}
                    style={{ padding: "13px 16px", border: `1.5px solid ${sel ? COLORS.orange : COLORS.border}`, borderRadius: 9, cursor: "pointer", background: sel ? "#FFF5F2" : "white", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? COLORS.orange : COLORS.border}`, background: sel ? COLORS.orange : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      {sel && <span style={{ color: "white", fontSize: 12, fontWeight: 800 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>{e}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navegación */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)}
              style={{ padding: "10px 20px", background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 7, color: COLORS.slate, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              ← Anterior
            </button>
          ) : <div />}
          <button onClick={handleNext} disabled={!canNext()}
            style={{ padding: "11px 28px", background: canNext() ? COLORS.orange : COLORS.border, border: "none", borderRadius: 7, color: canNext() ? "white" : COLORS.slate, fontWeight: 700, fontSize: 14, cursor: canNext() ? "pointer" : "not-allowed" }}>
            {step === steps.length - 1 ? "Ver mi estrategia →" : "Siguiente →"}
          </button>
        </div>
      </div>
    </div>
  );
}
