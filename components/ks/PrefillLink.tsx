"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { prefillContact, prefillFormula, type ContactPrefill } from "@/lib/forms";

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
  /** Pré-remplit le formulaire de contact de l'accueil. */
  contact?: ContactPrefill;
  /** Pré-sélectionne la formule dans la liste d'attente des formations. */
  formula?: string;
};

/** Lien interne qui pré-remplit un formulaire avant de s'y rendre. */
export default function PrefillLink({ href, className, style, children, contact, formula, "aria-label": ariaLabel }: Props) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={() => {
        if (contact) {
          prefillContact(contact);
        }
        if (formula) {
          prefillFormula(formula);
        }
      }}
    >
      {children}
    </Link>
  );
}
