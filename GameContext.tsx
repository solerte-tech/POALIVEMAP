import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { MOCK_PLACES } from "@/data/places";
import { Place } from "@/types/place";

export const XP_PER_LEVEL = 100;
export const LEVEL_TITLES = ["Turista", "Explorador", "Conhecedor", "Local", "Lenda do Guaíba"];
/** true = check-in livre (para testar fora de Porto Alegre). Mude para false em produção. */
export const DEMO_MODE = true;
const CHECKIN_RADIUS_M = 300;

export const xpFor = (p: Place) => 50 + (p.isLive ? 25 : 0);

type Coords = { latitude: number; longitude: number };
type Result = { ok: boolean; xp: number; levelUp: boolean; reason?: string };

export type Quest = {
  id: string; title: string; desc: string; icon: string; total: number;
  progress: (s: Place[]) => number;
};

export const QUESTS: Quest[] = [
  { id: "q1", title: "Primeiro carimbo", desc: "Faça seu primeiro check-in", icon: "flag", total: 1, progress: (s) => s.length },
  { id: "q2", title: "Gourmet", desc: "Carimbe um lugar de gastronomia", icon: "restaurant", total: 1, progress: (s) => s.filter((p) => p.category === "gastronomia").length },
  { id: "q3", title: "Alma cultural", desc: "Carimbe 2 espaços de cultura ou eventos", icon: "color-palette", total: 2, progress: (s) => s.filter((p) => p.category === "cultura" || p.category === "evento").length },
  { id: "q4", title: "Pôr do sol no Guaíba", desc: "Check-in na Orla ou na Usina do Gasômetro", icon: "sunny", total: 1, progress: (s) => s.filter((p) => ["orla-guaiba", "usina-gasometro"].includes(p.id)).length },
  { id: "q5", title: "Passaporte completo", desc: "Colecione todos os carimbos", icon: "trophy", total: MOCK_PLACES.length, progress: (s) => s.length },
];

function distanceM(a: Coords, b: Coords) {
  const R = 6371000, rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude), dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

type Game = {
  startId: string; setStartId: (id: string) => void;
  xp: number; level: number; levelTitle: string; levelProgress: number;
  stampIds: string[]; stamps: Place[];
  checkIn: (p: Place, user?: Coords | null) => Result;
};

const Ctx = createContext<Game | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [startId, setStartId] = useState("rodoviaria");
  const [xp, setXp] = useState(0);
  const [stampIds, setStampIds] = useState<string[]>([]);

  const value = useMemo<Game>(() => {
    const level = Math.floor(xp / XP_PER_LEVEL) + 1;
    return {
      startId, setStartId, xp, level,
      levelTitle: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
      levelProgress: (xp % XP_PER_LEVEL) / XP_PER_LEVEL,
      stampIds,
      stamps: MOCK_PLACES.filter((p) => stampIds.includes(p.id)),
      checkIn: (p, user) => {
        const fail = (reason: string): Result => ({ ok: false, xp: 0, levelUp: false, reason });
        if (stampIds.includes(p.id)) return fail("Você já coletou este carimbo.");
        if (!DEMO_MODE) {
          if (!user) return fail("Ative a localização para fazer check-in.");
          if (distanceM(user, p) > CHECKIN_RADIUS_M) return fail("Chegue a menos de 300 m para carimbar.");
        }
        const gained = xpFor(p);
        setStampIds((s) => [...s, p.id]);
        setXp((x) => x + gained);
        return { ok: true, xp: gained, levelUp: Math.floor(xp / XP_PER_LEVEL) < Math.floor((xp + gained) / XP_PER_LEVEL) };
      },
    };
  }, [startId, xp, stampIds]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useGame = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useGame precisa estar dentro de <GameProvider>");
  return c;
};
