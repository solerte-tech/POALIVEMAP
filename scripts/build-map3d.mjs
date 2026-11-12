// Gera services/map3dHtml.ts a partir de assets/map3d/map3d.html (única fonte do mapa 3D)
import { readFileSync, writeFileSync } from 'node:fs';
const html = readFileSync(new URL('../assets/map3d/map3d.html', import.meta.url), 'utf8');
writeFileSync(new URL('../services/map3dHtml.ts', import.meta.url),
`// ARQUIVO GERADO por scripts/build-map3d.mjs. Não edite à mão.
const HTML = ${JSON.stringify(html)};
export const buildMap3dHtml = (apiKey: string) => HTML.replace('__KEY__', apiKey);
`);
console.log('services/map3dHtml.ts gerado');
