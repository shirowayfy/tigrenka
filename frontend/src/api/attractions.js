import { strapiGet, normalizeSingle } from './strapi'

export async function getAttractionsPage() {
  const res = await strapiGet('/api/attractions-page', { populate: '*' })
  return normalizeSingle(res)
}
