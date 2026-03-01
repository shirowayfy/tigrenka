import { strapiPost } from './strapi'

export async function submitContactForm({ name, phone, message }) {
  return strapiPost('/api/contact-submissions', { name, phone, message })
}
