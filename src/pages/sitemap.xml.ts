export function GET() {
  const posts = Object.values(import.meta.glob('./writing/*.md', { eager: true })) as any[];
  const paths = ['/', '/about/', '/work/', '/research/', '/writing/', ...posts.filter(p=>!p.frontmatter.draft).map(p=>p.url)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>https://khataei.github.io${p}</loc></url>`).join('')}</urlset>`, {headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
