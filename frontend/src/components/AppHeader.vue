<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

router.afterEach(() => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <RouterLink to="/" class="header__logo">
        <img src="@/assets/images/logo.png" alt="Логотип" class="header__logo-icon">
        Игровая<br>тигра
      </RouterLink>
      <button class="header__burger" :class="{ 'header__burger--active': isMenuOpen }" @click="toggleMenu" aria-label="Меню">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <RouterLink to="/" class="header__link" data-text="О парке">О парке</RouterLink>
        <RouterLink to="/attractions" class="header__link" data-text="Аттракционы">Аттракционы</RouterLink>
        <RouterLink to="/prices" class="header__link" data-text="Цены">Цены</RouterLink>
        <RouterLink to="/contacts" class="header__link" data-text="Контакты">Контакты</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 32px;
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    z-index: 11;
  }

  &__logo-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }

  &__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 32px;
    height: 32px;
    z-index: 11;

    span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      border-radius: 1px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    &--active {
      span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  &__link {
    position: relative;
    padding-bottom: 4px;
    font-size: 16px;
    font-weight: 500;
    transition: opacity 0.3s;

    &::before {
      content: attr(data-text);
      display: block;
      font-weight: 700;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    &.router-link-exact-active {
      font-weight: 700;
    }
  }
}

@media (max-width: 768px) {
  .header {
    &__burger {
      display: flex;
    }

    &__nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      background-color: #fff;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;

      &--open {
        opacity: 1;
        visibility: visible;
      }
    }

    &__link {
      font-size: 24px;
    }

    &__logo {
      gap: 16px;
      font-size: 24px;
    }

    &__logo-icon {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
