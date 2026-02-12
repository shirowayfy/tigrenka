<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="banner">
    <div class="banner__inner">
      <div class="banner__content">
        <h1 class="banner__title">{{ title }}</h1>
        <p v-if="text" class="banner__text">{{ text }}</p>
        <RouterLink v-if="buttonText" :to="buttonLink" class="banner__button">
          {{ buttonText }}
        </RouterLink>
      </div>
      <div class="banner__image">
        <img :src="image" alt="">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__content {
    flex: 1;
    max-width: 560px;
  }

  &__title {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 58px;
    font-weight: 700;
    line-height: 150%;
  }

  &__text {
    margin-top: 16px;
    font-size: 24px;
    line-height: 1.5;
    opacity: 0.7;
  }

  &__button {
    display: inline-block;
    margin-top: 72px;
    padding: 20px 45px;
    background-color: var(--color-primary);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border-radius: 20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  &__image {
    flex-shrink: 0;
    width: 380px;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}

@media (max-width: 768px) {
  .banner {
    &__inner {
      flex-direction: column-reverse;
      gap: 24px;
      padding-top: 24px;
      padding-bottom: 24px;
    }

    &__content {
      text-align: center;
    }

    &__title {
      font-size: 28px;
    }

    &__text {
      font-size: 16px;
    }

    &__button {
      margin-top: 32px;
      padding: 16px 36px;
      font-size: 16px;
    }

    &__image {
      width: 220px;
    }
  }
}
</style>
