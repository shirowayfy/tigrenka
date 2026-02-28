<script setup>
import { ref, onMounted, computed } from 'vue'
import { getFooter } from '@/api/footer'

const data = ref(null)
const loading = ref(true)
const isOpen = ref(false)
const showLabel = ref(true)

// При монтировании выбираем данные футера и показываем подсказку "Свяжитесь с нами"
onMounted(async () => {
  try {
    data.value = await getFooter()
  } catch (e) {
    console.error('Failed to load floating contacts footer data:', e)
  } finally {
    loading.value = false
    // Автоматически скрываем текстовую подсказку через 5 секунд
    setTimeout(() => {
      showLabel.value = false
    }, 5000)
  }
})



// Открываем/закрываем стек иконок контактов
function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div v-if="!loading && data" class="floating-contacts">
    <transition name="floating-label">
      <div
        v-if="showLabel && !isOpen"
        class="floating-contacts__label"
      >
        Свяжитесь с нами!
      </div>
    </transition>

    <div class="floating-contacts__stack">
      <transition-group name="floating-item">
        <a
          v-if="isOpen"
          key="phone"
          :href="`tel:${data.phone}`"
          class="floating-contacts__btn floating-contacts__btn--phone"
          aria-label="Позвонить"
        >
          ☎
        </a>
        
        <a
          v-if="isOpen && data.vkLink"
          key="vk"
          :href="data.vkLink"
          target="_blank"
          rel="noopener"
          class="floating-contacts__btn floating-contacts__btn--vk"
          aria-label="ВКонтакте"
        >
          vk
        </a>
        <a
          v-if="isOpen && data.telegramLink"
          key="tg"
          :href="data.telegramLink"
          target="_blank"
          rel="noopener"
          class="floating-contacts__btn floating-contacts__btn--tg"
          aria-label="Telegram"
        >
          ↗
        </a>
      </transition-group>

      <button
        type="button"
        class="floating-contacts__btn floating-contacts__btn--main"
        :class="{ 'floating-contacts__btn--open': isOpen }"
        @click="toggle"
        aria-label="Открыть контакты"
      >
        <span v-if="!isOpen">💬</span>
        <span v-else>×</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-contacts {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 120;
  display: flex;
  align-items: center;
  gap: 12px;

  &__label {
    padding: 8px 14px;
    background-color: #263238;
    color: #fff;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    position: relative;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent transparent #263238;
    }
  }

  &__stack {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 10px;
  }

  &__btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    }
  }

  &__btn--main {
    background-color:rgb(255, 135, 23);
  }

  &__btn--open {
    background-color: #ffffff;
    color: #222;
  }

  &__btn--phone {
    background-color: #000000;
  }

  &__btn--whatsapp {
    background-color: #25d366;
  }

  &__btn--vk {
    background-color: #0077ff;
    font-size: 16px;
    font-weight: 700;
  }

  &__btn--tg {
    background-color: #28a8ea;
  }
}

.floating-item-enter-active,
.floating-item-leave-active {
  transition: all 0.2s ease;
}

.floating-item-enter-from,
.floating-item-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.8);
}

.floating-label-enter-active,
.floating-label-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.floating-label-enter-from,
.floating-label-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .floating-contacts {
    right: 12px;
    bottom: 16px;

    &__btn {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }

    &__label {
      display: none;
    }
  }
}
</style>

