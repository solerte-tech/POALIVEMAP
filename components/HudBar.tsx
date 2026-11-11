import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { MOCK_PLACES } from "@/data/places";
import { useGame } from "@/store/GameContext";

/** Painel de status do jogador: nível, barra de XP e carimbos. */
export function HudBar() {
  const { level, levelTitle, levelProgress, stampIds } = useGame();
  return (
    <View className="flex-row items-center gap-3 rounded-full bg-panel/95 border border-line pl-2 pr-4 py-2">
      <View className="w-10 h-10 rounded-full bg-sunset items-center justify-center">
        <Text className="text-night text-lg font-extrabold">{level}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-ink text-sm font-bold">{levelTitle}</Text>
        <View className="h-2 rounded-full bg-night mt-1 overflow-hidden">
          <View className="h-2 rounded-full bg-live" style={{ width: `${Math.max(levelProgress * 100, 4)}%` }} />
        </View>
      </View>
      <View className="flex-row items-center gap-1">
        <Ionicons name="ribbon" size={18} color="#F2A541" />
        <Text className="text-ink text-sm font-bold">
          {stampIds.length}/{MOCK_PLACES.length}
        </Text>
      </View>
    </View>
  );
}
