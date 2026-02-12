<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css'

const props = defineProps({
  cards: { type: Array, default: () => [] },
  image1: { type: String, default: '' },
  image2: { type: String, default: '' },
})

const sliderOptions = {
  type: 'slide',
  perPage: 1,
  gap: '16px',
  pagination: false,
  arrows: false,
  padding: { left: 20, right: '30%' },
  drag: 'free',
  snap: true,
}
</script>

<template>
  <section class="pricing">
    <!-- Desktop grid -->
    <div class="pricing__grid">
      <div v-if="cards[0]" class="pricing__card pricing__card--text">
        <span class="pricing__badge">{{ cards[0].badge }}</span>
        <h3 class="pricing__subtitle">{{ cards[0].title }}</h3>
        <p style="white-space: pre-line">{{ cards[0].content }}</p>
      </div>
      <div class="pricing__card pricing__card--image">
        <img :src="image1" alt="">
      </div>
      <div class="pricing__card pricing__card--image">
        <img :src="image2" alt="">
      </div>
      <div v-if="cards[1]" class="pricing__card pricing__card--text">
        <span class="pricing__badge">{{ cards[1].badge }}</span>
        <h3 class="pricing__subtitle">{{ cards[1].title }}</h3>
        <p style="white-space: pre-line">{{ cards[1].content }}</p>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="pricing__slider">
      <SplideSlide v-if="cards[0]">
        <div class="pricing__card pricing__card--text">
          <span class="pricing__badge">{{ cards[0].badge }}</span>
          <h3 class="pricing__subtitle">{{ cards[0].title }}</h3>
          <p style="white-space: pre-line">{{ cards[0].content }}</p>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="pricing__card pricing__card--image">
          <img :src="image1" alt="">
        </div>
      </SplideSlide>
      <SplideSlide v-if="cards[1]">
        <div class="pricing__card pricing__card--text">
          <span class="pricing__badge">{{ cards[1].badge }}</span>
          <h3 class="pricing__subtitle">{{ cards[1].title }}</h3>
          <p style="white-space: pre-line">{{ cards[1].content }}</p>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="pricing__card pricing__card--image">
          <img :src="image2" alt="">
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

<style lang="scss" scoped>
.pricing {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  &__slider {
    display: none;
  }

  &__card {
    border-radius: 24px;
    overflow: hidden;
    height: 310px;

    &--text {
      background-color: var(--color-accent-light);
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.6;
      color: var(--color-text);
    }

    &--image {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }

  &__badge {
    display: inline-block;
    width: fit-content;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 30px;
    font-weight: 500;
    background-color: var(--color-primary);
    color: #fff;
    padding: 4px 16px;
    border-radius: 10px;
  }

  &__subtitle {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text);
  }
}

@media (max-width: 768px) {
  .pricing {
    &__grid {
      display: none;
    }

    &__slider {
      display: block;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__card {
      height: 310px;
      border-radius: 24px;

      &--text {
        padding: 24px;
        font-size: 16px;
      }
    }

    &__badge {
      font-size: 20px;
    }

    &__subtitle {
      font-size: 18px;
    }
  }
}
</style>
