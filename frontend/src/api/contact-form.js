import { strapiPost } from './strapi'

// Отправляем данные формы обратной связи в коллекцию "contact-submissions"
export async function submitContactForm({ name, phone, message }) {
  return strapiPost('/api/contact-submissions', { name, phone, message })
}
