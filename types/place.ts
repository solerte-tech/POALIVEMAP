export type PlaceCategory = "gastronomia" | "cultura" | "evento" | "turismo" | "transporte";
export type Crowd = "baixa" | "media" | "alta";

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  isLive: boolean;
  crowd: Crowd;
  /** Horário de funcionamento ou do evento */
  hours: string;
  /** Preço do ingresso em R$; undefined = entrada gratuita */
  ticketPrice?: number;
  ticketUrl?: string;
}
