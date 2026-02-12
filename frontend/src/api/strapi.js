const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

export async function strapiGet(path, params = {}) {
  const url = new URL(path, STRAPI_URL)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export async function strapiPost(path, body) {
  const url = new URL(path, STRAPI_URL)

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: body }),
  })
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export function strapiMedia(media) {
  if (!media?.data?.attributes?.url) return ''
  const mediaUrl = media.data.attributes.url
  if (mediaUrl.startsWith('http')) return mediaUrl
  return `${STRAPI_URL}${mediaUrl}`
}

export function normalizeCollection(response) {
  if (!response?.data) return []
  return response.data.map(item => ({
    id: item.id,
    ...item.attributes,
  }))
}

export function normalizeSingle(response) {
  if (!response?.data) return null
  return {
    id: response.data.id,
    ...response.data.attributes,
  }
}
