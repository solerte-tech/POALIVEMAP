import { MOCK_PLACES } from "@/data/places";
import { Place } from "@/types/place";

/**
 * Camada de acesso a dados. Hoje retorna dados locais;
 * troque por fetch() para sua API (Supabase, Firebase, REST...).
 */
export async function getPlaces(): Promise<Place[]> {
  return MOCK_PLACES;
}
