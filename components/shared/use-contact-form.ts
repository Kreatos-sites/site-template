"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { contactSchema, type ContactPayload } from "@/lib/contact-schema";

/**
 * Lógica HEADLESS del formulario de contacto (sin markup): react-hook-form +
 * zodResolver con el schema COMPARTIDO (el server valida con el mismo), submit
 * a /api/contact, toasts de éxito/error, y helpers de error/aria por campo. La
 * sección custom cablea SUS propios inputs y labels a estos primitivos — el
 * diseño del form es único por sitio, la plomería (validación + submit +
 * estados) es compartida y ya probada.
 *
 * Regla dura para el site-builder: NUNCA reimplementes fetch("/api/contact") a
 * mano ni el schema; usa este hook.
 */
export function useContactForm(ns: string = "contact.form") {
  const t = useTranslations(ns);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  // `onSubmit` ya viene envuelto en handleSubmit: la sección lo pasa directo a
  // <form onSubmit={onSubmit}>.
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(t("success"));
      reset();
    } catch {
      // Reintentable: el form conserva los valores; basta volver a enviar.
      toast.error(t("error"));
    }
  });

  /** id estable del <p> de error de un campo (para aria-describedby). */
  const errorId = (key: keyof ContactPayload) => `contact-${key}-error`;

  /** Texto traducido del error de un campo, o null si el campo es válido. */
  const errorText = (key: keyof ContactPayload) => {
    const messageKey = errors[key]?.message;
    return messageKey ? t(`errors.${messageKey}`) : null;
  };

  /** Props aria del input: invalid + describedby apuntando a su <p> de error. */
  const ariaProps = (key: keyof ContactPayload) =>
    ({
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? errorId(key) : undefined,
    }) as const;

  return {
    t,
    register,
    onSubmit,
    isSubmitting,
    errors,
    errorId,
    errorText,
    ariaProps,
  };
}
