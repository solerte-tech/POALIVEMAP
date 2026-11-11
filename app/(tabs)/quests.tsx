import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CATEGORY_META } from "@/constants/theme";
import { MOCK_PLACES } from "@/data/places";
import { HudBar } from "@/components/HudBar";
import { QUESTS, useGame } from "@/store/GameContext";

export default function QuestsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { stamps, stampIds, xp } = useGame();
  const cols = width >= 768 ? 4 : 3;

  return (
    <ScrollView
      className="flex-1 bg-night"
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32, alignItems: "center" }}
    >
      <View className="w-full px-4" style={{ maxWidth: 720 }}>
        <HudBar />
        <Text className="text-mute text-sm mt-2 px-2">{xp} XP acumulados</Text>

        <Text className="text-ink text-xl font-bold mt-6 mb-3">Missões</Text>
        <View className="gap-3">
          {QUESTS.map((q) => {
            const got = Math.min(q.progress(stamps), q.total);
            const done = got >= q.total;
            return (
              <View key={q.id} className={`flex-row items-center gap-4 rounded-3xl border p-4 ${done ? "bg-panel border-live" : "bg-panel border-line"}`}>
                <View className={`w-12 h-12 rounded-2xl items-center justify-center ${done ? "bg-live" : "bg-night"}`}>
                  <Ionicons name={(done ? "checkmark" : q.icon) as any} size={24} color={done ? "#0E1620" : "#F2A541"} />
                </View>
                <View className="flex-1">
                  <Text className="text-ink text-base font-bold">{q.title}</Text>
                  <Text className="text-mute text-sm">{q.desc}</Text>
                  <View className="h-1.5 rounded-full bg-night mt-2 overflow-hidden">
                    <View className="h-1.5 rounded-full bg-sunset" style={{ width: `${(got / q.total) * 100}%` }} />
                  </View>
                </View>
                <Text className="text-mute text-xs font-semibold">{got}/{q.total}</Text>
              </View>
            );
          })}
        </View>

        <Text className="text-ink text-xl font-bold mt-8 mb-3">Passaporte</Text>
        <View className="flex-row flex-wrap" style={{ marginHorizontal: -6 }}>
          {MOCK_PLACES.map((p) => {
            const has = stampIds.includes(p.id);
            const meta = CATEGORY_META[p.category];
            return (
              <View key={p.id} style={{ width: `${100 / cols}%`, padding: 6 }}>
                <View
                  className="aspect-square rounded-3xl border items-center justify-center p-2"
                  style={{ borderColor: has ? meta.color : "#26354A", backgroundColor: has ? "#16212E" : "#0E1620", borderStyle: has ? "solid" : "dashed" }}
                >
                  <Ionicons name={(has ? meta.icon : "lock-closed") as any} size={28} color={has ? meta.color : "#26354A"} />
                  <Text numberOfLines={2} className={`text-xs text-center mt-2 font-semibold ${has ? "text-ink" : "text-mute"}`}>
                    {p.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
