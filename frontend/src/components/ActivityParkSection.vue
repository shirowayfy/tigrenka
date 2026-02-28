<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css'

const props = defineProps({
  id: { type: String, default: undefined },
  label: { type: String, default: '' },
  number: { type: String, default: '' },
  unit: { type: String, default: '' },
  description: { type: String, default: '' },
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
  <section :id="id" class="activity-park">
    <SectionHeader title="Активити парк" />

    <!-- Desktop grid -->
    <div class="activity-park__grid">
      <div class="activity-park__card activity-park__card--text">
        <p class="activity-park__label">{{ label || 'Для разных возрастов' }}</p>
        <div class="activity-park__value">
          <p class="activity-park__number">{{ number || '6' }}</p>
          <p class="activity-park__unit">{{ unit || 'игровых зон' }}</p>
        </div>
      </div>
      <div class="activity-park__card activity-park__card--image">
        <img :src="image1" alt="Тигра">
      </div>
      <div class="activity-park__card activity-park__card--image">
        <img :src="image2" alt="Игровая зона">
      </div>
      <div class="activity-park__card activity-park__card--text activity-park__card--desc">
        <p>{{ description || 'большой лабиринт, домики на столбах, горки, батутная арена, бассейн с шарами, мячи, конструктор, модули, качели' }}</p>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="activity-park__slider">
      <SplideSlide>
        <div class="activity-park__card activity-park__card--text">
          <p class="activity-park__label">{{ label || 'Для разных возрастов' }}</p>
          <div class="activity-park__value">
            <p class="activity-park__number">{{ number || '6' }}</p>
            <p class="activity-park__unit">{{ unit || 'игровых зон' }}</p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="activity-park__card activity-park__card--image">
          <img :src="image1" alt="Тигра">
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="activity-park__card activity-park__card--text activity-park__card--desc">
          <p>{{ description || 'большой лабиринт, домики на столбах, горки, батутная арена, бассейн с шарами, мячи, конструктор, модули, качели' }}</p>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="activity-park__card activity-park__card--image">
          <img :src="image2" alt="Игровая зона">
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

<style lang="scss" scoped>
.activity-park {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  &__slider {
    display: none;
  }

  &__card {
    transition: all 0.4s ease;
    cursor: pointer;
    border-radius: 24px;
    height: 310px;
    overflow: hidden;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 40px rgba(255, 150, 23, 0.3);
  }

    &--text {
      background-color: var(--color-accent-light);
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &--image {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    &--desc {
      font-size: 30px;
      font-weight: 500;
      line-height: 1.4;
      color: var(--color-text);
      justify-content: center;
    }
  }

  &__label {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 30px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__number {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 128px;
    font-weight: 900;
    line-height: 0.75;
    color: var(--color-text);
  }

  &__unit {
    font-size: 36px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text);
  }
}

@media (max-width: 768px) {
  .activity-park {
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
      }

      &--desc {
        font-size: 16px;
      }
    }

    &__label {
      font-size: 22px;
    }

    &__number {
      font-size: 56px;
    }

    &__unit {
      font-size: 24px;
    }
  }
}
</style>
