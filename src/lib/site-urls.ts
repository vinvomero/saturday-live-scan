import { getCollection, type CollectionEntry } from 'astro:content';

export function originFromSite(site: URL | undefined): URL {
  return site ?? new URL('https://saturdaylivescan.com');
}

export function pageUrl(site: URL | undefined, slug = ''): string {
  const base = import.meta.env.BASE_URL;
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const path = clean ? `${base}${clean}/` : base;
  return new URL(path, originFromSite(site)).href;
}

export async function cityEntries(): Promise<CollectionEntry<'cities'>[]> {
  return (await getCollection('cities')).sort((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );
}

export function latestUpdated(cities: CollectionEntry<'cities'>[]): string {
  return cities.map((c) => c.data.updated).sort().at(-1) ?? '2026-08-29';
}
