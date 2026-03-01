import { strapiGet, normalizeSingle } from './strapi'

export async function getContactsPage() {
  const res = await strapiGet('/api/contacts-page', { populate: '*' })
  return normalizeSingle(res)
}
