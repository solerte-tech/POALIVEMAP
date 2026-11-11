import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.sunset,
        tabBarInactiveTintColor: COLORS.mute,
        tabBarLabelStyle: { fontWeight: "700" },
        tabBarStyle: { backgroundColor: COLORS.night, borderTopColor: COLORS.line },
      }}
    >
      <Tabs.Screen name="map" options={{ title: "Explorar", tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} /> }} />
      <Tabs.Screen name="quests" options={{ title: "Missões", tabBarIcon: ({ color, size }) => <Ionicons name="trophy" size={size} color={color} /> }} />
    </Tabs>
  );
}
