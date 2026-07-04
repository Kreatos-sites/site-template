import { z } from "zod";

/**
 * Schema COMPARTIDO del formulario de contacto (motor: no tocar).
 * Lo usan components/sections/contact-form.tsx (zodResolver: UX) y
 * app/api/contact/route.ts (la validación de seguridad real). Un solo
 * schema = imposible que cliente y server diverjan.
 *
 * Los `message` NO son texto visible: son KEYS de messages/es.json bajo
 * `<ns del form>.errors.*` — el componente los traduce con next-intl
 * (los errores humanizados viven en es.json, nunca aquí).
 */

/**
 * Teléfono MX válido: 10 dígitos locales, o con lada de país
 * (52 + 10, o el histórico 52 1 + 10 de móviles). Se ignoran espacios,
 * guiones y paréntesis: "+52 871 123 4567" y "8711234567" pasan igual.
 */
export function isValidMxPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return true;
  return digits.startsWith("52") && (digits.length === 12 || digits.length === 13);
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "nameLong"),
  phone: z.string().trim().min(1, "phone").refine(isValidMxPhone, "phone"),
  /** Opcional, pero si viene debe ser un correo real ("" = no proporcionado). */
  email: z
    .string()
    .trim()
    .max(254, "email")
    .refine((value) => value === "" || z.email().safeParse(value).success, "email"),
  message: z.string().trim().min(10, "message").max(4000, "messageLong"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
