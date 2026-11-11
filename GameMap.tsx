import { forwardRef, useImperativeHandle, useRef } from "react";
import { Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { PlaceMarker } from "@/components/PlaceMarker";
import { DARK_MAP_STYLE } from "@/constants/theme";
import { GameMapHandle, GameMapProps } from "@/types/map";

/** Mapa nativo (Android/iOS). Na web o Metro usa GameMap.web.tsx. */
export const GameMap = forwardRef<GameMapHandle, GameMapProps>(function GameMap(
  { places, selectedId, stampedIds, initialRegion, onSelect, onMapPress },
  ref
) {
  const mapRef = useRef<MapView>(null);
  useImperativeHandle(ref, () => ({ focus: (r) => mapRef.current?.animateToRegion(r, 600) }));

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      customMapStyle={DARK_MAP_STYLE}
      userInterfaceStyle="dark"
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton={false}
      toolbarEnabled={false}
      onPress={onMapPress}
    >
      {places.map((p) => (
        <PlaceMarker key={p.id} place={p} selected={selectedId === p.id} stamped={stampedIds.includes(p.id)} onPress={onSelect} />
      ))}
    </MapView>
  );
});
