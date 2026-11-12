# Arquitetura
- **App:** Expo (React Native) + TypeScript. Um código para Android, iOS e Web.
- **Mapa:** MapLibre/Mapbox com construções 3D, ou Google Photorealistic 3D Tiles (cidade realista). Avaliar custo e licença.
- **Backend:** Node + Fastify, PostgreSQL + PostGIS, Redis para lotação, WebSocket para eventos.
- **Lotação:** check-in voluntário, dados do estabelecimento, parceiros e estimativa anônima. Sem rastrear indivíduos sem consentimento (LGPD).
- **Recomendação:** perfil de preferências + hora + localização + clima.
- **Anúncios:** destaque contratado pelo comerciante, sempre identificado como patrocinado.
- **Mobilidade:** deep links para Uber/99 e integração com patinetes parceiros.

## Privacidade (LGPD)
Consentimento explícito para localização, uso sem conta, dados agregados para o poder público.
