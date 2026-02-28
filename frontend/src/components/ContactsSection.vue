<script setup>
import { ref, onMounted } from 'vue'
import { getContactsPage } from '@/api/contacts'

const data = ref(null)
const loading = ref(true)

// При монтировании секции контактов запрашиваем адрес, телефон и тексты из Strapi
onMounted(async () => {
  try {
    data.value = await getContactsPage()
  } catch (e) {
    console.error('Failed to load contacts:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && data" class="contacts-section">
    <h1 class="contacts-section__title">Контакты</h1>

    <div class="contacts-section__card">
      <p><strong>Мы находимся:</strong></p>
      <p>{{ data.address }}</p>
      <p>Телефон: <a :href="`tel:${data.phone}`">{{ data.phone }}</a></p>
      <p v-if="data.vkLink">Вконтакте: <a :href="data.vkLink" class="contacts-section__link">тыкайте сюда</a></p>
    </div>

    <div class="contacts-section__card">
      <p><strong>{{ data.collaborationText || 'Мы всегда открыты для предложений и сотрудничества!' }}</strong><br>Свяжитесь с нами по указанным контактам.</p>
      <p>{{ data.socialText || 'Будьте всегда в центре новостей, узнавайте первыми о наших акциях и скидках.' }}<br>Подпишитесь на нас в соц сетях.</p>
    </div>

    <a v-if="data.offerLink" :href="data.offerLink" class="contacts-section__offer">Договор-публичная оферта на оказание услуг</a>
  </section>
</template>

<style lang="scss" scoped>
.contacts-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  &__title {
    font-family: 'Montserrat', sans-serif;
    font-size: 48px;
    font-weight: 800;
    color: #fff;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    background-color: var(--color-accent-light);
    border-radius: 20px;
    padding: 28px 32px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    color: var(--color-text);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
  }

  &__link {
    text-decoration: underline;
    font-weight: 700;
  }

  &__offer {
    font-size: 16px;
    font-weight: 500;
    text-decoration: underline;
    color: var(--color-text);
  }
}

@media (max-width: 768px) {
  .contacts-section {
    &__title {
      font-size: 32px;
    }

    &__card {
      padding: 20px;
      font-size: 14px;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}
</style>
