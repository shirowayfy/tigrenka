import { strapiGet, normalizeSingle } from './strapi'

export async function getHomePage() {
  const res = await strapiGet('/api/home-page', { populate: '*' })
  return normalizeSingle(res)
}
