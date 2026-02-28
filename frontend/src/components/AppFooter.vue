<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getFooter } from '@/api/footer'

const data = ref(null)
const loading = ref(true)
const email = ref('')
const showPopup = ref(false)

// При монтировании футера загружаем контакты и ссылки соцсетей из Strapi
onMounted(async () => {
  try {
    data.value = await getFooter()
  } catch (e) {
    console.error('Failed to load footer:', e)
  } finally {
    loading.value = false
  }
})

// Обрабатываем отправку формы подписки и показываем всплывающее сообщение
function handleSubscribe() {
  showPopup.value = true
  email.value = ''
  setTimeout(() => { showPopup.value = false }, 3000)
}
</script>

<template>
  <footer v-if="!loading && data" class="footer">
    <div class="footer__inner container">
      <div class="footer__top">
        <RouterLink to="/" class="footer__logo">
          <img src="@/assets/images/logo.png" alt="Логотип" class="footer__logo-icon">
          Игровая<br>тигра
        </RouterLink>
        <nav class="footer__nav">
          <RouterLink to="/" class="footer__link">О парке</RouterLink>
          <RouterLink to="/attractions" class="footer__link">Аттракционы</RouterLink>
          <RouterLink to="/prices" class="footer__link">Цены</RouterLink>
          <RouterLink to="/contacts" class="footer__link">Контакты</RouterLink>
        </nav>
        <div class="footer__socials">
          <a v-if="data.vkLink" :href="data.vkLink" class="footer__social" aria-label="ВКонтакте">
            <img src="@/assets/images/socials/vk.png" alt="VK">
          </a>
          <a v-if="data.instagramLink" :href="data.instagramLink" class="footer__social" aria-label="Instagram">
            <img src="@/assets/images/socials/inst.png" alt="Instagram">
          </a>
          <a v-if="data.telegramLink" :href="data.telegramLink" class="footer__social" aria-label="Telegram">
            <img src="@/assets/images/socials/tg.png" alt="Telegram">
          </a>
        </div>
      </div>

      <div class="footer__middle">
        <div class="footer__contacts">
          <h3 class="footer__heading">Свяжитесь с нами</h3>
          <div class="footer__info">
            <p>Телефон:<br><a :href="`tel:${data.phone}`">{{ data.phone }}</a></p>
            <p>Адрес: {{ data.address }}</p>
          </div>
        </div>
        <div class="footer__subscribe">
          <form class="footer__form" @submit.prevent="handleSubscribe">
            <input v-model="email" type="email" class="footer__input" placeholder="Почта" required>
            <button type="submit" class="footer__button">Подписаться</button>
          </form>
        </div>
      </div>

      <hr class="footer__divider">

      <div class="footer__bottom">
        <span>{{ data.copyright || '©2025 TigraIgra' }}</span>
        <span>Все права защищены</span>
      </div>
    </div>
  </footer>

  <Transition name="popup">
    <div v-if="showPopup" class="popup" @click="showPopup = false">
      <div class="popup__content" @click.stop>
        <button class="popup__close" @click="showPopup = false">&times;</button>
        <p class="popup__text">Вы успешно подписались на рассылку!</p>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #2A2A2A;
  color: #fff;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 40px 40px 0 0;
    padding: 48px 40px 40px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 32px;
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #fff;
  }

  &__logo-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  &__link {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    transition: color 0.3s;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__social {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s;

    img {
      width: 22px;
      height: 22px;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  &__middle {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 40px;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__heading {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    padding: 6px 16px;
    border: 2px solid var(--color-primary);
    border-radius: 30px;
    color: var(--color-primary);
    width: fit-content;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;

    a {
      color: #fff;
      transition: color 0.3s;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__subscribe {
    display: flex;
    align-items: center;
    align-self: center;
  }

  &__form {
    display: flex;
    align-items: center;
    background-color: var(--color-primary);
    border-radius: 16px;
    padding: 24px;
    gap: 12px;
  }

  &__input {
    padding: 14px 24px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    min-width: 240px;
    outline: none;
    background-color: #fff;
    color: var(--color-text);

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }

  &__button {
    padding: 14px 32px;
    background-color: #2A2A2A;
    color: #fff;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1a1a1a;
    }
  }

  &__divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  &__bottom {
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 16px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .footer {
    &__inner {
      gap: 28px;
      border-radius: 24px 24px 0 0;
      padding: 28px 16px 20px;
    }

    &__top {
      flex-wrap: wrap;
      gap: 20px;
    }

    &__logo {
      gap: 12px;
      font-size: 20px;
    }

    &__logo-icon {
      width: 40px;
      height: 40px;
    }

    &__nav {
      display: none;
    }

    &__socials {
      margin-left: auto;
    }

    &__middle {
      flex-direction: column;
      gap: 24px;
    }

    &__subscribe {
      width: 100%;
    }

    &__heading {
      font-size: 14px;
    }

    &__info {
      font-size: 14px;
    }

    &__form {
      flex-direction: column;
      width: 100%;
      padding: 16px;
    }

    &__input {
      min-width: unset;
      width: 100%;
      padding: 12px 20px;
      font-size: 14px;
    }

    &__button {
      width: 100%;
      text-align: center;
      padding: 12px 24px;
      font-size: 14px;
    }

    &__bottom {
      flex-direction: column;
      gap: 6px;
      font-size: 13px;
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
