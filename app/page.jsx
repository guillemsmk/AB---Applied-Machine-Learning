"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadModel, predict } from "@/lib/predict";

function ProbBar({ label, prob }) {
  const pct = Math.round(prob * 1000) / 10; // 1 decimal
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--text)", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ marginTop: 6, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.min(100, Math.max(0, pct))}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  const imgRef = useRef(null);

  const [labels, setLabels] = useState(["WithMask", "WithoutMask"]);
  const [status, setStatus] = useState("Cargando modelo…");
  const [busy, setBusy] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const best = useMemo(() => {
    if (!result) return null;
    const sorted = [...result.probs].sort((a, b) => b.prob - a.prob);
    return sorted[0];
  }, [result]);

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("/model/labels.json");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length === 2) setLabels(data);
        }
        await loadModel();
        setStatus("Modelo listo. Sube una imagen.");
      } catch (e) {
        console.error(e);
        setStatus("Error cargando el modelo. Revisa la consola.");
      }
    }
    init();
  }, []);

  function onFileChange(e) {
    setResult(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStatus("Imagen lista. Pulsa “Analizar”.");
  }

  async function onPredict() {
    if (!imgRef.current) return;
    setBusy(true);
    setStatus("Analizando…");
    try {
      const r = await predict(imgRef.current, labels);
      setResult(r);
      setStatus("Hecho.");
    } catch (e) {
      console.error(e);
      setStatus("Error en predicción. Revisa la consola.");
    } finally {
      setBusy(false);
    }
  }

  function onClear() {
    setResult(null);
    setPreviewUrl(null);
    setStatus("Modelo listo. Sube una imagen.");
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 16px 64px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, letterSpacing: -0.5 }}>Mask Detector</h1>
          <p style={{ marginTop: 8, marginBottom: 0, color: "var(--muted)" }}>
            Detecta si una persona lleva mascarilla usando TensorFlow.js (inferencia en el navegador).
          </p>
        </div>
        <span style={{ padding: "8px 10px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: `1px solid var(--cardBorder)`, color: "var(--muted)", fontSize: 13 }}>
          Estado: <span style={{ color: "var(--text)", fontWeight: 700 }}>{status}</span>
        </span>
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18, marginTop: 22 }}>
        {/* Left card */}
        <section
          style={{
            borderRadius: 18,
            background: "var(--card)",
            border: `1px solid var(--cardBorder)`,
            padding: 18,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                border: `1px solid var(--cardBorder)`,
                background: "rgba(255,255,255,0.06)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span style={{ fontWeight: 700 }}>Subir imagen</span>
              <input type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onPredict}
                disabled={!previewUrl || busy}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "none",
                  cursor: !previewUrl || busy ? "not-allowed" : "pointer",
                  background: !previewUrl || busy ? "rgba(255,255,255,0.12)" : "linear-gradient(90deg, var(--accent), var(--accent2))",
                  color: "white",
                  fontWeight: 800,
                }}
              >
                {busy ? "Analizando…" : "Analizar"}
              </button>

              <button
                onClick={onClear}
                disabled={!previewUrl || busy}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: `1px solid var(--cardBorder)`,
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--text)",
                  cursor: !previewUrl || busy ? "not-allowed" : "pointer",
                  fontWeight: 700,
                }}
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              marginTop: 14,
              borderRadius: 16,
              border: `1px dashed rgba(255,255,255,0.18)`,
              background: "rgba(0,0,0,0.18)",
              minHeight: 420,
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            {!previewUrl ? (
              <div style={{ textAlign: "center", padding: 24, color: "var(--muted)" }}>
                <div style={{ fontSize: 14, marginBottom: 6 }}>Sube una imagen para empezar</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Formatos: JPG/PNG. Recomendado: rostro centrado.</div>
              </div>
            ) : (
              <img
                ref={imgRef}
                src={previewUrl}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onLoad={() => setStatus("Imagen lista. Pulsa “Analizar”.")}
              />
            )}
          </div>

          <p style={{ marginTop: 12, marginBottom: 0, fontSize: 12, color: "var(--muted)" }}>
            El modelo se carga desde <code style={{ padding: "2px 6px", borderRadius: 8, background: "rgba(255,255,255,0.08)" }}>/public/model</code>.
          </p>
        </section>

        {/* Right card */}
        <aside
          style={{
            borderRadius: 18,
            background: "var(--card)",
            border: `1px solid var(--cardBorder)`,
            padding: 18,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, color: "var(--muted)", fontWeight: 700 }}>Resultado</h2>

          {!result ? (
            <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13, lineHeight: 1.5 }}>
              Aún no hay predicción. Sube una imagen y pulsa <b>Analizar</b>.
            </div>
          ) : (
            <>
              <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: `1px solid var(--cardBorder)` }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Predicción principal</div>
                <div style={{ marginTop: 6, fontSize: 22, fontWeight: 900, letterSpacing: -0.3 }}>
                  {result.label}
                </div>
                {best && (
                  <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
                    Confianza: <b style={{ color: "var(--text)" }}>{(best.prob * 100).toFixed(2)}%</b>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12 }}>
                {result.probs.map((p) => (
                  <ProbBar key={p.label} label={p.label} prob={p.prob} />
                ))}
              </div>

              <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.08)` }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Notas</div>
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18, color: "var(--muted)", fontSize: 12, lineHeight: 1.5 }}>
                  <li>En imágenes borrosas u ocluidas puede bajar la fiabilidad.</li>
                  <li>La inferencia ocurre localmente en tu dispositivo.</li>
                </ul>
              </div>
            </>
          )}
        </aside>
      </div>

      <footer style={{ marginTop: 18, color: "var(--muted)", fontSize: 12 }}>
        Proyecto AB · Applied ML · Modelo MobileNetV2 + TFJS
      </footer>
    </main>
  );
}
