import { strapiGet, normalizeSingle } from './strapi'

export async function getFooter() {
  const res = await strapiGet('/api/footer', { populate: '*' })
  return normalizeSingle(res)
}
