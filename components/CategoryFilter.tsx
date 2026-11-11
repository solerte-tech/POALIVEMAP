import { Pressable, ScrollView, Text } from "react-native";
import { CATEGORY_META } from "@/constants/theme";
import { PlaceCategory } from "@/types/place";

type Props = {
  selected: PlaceCategory | null;
  onSelect: (c: PlaceCategory | null) => void;
};

export function CategoryFilter({ selected, onSelect }: Props) {
  const entries = Object.entries(CATEGORY_META) as [PlaceCategory, (typeof CATEGORY_META)[PlaceCategory]][];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 gap-2">
      <Chip label="Tudo" active={selected === null} onPress={() => onSelect(null)} />
      {entries.map(([key, meta]) => (
        <Chip key={key} label={meta.label} active={selected === key} onPress={() => onSelect(selected === key ? null : key)} />
      ))}
    </ScrollView>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2 rounded-full border ${active ? "bg-sunset border-sunset" : "bg-panel/95 border-line"}`}
    >
      <Text className={`text-sm font-semibold ${active ? "text-night" : "text-ink"}`}>{label}</Text>
    </Pressable>
  );
}
