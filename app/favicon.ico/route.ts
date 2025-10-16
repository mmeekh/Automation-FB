const ICON_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Yrx7+0AAAAASUVORK5CYII=';

export function GET() {
  const body = Buffer.from(ICON_BASE64, 'base64');
  return new Response(body, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=86400, immutable',
    },
  });
}
