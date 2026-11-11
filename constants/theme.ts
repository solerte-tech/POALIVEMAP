import { Crowd, PlaceCategory } from "@/types/place";

export const COLORS = {
  night: "#0E1620",
  panel: "#16212E",
  line: "#26354A",
  ink: "#E9EEF5",
  mute: "#8A9AB0",
  sunset: "#F2A541",
  live: "#3DD6C3",
  busy: "#FF6B5A",
};

export const CATEGORY_META: Record<PlaceCategory, { label: string; icon: string; color: string }> = {
  gastronomia: { label: "Gastronomia", icon: "restaurant", color: "#F2A541" },
  cultura: { label: "Cultura", icon: "color-palette", color: "#B79CFF" },
  evento: { label: "Eventos", icon: "musical-notes", color: "#3DD6C3" },
  turismo: { label: "Turismo", icon: "camera", color: "#6FB4FF" },
  transporte: { label: "Chegada", icon: "bus", color: "#E9EEF5" },
};

export const CROWD_META: Record<Crowd, { label: string; color: string }> = {
  baixa: { label: "Tranquilo", color: "#3DD6C3" },
  media: { label: "Movimentado", color: "#F2A541" },
  alta: { label: "Lotado", color: "#FF6B5A" },
};

/** Centro Histórico de Porto Alegre */
export const INITIAL_REGION = {
  latitude: -30.0328,
  longitude: -51.2302,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
};

/** Estilo escuro para o Google Maps (Android; no iOS o modo dark do Apple Maps é usado). */
export const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0E1620" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8A9AB0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0E1620" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1E2D40" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2B4060" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#08202E" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#123127" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
];
