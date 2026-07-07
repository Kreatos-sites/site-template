"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactForm } from "@/components/shared/use-contact-form";
import type { ContactPayload } from "@/lib/contact-schema";

/**
 * Formulario de contacto — implementación de REFERENCIA sobre `useContactForm`
 * (la plomería headless: react-hook-form + zodResolver con el schema compartido,
 * submit a /api/contact, toasts). Este componente solo aporta el MARKUP; una
 * sección custom puede cablear su propio diseño al mismo hook.
 * - Placeholder en TODOS los campos, siempre junto a su label visible.
 * - Errores humanizados desde es.json (`<ns>.errors.<key>`): aria-invalid +
 *   error bajo el campo; react-hook-form enfoca el primer campo con error.
 * - Estados: enviando (spinner + disabled), éxito (toast), error reintentable.
 *
 * Solo se monta si flags.contactForm es true (lo decide contact.tsx).
 * `ns` lo deriva contact.tsx como `${ns del padre}.form`.
 */
export function ContactForm({ ns = "contact.form" }: { ns?: string }) {
  const { t, register, onSubmit, isSubmitting, errorText, errorId, ariaProps } =
    useContactForm(ns);

  function fieldError(key: keyof ContactPayload) {
    const text = errorText(key);
    if (!text) return null;
    return (
      <p id={errorId(key)} className="text-sm text-destructive">
        {text}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            {t("name")}
          </label>
          <Input
            id="contact-name"
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            {...ariaProps("name")}
            {...register("name")}
          />
          {fieldError("name")}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className="text-sm font-medium">
            {t("phone")}
          </label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            {...ariaProps("phone")}
            {...register("phone")}
          />
          {fieldError("phone")}
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium">
          {t("email")}
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          {...ariaProps("email")}
          {...register("email")}
        />
        {fieldError("email")}
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          {t("message")}
        </label>
        <Textarea
          id="contact-message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          {...ariaProps("message")}
          {...register("message")}
        />
        {fieldError("message")}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
