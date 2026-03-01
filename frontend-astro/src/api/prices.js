import { strapiGet, normalizeSingle } from './strapi'

export async function getPricesPage() {
  const res = await strapiGet('/api/prices-page', { populate: '*' })
  return normalizeSingle(res)
}
