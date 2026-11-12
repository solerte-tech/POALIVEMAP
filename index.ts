import Fastify from 'fastify';
import { readFileSync } from 'node:fs';
const pois = JSON.parse(readFileSync(new URL('../../../data/pois.json', import.meta.url), 'utf8'));
const app = Fastify();
app.get('/pois', async () => pois);
app.listen({ port: 3000 });
