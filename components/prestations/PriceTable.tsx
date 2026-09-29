"use client";

import { useState } from "react";
import { eur } from "@/lib/content";
import { FD } from "@/components/ks/ui";

const COLS = "minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr) minmax(0,0.8fr)";

type Props = {
  /** Nom du tableau pour les technologies d'assistance. */
  label: string;
  /** Prix unitaire selon la quantité : index 0 = 1 unité … dernier index = meilleur prix. */
  grid: readonly number[];
  /** Économie (%) pour chaque quantité. */
  save: readonly number[];
  /** Unité au singulier : « vidéo », « planche ». */
  unit: string;
  /** Dégradé des pastilles de quantité (ligne choisie et meilleur prix). */
  grad: string;
  /** Fond de la ligne choisie. */
  tint: string;
  /** Couleur d'accent : en-tête « Quantité », pastilles, étiquette « Meilleur prix ». */
  ink: string;
  /** Fond de l'étiquette « Meilleur prix ». */
  bestBg: string;
  /** Dégradé des totaux. */
  totalGrad: string;
};

/**
 * Grille dégressive : une ligne par quantité ; un clic met la ligne en évidence (meilleur prix au départ).
 * La structure de tableau est conservée : chaque ligne porte un bouton transparent qui la couvre entièrement.
 */
export default function PriceTable({ label, grid, save, unit, grad, tint, ink, bestBg, totalGrad }: Props) {
  const [sel, setSel] = useState(grid.length);

  return (
    <div role="table" aria-label={label} style={{ display: "grid" }}>
      <div
        role="row"
        className="pt-row pt-head"
        style={{
          display: "grid",
          gridTemplateColumns: COLS,
          gap: 10,
          padding: "10px 12px",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#525B70",
          borderBottom: "1px solid #ECEEF4",
        }}
      >
        <span role="columnheader" style={{ color: ink }}>
          Quantité
        </span>
        <span role="columnheader" style={{ textAlign: "right" }}>
          Prix / {unit}
        </span>
        <span role="columnheader" style={{ textAlign: "right" }}>
          Total
        </span>
        <span role="columnheader" style={{ textAlign: "right" }}>
          Économie
        </span>
      </div>
      {grid.map((p, i) => {
        const n = i + 1;
        const on = sel === n;
        const best = n === grid.length;
        const units = unit + (n > 1 ? "s" : "");
        return (
          <div
            key={n}
            role="row"
            className="pt-row"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: COLS,
              gap: 10,
              alignItems: "center",
              padding: "11px 12px",
              borderBottom: "1px solid #F1F2F6",
              borderRadius: 12,
              background: on ? tint : "transparent",
              fontSize: 15,
              color: "#151827",
            }}
          >
            <span role="cell" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 10px" }}>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${n} ${units}`}
                onClick={() => setSel(n)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  margin: 0,
                  padding: 0,
                  border: 0,
                  borderRadius: 12,
                  background: "transparent",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 13,
                  background: on || best ? grad : "#F3F4F8",
                  color: on || best ? "#FFFFFF" : ink,
                }}
              >
                {n}
              </span>
              <span aria-hidden="true" className="pt-unit" style={{ color: "#525B70" }}>
                {units}
              </span>
              {best && (
                <span style={{ padding: "2px 8px", borderRadius: 999, background: bestBg, color: ink, fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  ★ Meilleur prix
                </span>
              )}
            </span>
            <span role="cell" style={{ textAlign: "right", color: "#525B70", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              {eur(p)}
            </span>
            <span
              role="cell"
              className="grad-text pt-total"
              style={{ textAlign: "right", fontFamily: FD, fontWeight: 600, fontSize: 16, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", backgroundImage: totalGrad }}
            >
              {eur(p * n)}
            </span>
            <span role="cell" style={{ textAlign: "right" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  borderRadius: 8,
                  background: i ? "#DCFCE7" : "transparent",
                  color: i ? "#166534" : "#8A90A0",
                  fontSize: 13,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {i ? `−${save[i]} %` : "—"}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
