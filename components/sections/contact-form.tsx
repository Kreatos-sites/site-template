"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";

/**
 * Formulario de contacto — ESTÁNDAR de formularios del template:
 * react-hook-form + zodResolver con el schema compartido de
 * lib/contact-schema.ts (el server valida con el MISMO schema).
 * - Placeholder en TODOS los campos, siempre junto a su label visible
 *   (el placeholder jamás sustituye al label).
 * - Errores humanizados desde es.json (`<ns>.errors.<key>`): el schema
 *   emite keys, aquí se traducen. aria-invalid + error bajo el campo;
 *   react-hook-form enfoca solo el primer campo con error al enviar.
 * - Estados: enviando (spinner + disabled), éxito (toast cálido), error
 *   de red (toast reintentable: el form conserva lo escrito).
 *
 * Solo se monta si flags.contactForm es true (lo decide contact.tsx).
 * `ns` lo deriva contact.tsx como `${ns del padre}.form`.
 */
export function ContactForm({ ns = "contact.form" }: { ns?: string }) {
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

  async function onSubmit(data: ContactPayload) {
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
  }

  function fieldError(key: keyof ContactPayload) {
    const messageKey = errors[key]?.message;
    if (!messageKey) return null;
    return (
      <p id={`contact-${key}-error`} className="text-sm text-destructive">
        {t(`errors.${messageKey}`)}
      </p>
    );
  }

  function ariaProps(key: keyof ContactPayload) {
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    } as const;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
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
