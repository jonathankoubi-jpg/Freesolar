import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ct = req.headers.get('content-type') || '';
  if (!ct.includes('multipart/form-data')) {
    return NextResponse.json({ ok:false, error:'Content-Type must be multipart/form-data' }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const kind = String(form.get('kind') || 'misc');
  const email = String(form.get('email') || 'anonymous@example.com');

  if (!file) return NextResponse.json({ ok:false, error:'Missing file' }, { status: 400 });

  // 1) garantir/obtenir un profile via l'email
  const { data: prof, error: e1 } = await supabaseAdmin
    .from('profiles')
    .upsert({ email }, { onConflict: 'email' })
    .select('id')
    .single();
  if (e1) return NextResponse.json({ ok:false, error:e1.message }, { status: 500 });

  // 2) upload storage
  const buf = Buffer.from(await file.arrayBuffer());
  const safeName = `${Date.now()}_${file.name}`.replace(/[^a-zA-Z0-9._-]/g,'_');
  const path = `${prof.id}/${kind}/${safeName}`;

  const { error: e2 } = await supabaseAdmin
    .storage.from('uploads')
    .upload(path, buf, { contentType: file.type || 'application/octet-stream' });
  if (e2) return NextResponse.json({ ok:false, error:e2.message }, { status: 500 });

  // 3) trace en base
  const { error: e3 } = await supabaseAdmin
    .from('uploads')
    .insert({ profile_id: prof.id, kind, url: path });
  if (e3) console.warn('[uploads insert]', e3.message);

  // 4) url signée 24h
  const { data: signed, error: e4 } = await supabaseAdmin
    .storage.from('uploads')
    .createSignedUrl(path, 60*60*24);
  if (e4) return NextResponse.json({ ok:false, error:e4.message }, { status: 500 });

  return NextResponse.json({ ok:true, path, url: signed?.signedUrl });
}
