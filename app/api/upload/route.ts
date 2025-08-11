// app/api/upload/route.ts — version minimale pour débloquer le build
export const runtime = 'nodejs';

export async function POST() {
  return new Response(JSON.stringify({ ok: true, note: 'route minimale' }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
}
