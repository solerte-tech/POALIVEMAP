// Coordenadas aproximadas. Valide cada ponto no Google Maps antes de publicar.
export type Place3D = { id: string; name: string; lat: number; lng: number; crowd?: number; event?: string; note: string };
export const PLACES3D: Place3D[] = [
  { id: 'mercado', name: 'Mercado Público', lat: -30.0285, lng: -51.2277, crowd: 0.72, note: 'Bancas, café e cuia desde 1869.' },
  { id: 'gasometro', name: 'Usina do Gasômetro', lat: -30.034, lng: -51.2436, crowd: 0.5, event: 'Música ao vivo no pôr do sol (exemplo)', note: 'Cultura de frente para o Guaíba.' },
  { id: 'orla', name: 'Orla do Guaíba', lat: -30.0455, lng: -51.2385, crowd: 0.38, note: 'Calçadão para caminhar e ver o sol baixar.' },
  { id: 'matriz', name: 'Praça da Matriz', lat: -30.0323, lng: -51.232, crowd: 0.2, note: 'Catedral, palácios e Memorial do RS.' },
  { id: 'saopedro', name: 'Theatro São Pedro', lat: -30.0326, lng: -51.2313, crowd: 0.3, event: 'Espetáculo hoje às 20h (exemplo)', note: 'Teatro histórico no Centro.' },
];
