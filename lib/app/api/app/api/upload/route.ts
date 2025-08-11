// Fichier neutralisé pour éviter l'erreur de build
export const runtime = 'nodejs';
export async function POST() {
  return new Response(JSON.stringify({ ok: true, disabled: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
