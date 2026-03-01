import { strapiGet, normalizeCollection } from './strapi'

export async function getFaqs() {
  const res = await strapiGet('/api/faqs', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

export async function getTeamMembers() {
  const res = await strapiGet('/api/team-members', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

export async function getReviews() {
  const res = await strapiGet('/api/reviews', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

export async function getAdvantageCards() {
  const res = await strapiGet('/api/advantage-cards', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}

export async function getPricingCards() {
  const res = await strapiGet('/api/pricing-cards', { sort: 'order:asc', populate: '*' })
  return normalizeCollection(res)
}
