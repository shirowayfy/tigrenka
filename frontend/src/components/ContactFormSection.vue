<script setup>
import { ref } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import tigerForm from '@/assets/images/tiger-form.png'
import { submitContactForm } from '@/api/contact-form'

const form = ref({
  name: '',
  phone: '',
  message: '',
})

const errors = ref({
  name: false,
  phone: false,
  message: false,
})

const showPopup = ref(false)
const submitting = ref(false)

async function onSubmit() {
  errors.value.name = !form.value.name.trim()
  errors.value.phone = !form.value.phone.trim()
  errors.value.message = !form.value.message.trim()

  if (errors.value.name || errors.value.phone || errors.value.message) return

  submitting.value = true
  try {
    await submitContactForm({
      name: form.value.name,
      phone: form.value.phone,
      message: form.value.message,
    })
    showPopup.value = true
    form.value = { name: '', phone: '', message: '' }
    setTimeout(() => { showPopup.value = false }, 3000)
  } catch (e) {
    console.error('Form submission failed:', e)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="contact-form">
    <SectionHeader title="Свяжитесь с нами" subtitle="Если у вас возникли вопросы или вы хотите устроить праздник" />
    <div class="contact-form__wrapper">
      <form class="contact-form__form" @submit.prevent="onSubmit">
        <div class="contact-form__field">
          <label class="contact-form__label">Имя*</label>
          <input v-model="form.name" type="text" class="contact-form__input" :class="{ 'contact-form__input--error': errors.name }" required>
        </div>
        <div class="contact-form__field">
          <label class="contact-form__label">Номер*</label>
          <input v-model="form.phone" type="tel" class="contact-form__input" :class="{ 'contact-form__input--error': errors.phone }" required>
        </div>
        <div class="contact-form__field">
          <label class="contact-form__label">Сообщение*</label>
          <textarea v-model="form.message" class="contact-form__textarea" :class="{ 'contact-form__input--error': errors.message }" rows="4" required></textarea>
        </div>
        <button type="submit" class="contact-form__button" :disabled="submitting">
          {{ submitting ? 'Отправка...' : 'Отправить запрос' }}
        </button>
      </form>
      <div class="contact-form__image">
        <img :src="tigerForm" alt="">
      </div>
    </div>
  </section>

  <Transition name="popup">
    <div v-if="showPopup" class="popup" @click="showPopup = false">
      <div class="popup__content" @click.stop>
        <button class="popup__close" @click="showPopup = false">&times;</button>
        <p class="popup__text">Ваш запрос успешно отправлен!</p>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.contact-form {
  &__wrapper {
    position: relative;
    display: flex;
    background-color: var(--color-accent-light);
    border-radius: 45px;
    padding: 48px;
    overflow: hidden;
  }

  &__form {
    flex: 1;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 16px;
    font-weight: 500;
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 16px 20px;
    border: none;
    border-radius: 12px;
    background-color: #fff;
    font-size: 16px;
    outline: none;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0 0 0 2px var(--color-primary);
    }

    &--error {
      box-shadow: 0 0 0 2px #e74c3c;
    }
  }

  &__textarea {
    resize: none;
    min-height: 120px;
  }

  &__button {
    padding: 20px;
    background-color: var(--color-text);
    color: #fff;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 18px;
    font-weight: 600;
    border-radius: 16px;
    transition: opacity 0.3s;
    max-width: 520px;

    &:hover {
      opacity: 0.85;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__image {
    position: absolute;
    right: -100px;
    top: 0;
    bottom: 0;
    width: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left;
    }
  }
}

@media (max-width: 768px) {
  .contact-form {
    &__wrapper {
      border-radius: 24px;
      padding: 24px;
    }

    &__form {
      max-width: 100%;
      gap: 16px;
    }

    &__image {
      display: none;
    }

    &__input,
    &__textarea {
      padding: 14px 16px;
      font-size: 14px;
    }

    &__button {
      font-size: 16px;
      padding: 16px;
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    position: relative;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px 48px;
    max-width: 400px;
    width: 90%;
    text-align: center;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 24px;
    color: var(--color-text-secondary);
    transition: color 0.3s;

    &:hover {
      color: var(--color-text);
    }
  }

  &__text {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
