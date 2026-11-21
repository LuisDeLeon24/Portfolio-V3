const limits = { awards: 3, certs: 4, projects: 5, community: 3, publications: 2 }

export function selectFeatured<T extends { featured?: boolean }>(
  items: readonly T[],
  category: keyof typeof limits,
): T[] {
  return items.filter(item => item.featured).slice(0, limits[category])
}
