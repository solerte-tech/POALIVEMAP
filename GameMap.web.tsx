import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { CATEGORY_META } from "@/constants/theme";
import { GameMapHandle, GameMapProps } from "@/types/map";

const EMOJI = { gastronomia: "🍽", cultura: "🎨", evento: "🎵", turismo: "📷", transporte: "🚌" } as const;

const zoomFor = (lonDelta: number) => Math.round(Math.log2(360 / lonDelta)) + 0;

function Clicks({ onPress }: { onPress: () => void }) {
  useMapEvents({ click: onPress });
  return null;
}

/** Versão web do mapa (react-native-maps não funciona no navegador). */
export const GameMap = forwardRef<GameMapHandle, GameMapProps>(function GameMap(
  { places, selectedId, stampedIds, initialRegion, onSelect, onMapPress },
  ref
) {
  const mapRef = useRef<L.Map | null>(null);
  useImperativeHandle(ref, () => ({
    focus: (r) => mapRef.current?.flyTo([r.latitude, r.longitude], zoomFor(r.longitudeDelta), { duration: 0.6 }),
  }));

  const icon = (p: GameMapProps["places"][number]) => {
    const color = CATEGORY_META[p.category].color;
    const stamped = stampedIds.includes(p.id);
    const size = selectedId === p.id ? 46 : 38;
    return L.divIcon({
      className: "",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      html: `<div style="position:relative;width:${size}px;height:${size}px;border-radius:50%;border:2px solid ${color};background:${stamped ? color : "#0E1620"};display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px;box-shadow:0 2px 8px rgba(0,0,0,.5)">${EMOJI[p.category]}${
        p.isLive ? '<span style="position:absolute;top:-3px;right:-3px;width:11px;height:11px;border-radius:50%;background:#3DD6C3;border:2px solid #0E1620"></span>' : ""
      }</div>`,
    });
  };

  return (
    // zIndex 0 cria um contexto de empilhamento: HUD e cards ficam acima do mapa.
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <MapContainer
        ref={mapRef}
        center={[initialRegion.latitude, initialRegion.longitude]}
        zoom={zoomFor(initialRegion.longitudeDelta)}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#0E1620" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />
        <Clicks onPress={onMapPress} />
        {places.map((p) => (
          <Marker key={`${p.id}-${selectedId === p.id}-${stampedIds.includes(p.id)}`} position={[p.latitude, p.longitude]} icon={icon(p)} eventHandlers={{ click: () => onSelect(p) }} />
        ))}
      </MapContainer>
    </div>
  );
});
