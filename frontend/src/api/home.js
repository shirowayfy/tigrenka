import { strapiGet, normalizeSingle } from './strapi'

// Получаем данные главной страницы из Strapi (single type "home-page")
export async function getHomePage() {
  const res = await strapiGet('/api/home-page', { populate: '*' })
  return normalizeSingle(res)
}
