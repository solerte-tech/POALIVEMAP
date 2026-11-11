import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryFilter } from "@/components/CategoryFilter";
import { HudBar } from "@/components/HudBar";
import { PlaceDetailCard } from "@/components/PlaceDetailCard";
import { GameMap } from "@/components/GameMap";
import { getUserLocation } from "@/services/locationService";
import { getPlaces } from "@/services/placesService";
import { DEMO_MODE, useGame } from "@/store/GameContext";
import { GameMapHandle, Region } from "@/types/map";
import { Place, PlaceCategory } from "@/types/place";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const wide = width >= 768; // tablets e telas grandes: card vira painel lateral
  const game = useGame();
  const mapRef = useRef<GameMapHandle>(null);

  const [places, setPlaces] = useState<Place[]>([]);
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const [liveOnly, setLiveOnly] = useState(false);
  const [msg, setMsg] = useState("");
  const toast = useRef(new Animated.Value(0)).current;

  useEffect(() => { getPlaces().then(setPlaces); }, []);

  const start = places.find((p) => p.id === game.startId);
  const initialRegion: Region = {
    latitude: start?.latitude ?? -30.0328,
    longitude: start?.longitude ?? -51.2302,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  const visible = useMemo(
    () => places.filter((p) => (category ? p.category === category : true) && (liveOnly ? p.isLive : true)),
    [places, category, liveOnly]
  );

  const focus = (r: Region) => mapRef.current?.focus(r);

  const showToast = (m: string) => {
    setMsg(m);
    toast.setValue(0);
    Animated.sequence([
      Animated.timing(toast, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(toast, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleCheckIn = async () => {
    if (!selected) return;
    const user = DEMO_MODE ? null : await getUserLocation();
    const r = game.checkIn(selected, user);
    showToast(r.ok ? `+${r.xp} XP${r.levelUp ? " · Subiu de nível!" : ""}` : r.reason ?? "");
  };

  return (
    <View className="flex-1 bg-night">
      <GameMap
        ref={mapRef}
        places={visible}
        selectedId={selected?.id}
        stampedIds={game.stampIds}
        initialRegion={initialRegion}
        onMapPress={() => setSelected(null)}
        onSelect={(pl) => {
          setSelected(pl);
          focus({ latitude: pl.latitude - (wide ? 0 : 0.003), longitude: pl.longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 });
        }}
      />

      {/* Topo: HUD + filtros */}
      <View className="absolute left-0 right-0" style={{ top: insets.top + 8 }} pointerEvents="box-none">
        <View className="px-4 mb-3" style={wide ? { maxWidth: 420 } : undefined}>
          <HudBar />
        </View>
        <CategoryFilter selected={category} onSelect={setCategory} />
      </View>

      {/* Aviso de XP */}
      <Animated.View
        pointerEvents="none"
        className="absolute self-center rounded-full bg-live px-5 py-3"
        style={{
          top: insets.top + 130,
          opacity: toast,
          transform: [{ translateY: toast.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }) }],
        }}
      >
        <Text className="text-night font-extrabold">{msg}</Text>
      </Animated.View>

      {/* Base */}
      <View className="absolute left-0 right-0 bottom-0" style={{ paddingBottom: insets.bottom > 0 ? 0 : 4 }} pointerEvents="box-none">
        {!selected && (
          <View className="flex-row items-center justify-between px-4 pb-4">
            <Pressable
              onPress={() => setLiveOnly((v) => !v)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded-full border ${liveOnly ? "bg-live border-live" : "bg-panel border-line"}`}
            >
              <View className={`w-2 h-2 rounded-full ${liveOnly ? "bg-night" : "bg-live"}`} />
              <Text className={`text-sm font-bold ${liveOnly ? "text-night" : "text-ink"}`}>Ao vivo</Text>
            </Pressable>
            <Pressable
              onPress={async () => {
                const c = await getUserLocation();
                if (c) focus({ ...c, latitudeDelta: 0.012, longitudeDelta: 0.012 });
              }}
              accessibilityLabel="Ir para minha localização"
              className="w-12 h-12 rounded-full bg-panel border border-line items-center justify-center active:opacity-70"
            >
              <Ionicons name="locate" size={22} color="#F2A541" />
            </Pressable>
          </View>
        )}
        {selected && (
          <View style={wide ? { width: 400, alignSelf: "flex-start" } : undefined}>
            <PlaceDetailCard
              place={selected}
              stamped={game.stampIds.includes(selected.id)}
              onCheckIn={handleCheckIn}
              onClose={() => setSelected(null)}
            />
          </View>
        )}
      </View>
    </View>
  );
}
