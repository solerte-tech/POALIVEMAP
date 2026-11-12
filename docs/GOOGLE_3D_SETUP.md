# Mapa 3D realista (Google Photorealistic 3D Maps) no POA Live Map

## 1. Instalar
```bash
npx expo install react-native-webview
```
Copie as pastas deste pacote para a raiz do `poa-live-map` (mesmos caminhos).
Registre a aba em `app/(tabs)/_layout.tsx`: `<Tabs.Screen name="map3d" options={{ title: 'Mapa 3D' }} />`

## 2. Chave do Google
1. Crie um projeto em console.cloud.google.com e **ative o faturamento** (há opção de chave de demonstração sem faturamento no site da Google para testes).
2. Ative a **Maps JavaScript API**.
3. Crie uma chave de API e **restrinja**: por referenciador HTTP (domínio do app web e `https://poalivemap.app/*` para o app nativo) e apenas às APIs necessárias. Nunca suba a chave no GitHub.
4. Copie `.env.example` para `.env` e cole a chave.

## 3. Testar rápido, sem Expo
```bash
npx serve assets/map3d
# abra http://localhost:3000/map3d.html?key=SUA_CHAVE   (libere http://localhost:* na chave)
```

## 4. Verificar a cobertura
A imagem 3D realista cobre só algumas áreas. Confira Porto Alegre (Centro, Gasômetro, Orla) na página "Photorealistic 3D Maps Coverage" da documentação da Google. Onde não houver, o mapa mostra só relevo e satélite.

## 5. Próximos passos
- Rotas pelas ruas reais: usar a Routes API no backend e passar os pontos em `goTo(id, route)`.
- Lotação e eventos reais: trocar `data/places3d.ts` por chamadas à API.
- Custos: o 3D é cobrado por uso. Estime antes de lançar.
- Se editar `assets/map3d/map3d.html`, rode `node scripts/build-map3d.mjs`.
- Em produção, a Google exige manter a atribuição visível no mapa.
