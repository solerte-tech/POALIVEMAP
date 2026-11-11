// Estende o app.json. No GitHub Pages o site fica em /NOME_DO_REPO, então o workflow define EXPO_BASE_URL.
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    ...(process.env.EXPO_BASE_URL ? { baseUrl: process.env.EXPO_BASE_URL } : {}),
  },
});
