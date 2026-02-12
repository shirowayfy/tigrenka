<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css'

const props = defineProps({
  id: { type: String, default: undefined },
  description: { type: String, default: '' },
  features: { type: String, default: '' },
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
  <section :id="id" class="xbox">
    <SectionHeader title="XBOX" />

    <!-- Desktop grid -->
    <div class="xbox__grid">
      <div class="xbox__card xbox__card--text">
        <p>{{ description || 'Современная арена, где каждая деталь, каждый звук и каждое движение становятся частью вашей захватывающей истории.' }}</p>
      </div>
      <div class="xbox__card xbox__card--image">
        <img :src="image1" alt="Xbox">
      </div>
      <div class="xbox__card xbox__card--image">
        <img :src="image2" alt="Xbox">
      </div>
      <div class="xbox__card xbox__card--text">
        <p style="white-space: pre-line">{{ features || 'бесшовная реакция\nпространственный звук\nэмоциональный драйв\nкомандные игры до 8 человек\n13 вариантов игры от 6 до 99 лет' }}</p>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="xbox__slider">
      <SplideSlide>
        <div class="xbox__card xbox__card--text">
          <p>{{ description || 'Современная арена, где каждая деталь, каждый звук и каждое движение становятся частью вашей захватывающей истории.' }}</p>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="xbox__card xbox__card--image">
          <img :src="image1" alt="Xbox">
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="xbox__card xbox__card--text">
          <p style="white-space: pre-line">{{ features || 'бесшовная реакция\nпространственный звук\nэмоциональный драйв\nкомандные игры до 8 человек\n13 вариантов игры от 6 до 99 лет' }}</p>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="xbox__card xbox__card--image">
          <img :src="image2" alt="Xbox">
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

<style lang="scss" scoped>
.xbox {
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
      justify-content: center;
      font-size: 30px;
      font-weight: 500;
      line-height: 1.4;
      color: var(--color-text);
    }

    &--image {
      background-color: var(--color-accent-light);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
    }
  }
}

@media (max-width: 768px) {
  .xbox {
    &__grid {
      display: none;
    }

    &__slider {
      display: block;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__card {
      height: 260px;
      border-radius: 24px;

      &--text {
        padding: 24px;
        font-size: 16px;
      }
    }
  }
}
</style>
