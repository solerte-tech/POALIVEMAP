import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PlaceDetailCard } from "@/components/PlaceDetailCard";
import { PlaceMarker } from "@/components/PlaceMarker";
import { DARK_MAP_STYLE, INITIAL_REGION } from "@/constants/theme";
import { getUserLocation } from "@/services/locationService";
import { getPlaces } from "@/services/placesService";
import { Place, PlaceCategory } from "@/types/place";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const [places, setPlaces] = useState<Place[]>([]);
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const [liveOnly, setLiveOnly] = useState(false);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  const visible = useMemo(
    () =>
      places.filter((p) => (category ? p.category === category : true) && (liveOnly ? p.isLive : true)),
    [places, category, liveOnly]
  );

  const focus = (region: Region) => mapRef.current?.animateToRegion(region, 600);

  const handleSelect = (place: Place) => {
    setSelected(place);
    focus({ latitude: place.latitude - 0.003, longitude: place.longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 });
  };

  const goToMyLocation = async () => {
    const coords = await getUserLocation();
    if (coords) focus({ ...coords, latitudeDelta: 0.012, longitudeDelta: 0.012 });
  };

  return (
    <View className="flex-1 bg-night">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        // Google Maps no Android (permite estilo escuro); Apple Maps no iOS.
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        customMapStyle={DARK_MAP_STYLE}
        userInterfaceStyle="dark"
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onPress={() => setSelected(null)}
      >
        {visible.map((p) => (
          <PlaceMarker key={p.id} place={p} selected={selected?.id === p.id} onPress={handleSelect} />
        ))}
      </MapView>

      {/* Topo: título + filtros */}
      <View className="absolute left-0 right-0" style={{ top: insets.top + 8 }} pointerEvents="box-none">
        <View className="flex-row items-center justify-between px-4 mb-3">
          <Text className="text-ink text-2xl font-extrabold">POA Live Map</Text>
          <Pressable
            onPress={() => setLiveOnly((v) => !v)}
            className={`flex-row items-center gap-1.5 px-3 py-2 rounded-full border ${
              liveOnly ? "bg-live border-live" : "bg-panel/95 border-line"
            }`}
          >
            <View className={`w-2 h-2 rounded-full ${liveOnly ? "bg-night" : "bg-live"}`} />
            <Text className={`text-xs font-bold ${liveOnly ? "text-night" : "text-ink"}`}>Ao vivo</Text>
          </Pressable>
        </View>
        <CategoryFilter selected={category} onSelect={setCategory} />
      </View>

      {/* Base: botão de localização + card de detalhes */}
      <View className="absolute left-0 right-0 bottom-0" pointerEvents="box-none">
        {!selected && (
          <View className="items-end px-4 pb-4">
            <Pressable
              onPress={goToMyLocation}
              accessibilityLabel="Ir para minha localização"
              className="w-12 h-12 rounded-full bg-panel border border-line items-center justify-center active:opacity-70"
            >
              <Ionicons name="locate" size={22} color="#F2A541" />
            </Pressable>
          </View>
        )}
        {selected && <PlaceDetailCard place={selected} onClose={() => setSelected(null)} />}
      </View>
    </View>
  );
}
