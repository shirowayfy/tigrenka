<script setup>
import { ref, onMounted } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import SectionHeader from '@/components/SectionHeader.vue'
import { getReviews } from '@/api/collections'

const reviews = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    reviews.value = await getReviews()
  } catch (e) {
    console.error('Failed to load reviews:', e)
  } finally {
    loading.value = false
  }
})

const splideRef = ref(null)
const activeIndex = ref(0)

const sliderOptions = {
  type: 'loop',
  perPage: 1,
  gap: '24px',
  padding: { left: '20%', right: '20%' },
  focus: 'center',
  pagination: false,
  arrows: false,
  autoHeight: false,
  breakpoints: {
    768: {
      gap: '16px',
      padding: { left: 20, right: '20%' },
      focus: 0,
    },
  },
}

function onMove(splide, newIndex) {
  activeIndex.value = newIndex
}

function prev() {
  splideRef.value?.go('<')
}

function next() {
  splideRef.value?.go('>')
}

function goTo(index) {
  splideRef.value?.go(index)
}
</script>

<template>
  <section v-if="!loading && reviews.length" class="reviews">
    <SectionHeader title="Отзывы" subtitle="Ваши оценки нашим трудам" />

    <div class="reviews__carousel">
      <Splide ref="splideRef" :options="sliderOptions" @splide:move="onMove">
        <SplideSlide v-for="(review, i) in reviews" :key="review.id">
          <div class="reviews__slide">
            <div class="reviews__card">
              <p class="reviews__card-text">"{{ review.text }}"</p>
            </div>
            <div class="reviews__author">
              <p class="reviews__author-name">{{ review.author }}</p>
              <p class="reviews__author-date">{{ review.date }}</p>
            </div>
          </div>
        </SplideSlide>
      </Splide>

      <div class="reviews__controls">
        <button class="reviews__arrow" @click="prev" aria-label="Предыдущий отзыв">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="reviews__dots">
          <button
            v-for="(_, i) in reviews"
            :key="i"
            class="reviews__dot"
            :class="{ 'reviews__dot--active': i === activeIndex }"
            @click="goTo(i)"
            :aria-label="`Отзыв ${i + 1}`"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </button>
        </div>

        <button class="reviews__arrow" @click="next" aria-label="Следующий отзыв">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.reviews {
  &__carousel {
    background-color: var(--color-primary);
    border-radius: 24px;
    padding: 40px;
    overflow: hidden;
  }

  :deep(.splide__track) {
    overflow: visible;
  }

  :deep(.splide__slide) {
    display: flex;
  }

  &__slide {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__card {
    flex: 1;
    border: 2px solid var(--color-accent-light);
    border-radius: 32px;
    padding: 28px;
    position: relative;
    margin-bottom: 20px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 40px;
      width: 0;
      height: 0;
    }

    &::before {
      bottom: -18px;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-top: 18px solid var(--color-accent-light);
    }

    &::after {
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 16px solid var(--color-primary);
      left: 42px;
    }
  }

  &__card-text {
    font-size: 16px;
    line-height: 1.6;
    color: #fff;
  }

  &__author {
    padding: 20px 0 0 8px;
    color: #fff;

    &-name {
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: 18px;
      font-weight: 600;
    }

    &-date {
      font-size: 14px;
      margin-top: 4px;
      opacity: 0.8;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin-top: 32px;
  }

  &__arrow {
    color: #fff;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__dot {
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.3s;

    &--active {
      color: #fff;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

@media (max-width: 768px) {
  .reviews {
    &__carousel {
      padding: 24px 0;
      border-radius: 0;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__card {
      padding: 20px;
      border-radius: 24px;
    }

    &__card-text {
      font-size: 14px;
    }

    &__author {
      padding: 12px 0 0;

      &-name {
        font-size: 16px;
      }

      &-date {
        font-size: 13px;
      }
    }

    &__controls {
      display: none;
    }
  }
}
</style>
