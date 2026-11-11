# POA Live Map

Mapa interativo em tempo real para turismo, cultura, gastronomia e eventos no Centro de Porto Alegre.
Feito com **React Native + Expo (TypeScript)**, **Expo Router**, **react-native-maps** e **NativeWind**.

## Estrutura

```
poa-live-map/
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx         # Layout raiz
│   └── (tabs)/
│       ├── _layout.tsx     # Barra de abas
│       └── index.tsx       # Tela do mapa
├── components/             # PlaceMarker, CategoryFilter, PlaceDetailCard
├── constants/theme.ts      # Cores, categorias, região inicial, estilo do mapa
├── data/places.ts          # Dados de exemplo
├── services/               # placesService, locationService, linking
├── types/place.ts
├── assets/images/          # icon, splash, adaptive-icon (substitua pelos seus)
├── app.json  eas.json  babel.config.js  metro.config.js
└── tailwind.config.js  global.css  tsconfig.json
```

## Pré-requisitos

- Node.js 20 ou superior
- Aplicativo **Expo Go** no celular (Android/iOS), ou Android Studio / Xcode para emuladores

## Rodando localmente

```bash
git clone https://github.com/SEU_USUARIO/poa-live-map.git
cd poa-live-map
npm install
npx expo install --fix     # alinha as versões das dependências ao SDK do Expo
npx expo start
```

- Escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS).
- Pressione `a` para abrir o emulador Android ou `i` para o simulador iOS (somente macOS).
- Se o cache der problema: `npx expo start -c`.

## Chave do Google Maps (Android)

O mapa no Android usa Google Maps. No Expo Go ele funciona sem chave; para o build final:

1. Crie um projeto no Google Cloud e ative **Maps SDK for Android** (e **Maps SDK for iOS** se for usar Google no iOS).
2. Gere uma chave de API e substitua `COLOQUE_SUA_CHAVE_AQUI` em `app.json`.
3. Restrinja a chave ao pacote `br.com.poalivemap.app`.

No iOS o app usa Apple Maps por padrão, sem chave.

## Gerando os apps nativos com EAS Build

```bash
npm install -g eas-cli
eas login                  # conta gratuita em expo.dev
eas build:configure
```

| Objetivo | Comando |
|---|---|
| APK para testar no Android | `npm run build:android:preview` |
| AAB para a Google Play | `npm run build:android:prod` |
| iOS (TestFlight / App Store) | `npm run build:ios:prod` |

Observações:

- O plano gratuito do EAS inclui uma cota mensal de builds, com fila mais lenta.
- Android pode ser publicado com a taxa única da Google Play (US$ 25) e pode ser instalado via APK gratuitamente.
- iOS exige conta **Apple Developer** (US$ 99/ano) para gerar o `.ipa` instalável. O EAS cuida dos certificados.
- Altere `bundleIdentifier` e `package` em `app.json` se quiser outro identificador.

## Próximos passos sugeridos

- Trocar `data/places.ts` por uma API (Supabase, Firebase ou REST) em `services/placesService.ts`.
- Atualizar `isLive` e `crowd` em tempo real (Supabase Realtime, Firestore ou WebSocket).
- Adicionar abas de Eventos e Favoritos em `app/(tabs)/`.
- Integrar checkout de ingressos (Sympla, Eventbrite ou Mercado Pago).
- Usar Mapbox: exige *development build* (`eas build --profile development`), pois não roda no Expo Go.
