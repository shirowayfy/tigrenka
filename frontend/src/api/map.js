import { strapiGet, normalizeSingle } from './strapi'

export async function getMapSection() {
  const res = await strapiGet('/api/map-section', { populate: '*' })
  return normalizeSingle(res)
}
