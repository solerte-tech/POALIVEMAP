import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/store/GameContext";

const STARTS = [
  { id: "rodoviaria", label: "Cheguei de ônibus", sub: "Começar na Rodoviária", icon: "bus" },
  { id: "aeroporto", label: "Cheguei de avião", sub: "Começar no Aeroporto", icon: "airplane" },
] as const;

/** Tela de abertura: radar pulsante + escolha do ponto de partida. */
export default function Intro() {
  const router = useRouter();
  const { setStartId } = useGame();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const rings = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    rings.forEach((v, i) =>
      Animated.loop(
        Animated.timing(v, { toValue: 1, duration: 3600, delay: i * 1200, easing: Easing.out(Easing.quad), useNativeDriver: true })
      ).start()
    );
  }, [rings]);

  const start = (id: string) => {
    setStartId(id);
    router.replace("/map");
  };

  const radar = Math.min(height * 0.28, 220);

  return (
    <View className="flex-1 bg-night items-center" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}>
      <View style={{ height: radar * 2.2, width: radar * 2.2, alignItems: "center", justifyContent: "center" }}>
        {rings.map((v, i) => (
          <Animated.View
            key={i}
            style={{
              position: "absolute", width: radar, height: radar, borderRadius: radar / 2,
              borderWidth: 2, borderColor: "#3DD6C3",
              opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
              transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.3, 2.1] }) }],
            }}
          />
        ))}
        <View className="w-24 h-24 rounded-full bg-sunset items-center justify-center">
          <Ionicons name="location" size={48} color="#0E1620" />
        </View>
      </View>

      <View className="flex-1 w-full px-6 justify-end" style={{ maxWidth: 480 }}>
        <Text className="text-ink text-4xl font-extrabold">POA Live Map</Text>
        <Text className="text-mute text-base mt-2 leading-6">
          Explore o Centro de Porto Alegre, colecione carimbos e suba de nível.
        </Text>

        <Text className="text-ink text-sm font-semibold mt-8 mb-3">Onde sua aventura começa?</Text>
        <View className="gap-3">
          {STARTS.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => start(s.id)}
              className="flex-row items-center gap-4 rounded-3xl bg-panel border border-line p-4 active:border-sunset active:opacity-80"
            >
              <View className="w-12 h-12 rounded-2xl bg-night items-center justify-center">
                <Ionicons name={s.icon} size={24} color="#F2A541" />
              </View>
              <View className="flex-1">
                <Text className="text-ink text-base font-bold">{s.label}</Text>
                <Text className="text-mute text-sm">{s.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8A9AB0" />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
