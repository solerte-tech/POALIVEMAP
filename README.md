# Curta Mais Poa

Mapa 3D futurista e vivo de Porto Alegre: eventos, gastronomia e cultura, com rotas pelas ruas reais, luzes pulsantes de eventos e fichas com fotos. Gratuito e instalável no Android e no iPhone.

## Estrutura
| Pasta | Conteúdo |
|---|---|
| `web/` | O app (PWA): `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, `fotos/` |
| `docs/` | Visão, arquitetura, design system, roadmap, instalação |
| `services/api` | API futura (Node + TypeScript) |
| `apps/merchant-portal` | Portal do comerciante (fase 2) |
| `apps/mobile` | Reservado para app nativo (opcional, fase 3) |
| `data`, `packages/shared` | Dados de exemplo e tipos |
| `.github/workflows` | Publicação automática no GitHub Pages |

## Novidades da versão 3
- Frase de abertura, clima da semana (Open-Meteo) e cartão para instalar o app.
- Localização do dispositivo: orienta o usuário em Porto Alegre com instruções de curva a curva.
- Mobilidade no rodapé (a pé, carro, Uber, patinete). Chamar Uber de verdade é opcional.
- Aba Roteiros integrada ao mapa, com paradas e sugestão por perfil.

## Rodar local
```bash
cd web && npx serve .      # abra o endereço mostrado
```

## Publicar e instalar de graça
```bash
git init && git add . && git commit -m "Curta Mais Poa"
git branch -M main
git remote add origin https://github.com/solerte-tech/Curta-mais-Poa.git
git push -u origin main
```
Depois: Settings > Pages > Source "GitHub Actions". Veja `docs/05-instalar-no-celular.md`.

## Fontes gratuitas
MapLibre GL JS, OpenFreeMap (OpenStreetMap), imagens de satélite Esri, rotas routing.openstreetmap.de, GitHub Pages. Servem para protótipo e demonstração; revise os termos de cada serviço antes de uso comercial com muito tráfego.

> Lotação, eventos, textos e coordenadas são exemplos. Adicione fotos reais em `web/fotos/`.
