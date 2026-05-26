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

const steps = ["Diagnóstico", "Objetivos", "KPIs", "Estrategias", "Resultado"];

const industrias = ["E-commerce", "Servicios profesionales", "Educación", "Salud y bienestar", "Tecnología", "Medios y entretenimiento", "Otro"];
const nivelesAutoridad = [
  { id: "bajo", label: "Bajo", desc: "Pocos o ningún enlace externo. Sitio relativamente nuevo." },
  { id: "medio", label: "Medio", desc: "Algunos enlaces externos. Presencia establecida pero limitada." },
  { id: "alto", label: "Alto", desc: "Muchos enlaces externos de calidad. Reconocido en la industria." },
];
const recursos = [
  { id: "limitado", label: "Limitado", desc: "Menos de 5 horas/semana para SEO." },
  { id: "moderado", label: "Moderado", desc: "Entre 5 y 15 horas/semana para SEO." },
  { id: "amplio", label: "Amplio", desc: "Más de 15 horas/semana o equipo dedicado." },
];
const kpisDisponibles = [
  { id: "trafico", label: "Tráfico orgánico", desc: "Visitas provenientes de búsqueda sin pago." },
  { id: "palabras", label: "Clasificación de palabras clave", desc: "Posición de tus términos en resultados de búsqueda." },
  { id: "conversion", label: "Tasa de conversión", desc: "Porcentaje de visitantes que completan una acción." },
  { id: "rebote", label: "Tasa de rebote", desc: "Visitantes que salen sin interactuar con el sitio." },
  { id: "carga", label: "Tiempo de carga", desc: "Velocidad con que carga tu sitio web." },
  { id: "enlaces", label: "Enlaces externos recibidos", desc: "Sitios que enlazan al tuyo como referencia." },
];

const estrategiasPorNivel = {
  bajo: [
    "Crear contenido de blog regularmente sobre tus palabras clave principales",
    "Optimizar los títulos y meta descripciones de tus páginas existentes",
    "Asegurarte de que tu sitio sea rastreable e indexable por Google",
    "Construir tu perfil de enlaces con directorios y menciones básicas",
    "Optimizar la velocidad de carga de tu sitio",
  ],
  medio: [
    "Desarrollar una estrategia de contenido pillar-cluster para ganar autoridad temática",
    "Buscar oportunidades de guest posting en sitios de tu industria",
    "Auditar y mejorar el contenido existente que ya tiene tráfico",
    "Construir enlaces internos estratégicos entre tus páginas",
    "Optimizar para búsqueda local si aplica a tu negocio",
  ],
  alto: [
    "Defender y expandir las clasificaciones existentes con contenido actualizado",
    "Crear contenido de investigación original que genere enlaces naturalmente",
    "Explorar oportunidades de Featured Snippets y rich results",
    "Optimizar para búsquedas de intención transaccional de alto valor",
    "Desarrollar una estrategia de relaciones públicas digitales para amplificar la autoridad",
  ],
};

function generateHTML(data) {
  const { sitio, industria, autoridad, recurso, objetivo, plazo, kpis, estrategias } = data;
  const fecha = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  const nivelLabel = nivelesAutoridad.find(n => n.id === autoridad)?.label || "";
  const recursoLabel = recursos.find(r => r.id === recurso)?.label || "";
  const kpiLabels = kpis.map(k => kpisDisponibles.find(d => d.id === k)?.label || k);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Estrategia SEO — ${sitio}</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #F5F8FA; margin: 0; padding: 32px; color: #33475B; }
  .card { background: white; border-radius: 12px; padding: 40px; max-width: 760px; margin: 0 auto; box-shadow: 0 2px 16px rgba(0,0,0,0.08); }
  .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #FF7A59; }
  .brand { background: #FF7A59; color: white; font-weight: 800; font-size: 11px; letter-spacing: 1px; padding: 6px 12px; border-radius: 6px; }
  .title { font-size: 22px; font-weight: 800; color: #1C3A56; margin: 0 0 4px; }
  .subtitle { font-size: 14px; color: #516F90; margin: 0; }
  .section { margin-bottom: 28px; }
  .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #FF7A59; margin-bottom: 12px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .item { background: #F5F8FA; border-radius: 8px; padding: 12px 16px; }
  .item-label { font-size: 11px; color: #516F90; font-weight: 600; margin-bottom: 4px; }
  .item-value { font-size: 14px; color: #1C3A56; font-weight: 600; }
  .objetivo-box { background: #FFF5F2; border-left: 4px solid #FF7A59; border-radius: 0 8px 8px 0; padding: 16px 20px; }
  .objetivo-text { font-size: 15px; color: #1C3A56; font-weight: 600; line-height: 1.5; }
  .kpi-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .kpi-tag { background: #E8F8F6; color: #00BDA5; border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 600; }
  .estrategia-item { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #F5F8FA; }
  .estrategia-num { background: #FF7A59; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .estrategia-text { font-size: 14px; color: #33475B; line-height: 1.5; }
  .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #DFE3EB; display: flex; justify-content: space-between; align-items: center; }
  .footer-text { font-size: 12px; color: #516F90; }
  .tip { background: #F0FDF4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #516F90; line-height: 1.6; }
  .tip strong { color: #00BDA5; }
  @media print { body { background: white; padding: 0; } .card { box-shadow: none; } }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div>
      <p class="title">Estrategia SEO</p>
      <p class="subtitle">${sitio} · Generado el ${fecha}</p>
    </div>
    <div class="brand">HUBSPOT ACADEMY</div>
  </div>

  <div class="section">
    <div class="section-title">Perfil del sitio</div>
    <div class="grid">
      <div class="item"><div class="item-label">Sitio web</div><div class="item-value">${sitio}</div></div>
      <div class="item"><div class="item-label">Industria</div><div class="item-value">${industria}</div></div>
      <div class="item"><div class="item-label">Nivel de autoridad SEO</div><div class="item-value">${nivelLabel}</div></div>
      <div class="item"><div class="item-label">Recursos disponibles</div><div class="item-value">${recursoLabel}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Objetivo SMART</div>
    <div class="objetivo-box">
      <div class="objetivo-text">"${objetivo}"</div>
      <div style="margin-top:8px;font-size:12px;color:#516F90;">Plazo: ${plazo}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">KPIs seleccionados</div>
    <div class="kpi-grid">${kpiLabels.map(k => `<span class="kpi-tag">${k}</span>`).join("")}</div>
  </div>

  <div class="section">
    <div class="section-title">Estrategias prioritarias</div>
    ${estrategias.map((e, i) => `<div class="estrategia-item"><div class="estrategia-num">${i + 1}</div><div class="estrategia-text">${e}</div></div>`).join("")}
  </div>

  <div class="tip">
    <strong>Recuerda:</strong> El SEO es una estrategia acumulativa. Los resultados pueden tardar semanas o meses en aparecer. Revisa tus KPIs mensualmente y ajusta tus estrategias según los datos que obtengas.
  </div>

  <div class="footer">
    <div class="footer-text">HubSpot Academy · Certificación SEO</div>
    <div class="footer-text">Para imprimir como PDF: Ctrl+P → Guardar como PDF</div>
  </div>
</div>
</body>
</html>`;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    sitio: "", industria: "", autoridad: "", recurso: "",
    objetivo: "", plazo: "12 meses", kpis: [], estrategias: [],
  });
  const [done, setDone] = useState(false);

  const update = (field, val) => setData(prev => ({ ...prev, [field]: val }));
  const toggleKpi = (id) => setData(prev => ({
    ...prev,
    kpis: prev.kpis.includes(id) ? prev.kpis.filter(k => k !== id) : prev.kpis.length < 4 ? [...prev.kpis, id] : prev.kpis,
  }));

  const canNext = () => {
    if (step === 0) return data.sitio && data.industria && data.autoridad && data.recurso;
    if (step === 1) return data.objetivo.length >= 20;
    if (step === 2) return data.kpis.length >= 1;
    if (step === 3) return data.estrategias.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (step === 2 && data.estrategias.length === 0) {
      const sugeridas = estrategiasPorNivel[data.autoridad]?.slice(0, 3) || [];
      setData(prev => ({ ...prev, estrategias: sugeridas }));
    }
    if (step === steps.length - 1) { setDone(true); return; }
    setStep(s => s + 1);
  };

  const toggleEstrategia = (e) => setData(prev => ({
    ...prev,
    estrategias: prev.estrategias.includes(e) ? prev.estrategias.filter(x => x !== e) : [...prev.estrategias, e],
  }));

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

  if (done) return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", background: "white", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
        <h2 style={{ color: COLORS.teal, margin: "0 0 12px", fontSize: 22 }}>¡Tu estrategia SEO está lista!</h2>
        <p style={{ color: COLORS.slate, lineHeight: 1.7, margin: "0 0 24px", fontSize: 15 }}>
          Descarga tu estrategia como página web con branding. Puedes abrirla en cualquier navegador e imprimirla como PDF con Ctrl+P.
        </p>
        <div style={{ background: COLORS.light, borderRadius: 10, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>Resumen de tu estrategia</div>
          <div style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.8 }}>
            <div>🌐 <strong>Sitio:</strong> {data.sitio}</div>
            <div>🎯 <strong>Objetivo:</strong> {data.objetivo}</div>
            <div>📊 <strong>KPIs:</strong> {data.kpis.length} seleccionados</div>
            <div>⚡ <strong>Estrategias:</strong> {data.estrategias.length} priorizadas</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={downloadHTML}
            style={{ background: COLORS.teal, color: "white", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            ⬇️ Descargar estrategia
          </button>
          <button onClick={() => { setDone(false); setStep(0); setData({ sitio: "", industria: "", autoridad: "", recurso: "", objetivo: "", plazo: "12 meses", kpis: [], estrategias: [] }); }}
            style={{ background: COLORS.orange, color: "white", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Crear otra estrategia
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: COLORS.light }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: `1px solid ${COLORS.border}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: COLORS.orange, borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>HUBSPOT ACADEMY</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy }}>Generador de Estrategia SEO</span>
        </div>
        <span style={{ fontSize: 13, color: COLORS.slate }}>Paso {step + 1} de {steps.length}</span>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 99, background: i <= step ? COLORS.orange : COLORS.border, transition: "background 0.3s" }} />
              <div style={{ fontSize: 10, color: i <= step ? COLORS.orange : COLORS.slate, fontWeight: i === step ? 700 : 400, marginTop: 4, textAlign: "center" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Step 0 — Diagnóstico */}
        {step === 0 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Cuéntanos sobre tu sitio</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 24px" }}>Esta información nos ayudará a personalizar tu estrategia SEO.</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Nombre o URL de tu sitio web *</label>
              <input value={data.sitio} onChange={e => update("sitio", e.target.value)} placeholder="ejemplo: miblog.com o Mi Empresa"
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 7, fontSize: 14, color: COLORS.text, boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Industria *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {industrias.map(ind => (
                  <button key={ind} onClick={() => update("industria", ind)}
                    style={{ padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${data.industria === ind ? COLORS.orange : COLORS.border}`, background: data.industria === ind ? COLORS.orange : "white", color: data.industria === ind ? "white" : COLORS.slate, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Nivel de autoridad SEO actual *</label>
              {nivelesAutoridad.map(n => (
                <div key={n.id} onClick={() => update("autoridad", n.id)}
                  style={{ padding: "12px 16px", border: `1.5px solid ${data.autoridad === n.id ? COLORS.orange : COLORS.border}`, borderRadius: 8, marginBottom: 8, cursor: "pointer", background: data.autoridad === n.id ? "#FFF5F2" : "white" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{n.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>{n.desc}</div>
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Recursos disponibles para SEO *</label>
              {recursos.map(r => (
                <div key={r.id} onClick={() => update("recurso", r.id)}
                  style={{ padding: "12px 16px", border: `1.5px solid ${data.recurso === r.id ? COLORS.orange : COLORS.border}`, borderRadius: 8, marginBottom: 8, cursor: "pointer", background: data.recurso === r.id ? "#FFF5F2" : "white" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{r.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Objetivo SMART */}
        {step === 1 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Define tu objetivo SMART</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 20px" }}>Un objetivo SMART es específico, medible, alcanzable, relevante y limitado en el tiempo.</p>

            <div style={{ background: COLORS.light, borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, marginBottom: 4 }}>EJEMPLO</div>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>
                "Quiero aumentar el tráfico orgánico de mi sitio en un 40% en los próximos 12 meses publicando dos artículos optimizados por semana."
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 6 }}>Tu objetivo SEO *</label>
              <textarea value={data.objetivo} onChange={e => update("objetivo", e.target.value)}
                placeholder="Escribe tu objetivo específico aquí..."
                rows={4}
                style={{ width: "100%", padding: "10px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 7, fontSize: 14, color: COLORS.text, boxSizing: "border-box", resize: "vertical" }} />
              <div style={{ fontSize: 12, color: data.objetivo.length >= 20 ? COLORS.teal : COLORS.slate, marginTop: 4 }}>
                {data.objetivo.length >= 20 ? "✓ Objetivo válido" : `Mínimo 20 caracteres (${data.objetivo.length}/20)`}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.slate, display: "block", marginBottom: 8 }}>Plazo para alcanzarlo</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["3 meses", "6 meses", "12 meses", "18 meses"].map(p => (
                  <button key={p} onClick={() => update("plazo", p)}
                    style={{ padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${data.plazo === p ? COLORS.orange : COLORS.border}`, background: data.plazo === p ? COLORS.orange : "white", color: data.plazo === p ? "white" : COLORS.slate, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — KPIs */}
        {step === 2 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Selecciona tus KPIs</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 20px" }}>Elige entre 1 y 4 indicadores clave que te ayudarán a medir el progreso hacia tu objetivo.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {kpisDisponibles.map(k => {
                const selected = data.kpis.includes(k.id);
                return (
                  <div key={k.id} onClick={() => toggleKpi(k.id)}
                    style={{ padding: "14px 16px", border: `1.5px solid ${selected ? COLORS.teal : COLORS.border}`, borderRadius: 9, cursor: "pointer", background: selected ? "#E8F8F6" : "white", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected ? COLORS.teal : COLORS.border}`, background: selected ? COLORS.teal : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {selected && <span style={{ color: "white", fontSize: 13, fontWeight: 800 }}>✓</span>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.navy }}>{k.label}</div>
                      <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>{k.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 12 }}>
              {data.kpis.length}/4 KPIs seleccionados
            </div>
          </div>
        )}

        {/* Step 3 — Estrategias */}
        {step === 3 && (
          <div style={{ background: "white", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>Prioriza tus estrategias</h2>
            <p style={{ color: COLORS.slate, fontSize: 14, margin: "0 0 8px" }}>
              Basado en tu nivel de autoridad <strong>{nivelesAutoridad.find(n => n.id === data.autoridad)?.label}</strong>, estas son las estrategias más recomendadas. Selecciona las que vas a implementar.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {(estrategiasPorNivel[data.autoridad] || []).map((e, i) => {
                const selected = data.estrategias.includes(e);
                return (
                  <div key={i} onClick={() => toggleEstrategia(e)}
                    style={{ padding: "14px 16px", border: `1.5px solid ${selected ? COLORS.orange : COLORS.border}`, borderRadius: 9, cursor: "pointer", background: selected ? "#FFF5F2" : "white", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected ? COLORS.orange : COLORS.border}`, background: selected ? COLORS.orange : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      {selected && <span style={{ color: "white", fontSize: 12, fontWeight: 800 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.5 }}>{e}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
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
