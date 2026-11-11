import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { CATEGORY_META, CROWD_META } from "@/constants/theme";
import { xpFor } from "@/store/GameContext";
import { openRoute, openTicket } from "@/services/linking";
import { Place } from "@/types/place";

type Props = { place: Place; stamped: boolean; onCheckIn: () => void; onClose: () => void };

/** Card inferior com detalhes do local ou evento selecionado. */
export function PlaceDetailCard({ place, stamped, onCheckIn, onClose }: Props) {
  const cat = CATEGORY_META[place.category];
  const crowd = CROWD_META[place.crowd];

  return (
    <View className="mx-3 mb-3 rounded-3xl bg-panel border border-line p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-xs font-semibold" style={{ color: cat.color }}>
            {cat.label}
          </Text>
          <Text className="text-ink text-xl font-bold mt-1">{place.name}</Text>
        </View>
        <Pressable onPress={onClose} hitSlop={12} accessibilityLabel="Fechar detalhes">
          <Ionicons name="close" size={24} color="#8A9AB0" />
        </Pressable>
      </View>

      <Text className="text-mute text-sm mt-2 leading-5">{place.description}</Text>

      <View className="flex-row items-center gap-4 mt-4">
        {place.isLive && (
          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-live" />
            <Text className="text-live text-xs font-semibold">Ao vivo agora</Text>
          </View>
        )}
        <View className="flex-row items-center gap-1.5">
          <View className="w-2 h-2 rounded-full" style={{ backgroundColor: crowd.color }} />
          <Text className="text-xs font-semibold" style={{ color: crowd.color }}>
            {crowd.label}
          </Text>
        </View>
        <Text className="text-mute text-xs">{place.hours}</Text>
      </View>

      <Text className="text-mute text-xs mt-3">{place.address}</Text>

      <Pressable
        onPress={onCheckIn}
        disabled={stamped}
        className={`flex-row items-center justify-center gap-2 rounded-2xl py-3 mt-5 ${stamped ? "bg-night border border-live" : "bg-live active:opacity-80"}`}
      >
        <Ionicons name={stamped ? "checkmark-circle" : "ribbon"} size={18} color={stamped ? "#3DD6C3" : "#0E1620"} />
        <Text className={`font-bold ${stamped ? "text-live" : "text-night"}`}>
          {stamped ? "Carimbo coletado" : `Fazer check-in  +${xpFor(place)} XP`}
        </Text>
      </Pressable>

      <View className="flex-row gap-3 mt-3">
        <Pressable
          onPress={() => openRoute(place)}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-line py-3 active:opacity-70"
        >
          <Ionicons name="navigate" size={18} color="#E9EEF5" />
          <Text className="text-ink font-semibold">Traçar rota</Text>
        </Pressable>

        {place.ticketUrl && (
          <Pressable
            onPress={() => openTicket(place)}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-sunset py-3 active:opacity-80"
          >
            <Ionicons name="ticket" size={18} color="#0E1620" />
            <Text className="text-night font-bold">
              Ingresso {place.ticketPrice ? `R$ ${place.ticketPrice}` : ""}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
