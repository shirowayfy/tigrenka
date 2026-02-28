import { strapiGet, normalizeSingle } from './strapi'

// Получаем данные страницы "Контакты" из Strapi (single type "contacts-page")
export async function getContactsPage() {
  const res = await strapiGet('/api/contacts-page', { populate: '*' })
  return normalizeSingle(res)
}
