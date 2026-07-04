"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Formulario del bloque de contacto. Solo se monta si
 * flags.contactForm es true (lo decide contact.tsx).
 * `ns` lo deriva contact.tsx como `${ns del padre}.form`.
 * Envía a /api/contact (Resend).
 */
export function ContactForm({ ns = "contact.form" }: { ns?: string }) {
  const t = useTranslations(ns);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(String(res.status));

      toast.success(t("success"));
      form.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            {t("name")}
          </label>
          <Input id="contact-name" name="name" required minLength={2} maxLength={120} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium">
            {t("email")}
          </label>
          <Input id="contact-email" name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium">
          {t("phone")}
        </label>
        <Input id="contact-phone" name="phone" type="tel" maxLength={30} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          {t("message")}
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        {sending ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
