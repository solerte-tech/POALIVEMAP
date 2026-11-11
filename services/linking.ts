import { Linking, Platform } from "react-native";
import { Place } from "@/types/place";

/** Abre o app de mapas nativo com rota até o destino. */
export function openRoute(place: Place) {
  const { latitude, longitude, name } = place;
  const label = encodeURIComponent(name);
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${latitude},${longitude}&q=${label}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
  })!;
  return Linking.openURL(url);
}

export function openTicket(place: Place) {
  if (place.ticketUrl) return Linking.openURL(place.ticketUrl);
}
