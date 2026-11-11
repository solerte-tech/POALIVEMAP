import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { CATEGORY_META, COLORS } from "@/constants/theme";
import { Place } from "@/types/place";

type Props = { place: Place; selected: boolean; onPress: (p: Place) => void };

export function PlaceMarker({ place, selected, onPress }: Props) {
  const meta = CATEGORY_META[place.category];
  return (
    <Marker
      coordinate={{ latitude: place.latitude, longitude: place.longitude }}
      onPress={() => onPress(place)}
      tracksViewChanges={false}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View
        style={{
          width: selected ? 44 : 36,
          height: selected ? 44 : 36,
          borderRadius: 22,
          backgroundColor: COLORS.night,
          borderWidth: 2,
          borderColor: meta.color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={meta.icon as any} size={selected ? 22 : 18} color={meta.color} />
        {place.isLive && (
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.live,
              borderWidth: 2,
              borderColor: COLORS.night,
            }}
          />
        )}
      </View>
    </Marker>
  );
}
