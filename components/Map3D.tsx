import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { buildMap3dHtml } from '../services/map3dHtml';

export type Modo = 'pe' | 'carro' | 'uber' | 'pat';
export type Map3DPlace = { id: string; name: string; lat: number; lng: number; crowd?: number; event?: string };
export type Map3DHandle = { goTo: (id: string, route?: { lat: number; lng: number }[]) => void };
type Props = {
  apiKey: string; places: Map3DPlace[]; modo: Modo;
  onSelect?: (id: string) => void; onEta?: (minutes: number) => void; onArrive?: (id: string) => void; onError?: (t: string) => void;
};

const Map3D = forwardRef<Map3DHandle, Props>(({ apiKey, places, modo, onSelect, onEta, onArrive, onError }, ref) => {
  const web = useRef<WebView>(null);
  const frame = useRef<HTMLIFrameElement | null>(null);
  const ready = useRef(false);
  const html = useMemo(() => buildMap3dHtml(apiKey), [apiKey]);

  const send = useCallback((cmd: object) => {
    if (Platform.OS === 'web') frame.current?.contentWindow?.postMessage(JSON.stringify(cmd), '*');
    else web.current?.injectJavaScript(`window.__cmd&&window.__cmd(${JSON.stringify(cmd)});true;`);
  }, []);

  const handle = useCallback((raw: string) => {
    let m: any; try { m = JSON.parse(raw); } catch { return; }
    if (m.type === 'ready') { ready.current = true; send({ type: 'places', places }); send({ type: 'mode', mode: modo }); }
    else if (m.type === 'select') onSelect?.(m.id);
    else if (m.type === 'eta') onEta?.(m.minutes);
    else if (m.type === 'arrived') onArrive?.(m.id);
    else if (m.type === 'error') onError?.(m.text);
  }, [places, modo, send, onSelect, onEta, onArrive, onError]);

  useEffect(() => { if (ready.current) send({ type: 'places', places }); }, [places, send]);
  useEffect(() => { if (ready.current) send({ type: 'mode', mode: modo }); }, [modo, send]);
  useImperativeHandle(ref, () => ({ goTo: (id, route) => send({ type: 'goTo', id, route }) }), [send]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const fn = (e: MessageEvent) => { if (e.source === frame.current?.contentWindow && typeof e.data === 'string') handle(e.data); };
    window.addEventListener('message', fn); return () => window.removeEventListener('message', fn);
  }, [handle]);

  if (Platform.OS === 'web') {
    const Frame: any = 'iframe';
    return <View style={s.f}><Frame ref={frame} srcDoc={html} style={{ border: 0, width: '100%', height: '100%' }} allow="geolocation; fullscreen" /></View>;
  }
  return (
    <View style={s.f}>
      <WebView ref={web} originWhitelist={['*']} source={{ html, baseUrl: 'https://poalivemap.app' }} javaScriptEnabled
        onMessage={e => handle(e.nativeEvent.data)} style={s.f} />
    </View>
  );
});
export default Map3D;
const s = StyleSheet.create({ f: { flex: 1, backgroundColor: '#0E3B4F' } });
