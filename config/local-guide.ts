/**
 * Ideas para el rato libre cerca de la casa. Contenido de ejemplo (genérico de la zona), no un dato
 * verificado de esta casa puntual: confirmá que tengan sentido para tu ubicación real, o cambialos.
 * Dejar `localGuide` como [] oculta la sección.
 */
export type LocalGuideItem = { title: string; text: string };

export const localGuide: LocalGuideItem[] = [
  { title: "Ruta de los sabores", text: "Empanadas, vinos y productos regionales cerca de la casa." },
  { title: "Paseo al río", text: "Un lugar lindo para pasar la tarde a pocos minutos." },
  { title: "Senderismo en los cerros", text: "Vistas panorámicas para quienes quieren caminar un poco." },
];
