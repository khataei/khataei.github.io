import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/data/github.json', import.meta.url);
const username = 'khataei';
async function get(url, json = true) {
  const response = await fetch(url, {headers:{'User-Agent':'khataei-personal-site'}, signal:AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  return json ? response.json() : response.text();
}
try {
  const [profile, calendar] = await Promise.all([
    get(`https://api.github.com/users/${username}`),
    get(`https://github.com/users/${username}/contributions`, false),
  ]);
  const repos = [];
  for (let page=1; ;page++) {
    const batch = await get(`https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const tips = new Map([...calendar.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)].map(([,attrs,text]) => [attrs.match(/\bfor="([^"]+)"/)?.[1], text.replace(/<[^>]*>/g,'').trim()]));
  const days = [...calendar.matchAll(/<td\b([^>]*\bdata-date="[^"]+"[^>]*)>/g)].map(([,attrs]) => {
    const date = attrs.match(/\bdata-date="([\d-]+)"/)?.[1];
    const id = attrs.match(/\bid="([^"]+)"/)?.[1];
    const level = Number(attrs.match(/\bdata-level="(\d)"/)?.[1]);
    const label = tips.get(id) || '';
    const match = label.match(/^([\d,]+) contributions? on /);
    if (!date || !Number.isInteger(level) || level < 0 || level > 4 || (!match && !label.startsWith('No contributions on '))) throw new Error('Unrecognized GitHub calendar markup');
    return {date,level,count:match ? Number(match[1].replaceAll(',','')) : 0};
  }).sort((a,b)=>a.date.localeCompare(b.date));
  if (days.length < 350 || days.length > 371 || new Set(days.map(d=>d.date)).size !== days.length) throw new Error('Incomplete contribution calendar');
  let longestStreak=0, streak=0;
  for (const day of days) {streak=day.count ? streak+1 : 0; longestStreak=Math.max(longestStreak,streak);}
  let currentStreak=0;
  let end=days.length-1;
  if (!days[end].count) end--; // An unfinished day need not break yesterday's streak.
  for (let i=end;i>=0 && days[i].count;i--) currentStreak++;
  const own = repos.filter(repo=>!repo.fork);
  const counts = new Map();
  for (const repo of own) if (repo.language) counts.set(repo.language,(counts.get(repo.language)||0)+1);
  const languages = [...counts].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count || a.name.localeCompare(b.name));
  const data = {username,updatedAt:new Date().toISOString(),publicRepos:profile.public_repos,stars:own.reduce((n,r)=>n+r.stargazers_count,0),contributions:days.reduce((n,d)=>n+d.count,0),currentStreak,longestStreak,languages,days};
  await writeFile(file,JSON.stringify(data,null,2)+'\n');
  console.log(`Refreshed public GitHub stats: ${days.length} calendar days, ${data.contributions} contributions, ${data.publicRepos} public repositories.`);
} catch(error) {
  // A GitHub outage must not prevent an article from publishing. Keep the dated snapshot.
  const cached = JSON.parse(await readFile(file,'utf8').catch(()=> 'null'));
  if (!cached?.days?.length) throw error;
  console.warn(`GitHub refresh unavailable (${error.message}); retained snapshot from ${cached.updatedAt}.`);
}
