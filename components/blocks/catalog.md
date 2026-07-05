# Catálogo de bloques (biblioteca del motor)

Bloques curados, probados y de arquetipos DISTINTOS. El agente los COMPONE:
declara `{ id: "block", block: "<key>", ns: "<namespace>" }` en site.config.ts y
llena el copy en messages/es.json con la forma `ns` indicada. NO se escribe .tsx
(a diferencia de components/custom/). Objetivo: variedad sin esfuerzo → menos
sitios que se ven a plantilla.

Regla de composición: **no repitas el mismo bloque más de 2 veces en un sitio**
y **alterna arquetipos vecinos** (una banda densa junto a una aireada, un muro de
cifras junto a una lista editorial). El ritmo es lo que hace único a un sitio.

| block (key) | arquetipo | úsalo para | forma del `ns` (keys en es.json) |
| --- | --- | --- | --- |
| `stat-wall` | muro de cifras enormes, fondo secondary | credenciales/impacto en números (años, unidades, cobertura) | `{ eyebrow, title, stats: [{ value, label, detail? }] }` |
| `feature-zigzag` | filas alternando imagen izq/der | 2-4 servicios/pilares con foto real, cada uno con aire | `{ eyebrow, title, intro?, features: [{ title, description, image, imageAlt }] }` (`image` = ruta /images/x.webp) |

<!-- Al agregar un bloque: registrarlo en registry.ts, agregar su fila aquí, y
espejar esta tabla en el skill `block-catalog` del art-director. -->
