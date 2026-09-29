/**
 * Preguntas frecuentes de la landing. Las respuestas con [corchetes] son las que dependen de tu
 * política real (mascotas, cancelación, etc.): completalas vos. Las que no tienen corchetes son
 * genéricas y las podés dejar así.
 */
export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  { question: "¿Aceptan mascotas?", answer: "[Completar: sí o no, y alguna condición si la hay.]" },
  { question: "¿Tienen Wi-Fi?", answer: "[Completar: sí o no, y si hay alguna zona de la casa sin señal.]" },
  { question: "¿Cuál es la política de cancelación?", answer: "[Completar: hasta cuántos días antes se devuelve la seña.]" },
  { question: "¿La casa incluye ropa de cama y toallas?", answer: "[Completar: qué pone la casa y qué tiene que traer cada huésped.]" },
  { question: "¿Hay comercios cerca?", answer: "[Completar: almacén, farmacia u otros comercios, y a qué distancia.]" },
];
