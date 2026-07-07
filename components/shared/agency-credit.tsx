/**
 * Crédito de agencia — MOTOR, agent-proof. Es la ÚNICA cadena de texto fija a
 * propósito del template: atribución de negocio, NO copy de cliente, por eso NO
 * sale de es.json (si viviera ahí el site-builder podría cambiarla o quitarla).
 * En P1 el section-renderer la INYECTA dentro del <footer> fuera del control
 * del autor, de modo que todo sitio generado atribuya a Intello con su link.
 */
const CREDIT_LABEL = "Sitio creado por Intello";
const CREDIT_HREF = "https://intelloai.com";

export function AgencyCredit({ className }: { className?: string }) {
  return (
    <a
      href={CREDIT_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {CREDIT_LABEL}
    </a>
  );
}
