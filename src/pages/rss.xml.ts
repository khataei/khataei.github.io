export async function GET() {
  const escape = (s: string) => s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
  const allPosts = Object.values(import.meta.glob('./writing/*.md', { eager: true })) as any[];
  const posts = allPosts.filter(p=>!p.frontmatter.draft).sort((a,b)=>new Date(b.frontmatter.date).getTime()-new Date(a.frontmatter.date).getTime());
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Javad Khataei — Writing</title><link>https://khataei.github.io/writing/</link><description>Notes on machine learning, research, and things learned along the way.</description><language>en</language>${posts.map(p=>`<item><title>${escape(p.frontmatter.title)}</title><description>${escape(p.frontmatter.description || '')}</description><link>https://khataei.github.io${escape(p.url)}</link><guid>https://khataei.github.io${escape(p.url)}</guid><pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`, {headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
