import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Map3D, { Map3DHandle, Modo } from '../../components/Map3D';
import { PLACES3D } from '../../data/places3d';

const KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const MODOS: [Modo, string][] = [['pe', 'A pé'], ['carro', 'Carro'], ['uber', 'Uber'], ['pat', 'Patinete']];
const cor = (l = 0.3) => (l < 0.4 ? '#4FB286' : l < 0.65 ? '#F2B33D' : '#E0457B');

export default function Mapa3D() {
  const map = useRef<Map3DHandle>(null);
  const [modo, setModo] = useState<Modo>('pe');
  const [sel, setSel] = useState<string | null>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const p = PLACES3D.find(x => x.id === sel);
  const pct = Math.round((p?.crowd ?? 0) * 100);

  return (
    <View style={s.f}>
      <Map3D ref={map} apiKey={KEY} places={PLACES3D} modo={modo} onSelect={id => { setSel(id); setEta(null); }} onEta={setEta} onError={setErro} />
      <View style={s.top}>
        {MODOS.map(([k, n]) => (
          <Pressable key={k} onPress={() => setModo(k)} style={[s.chip, modo === k && s.on]} accessibilityRole="button">
            <Text style={[s.t, modo === k && s.tOn]}>{n}</Text>
          </Pressable>
        ))}
      </View>
      {erro && <View style={s.err}><Text style={s.errT}>{erro}</Text></View>}
      {p && (
        <View style={s.card}>
          <Text style={s.h}>{p.name}</Text>
          <Text>{p.note}</Text>
          <View style={s.bar}><View style={{ width: `${pct}%`, height: 10, borderRadius: 6, backgroundColor: cor(p.crowd) }} /></View>
          <Text style={{ fontSize: 13 }}>{pct}% da lotação (dado de exemplo)</Text>
          {p.event && <Text style={s.ev}>Acontecendo agora: {p.event}</Text>}
          <Pressable style={s.btn} onPress={() => map.current?.goTo(p.id)}>
            <Text style={s.btnT}>{eta ? `Seguindo… chega em ${eta} min` : 'Ir agora'}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  f: { flex: 1 },
  top: { position: 'absolute', top: 52, left: 12, right: 12, flexDirection: 'row', gap: 6 },
  chip: { flex: 1, minHeight: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  on: { backgroundColor: '#FF8A3D' }, t: { fontWeight: '600', color: '#0E3B4F' }, tOn: { color: '#0E3B4F' },
  card: { position: 'absolute', left: 12, right: 12, bottom: 16, backgroundColor: '#fff', borderRadius: 20, padding: 16, gap: 6 },
  h: { fontSize: 20, fontWeight: '700', color: '#0E3B4F' }, bar: { height: 10, borderRadius: 6, backgroundColor: '#dde9e6', overflow: 'hidden' },
  ev: { backgroundColor: '#E0457B', color: '#fff', padding: 10, borderRadius: 12, fontWeight: '600', overflow: 'hidden' },
  btn: { minHeight: 44, borderRadius: 14, backgroundColor: '#1C7C86', alignItems: 'center', justifyContent: 'center' }, btnT: { color: '#fff', fontWeight: '600' },
  err: { position: 'absolute', top: 108, left: 12, right: 12, backgroundColor: '#E0457B', padding: 12, borderRadius: 12 }, errT: { color: '#fff' },
});
