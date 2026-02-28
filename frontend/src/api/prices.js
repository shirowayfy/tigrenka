import { strapiGet, normalizeSingle } from './strapi'

// Получаем данные страницы "Цены" из Strapi (single type "prices-page")
export async function getPricesPage() {
  const res = await strapiGet('/api/prices-page', { populate: '*' })
  return normalizeSingle(res)
}
