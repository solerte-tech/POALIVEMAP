import { Place } from "./place";

export type Region = { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
export type GameMapHandle = { focus: (r: Region) => void };
export type GameMapProps = {
  places: Place[];
  selectedId?: string;
  stampedIds: string[];
  initialRegion: Region;
  onSelect: (p: Place) => void;
  onMapPress: () => void;
};
