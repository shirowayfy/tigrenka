import { strapiGet, normalizeCollection } from './strapi'

// Загружаем коллекцию вопросов‑ответов для блока FAQ
export async function getFaqs() {
  const res = await strapiGet('/api/faqs', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

// Загружаем список участников команды
export async function getTeamMembers() {
  const res = await strapiGet('/api/team-members', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

// Загружаем отзывы посетителей
export async function getReviews() {
  const res = await strapiGet('/api/reviews', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

// Загружаем карточки преимуществ на главной
export async function getAdvantageCards() {
  const res = await strapiGet('/api/advantage-cards', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

// Загружаем карточки с тарифами/ценами
export async function getPricingCards() {
  const res = await strapiGet('/api/pricing-cards', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}
