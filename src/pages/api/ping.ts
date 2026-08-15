export async function GET({ url }) {
  const domain = url.searchParams.get('domain');
  if (!domain) {
    return new Response(JSON.stringify({ error: 'missing domain' }), { status: 400 });
  }
  const target = `https://${domain}/?t=${Date.now()}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const start = Date.now();
  try {
    const resp = await fetch(target, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok) throw new Error();
    const end = Date.now();
    return new Response(JSON.stringify({ delay: end - start }));
  } catch {
    clearTimeout(timeout);
    // 重试一次
    const controller2 = new AbortController();
    const timeout2 = setTimeout(() => controller2.abort(), 5000);
    const start2 = Date.now();
    try {
      const resp2 = await fetch(target, { method: 'HEAD', signal: controller2.signal });
      clearTimeout(timeout2);
      if (!resp2.ok) throw new Error();
      const end2 = Date.now();
      return new Response(JSON.stringify({ delay: end2 - start2 }));
    } catch {
      clearTimeout(timeout2);
      return new Response(JSON.stringify({ delay: -1 }));
    }
  }
}
