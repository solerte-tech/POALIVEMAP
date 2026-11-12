export type Modo = 'pe' | 'carro' | 'uber' | 'patinete';
export type Categoria = 'gastronomia' | 'cultura' | 'musica' | 'natureza' | 'compras';
export interface Poi { id: string; nome: string; categoria: Categoria; lat: number; lng: number; lotacao: number; evento?: string; }
export interface Perfil { interesses: Categoria[]; modoPreferido: Modo; }
