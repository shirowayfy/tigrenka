<script setup>
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css'
import { getAdvantageCards } from '@/api/collections'
import { getHomePage } from '@/api/home'
import { strapiMedia } from '@/api/strapi'

const cards = ref([])
const featured = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const [cardsData, pageData] = await Promise.all([
      getAdvantageCards(),
      getHomePage(),
    ])
    cards.value = cardsData
    featured.value = pageData
  } catch (e) {
    console.error('Failed to load advantages:', e)
  } finally {
    loading.value = false
  }
})

const sliderOptions = {
  type: 'loop',
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
  <section v-if="!loading && cards.length" class="advantages">
    <SectionHeader title="Наши преимущества" subtitle="Почему у нас Вам и вашим детям будет комфортно и весело" />

    <!-- Desktop grid -->
    <div class="advantages__grid">
      <div v-for="card in cards" :key="card.id" class="advantages__card">
        <div class="advantages__label-wrap"><span class="advantages__label">{{ card.label }}</span></div>
        <div v-if="card.number" class="advantages__bottom">
          <div class="advantages__value">
            <span class="advantages__number">{{ card.number }}</span>
            <span class="advantages__unit">{{ card.unit }}</span>
          </div>
        </div>
        <img :src="strapiMedia(card.image)" alt="" class="advantages__icon" :class="{ 'advantages__icon--large': card.largeIcon }">
      </div>
      <div v-if="featured" class="advantages__featured">
        <div class="advantages__label-wrap"><span class="advantages__label">{{ featured.featuredLabel || 'Найдите развлечения по душе' }}</span></div>
        <div class="advantages__cols">
          <div class="advantages__col">
            <h3 class="advantages__col-title">{{ featured.featuredItem1Title }}</h3>
            <p class="advantages__col-text">{{ featured.featuredItem1Text }}</p>
            <RouterLink :to="featured.featuredItem1Link || '/attractions#activity-park'" class="advantages__col-link">Подробнее</RouterLink>
          </div>
          <div class="advantages__col-divider"></div>
          <div class="advantages__col">
            <h3 class="advantages__col-title">{{ featured.featuredItem2Title }}</h3>
            <p class="advantages__col-text">{{ featured.featuredItem2Text }}</p>
            <RouterLink :to="featured.featuredItem2Link || '/attractions#xbox'" class="advantages__col-link">Подробнее</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="advantages__slider">
      <SplideSlide v-for="card in cards" :key="card.id">
        <div class="advantages__card">
          <div class="advantages__label-wrap"><span class="advantages__label">{{ card.label }}</span></div>
          <div v-if="card.number" class="advantages__bottom">
            <div class="advantages__value">
              <span class="advantages__number">{{ card.number }}</span>
              <span class="advantages__unit">{{ card.unit }}</span>
            </div>
          </div>
          <img :src="strapiMedia(card.image)" alt="" class="advantages__icon" :class="{ 'advantages__icon--large': card.largeIcon }">
        </div>
      </SplideSlide>
    </Splide>
    <div v-if="featured" class="advantages__featured advantages__featured--mobile">
      <div class="advantages__label-wrap"><span class="advantages__label">{{ featured.featuredLabel || 'Найдите развлечения по душе' }}</span></div>
      <div class="advantages__cols">
        <div class="advantages__col">
          <h3 class="advantages__col-title">{{ featured.featuredItem1Title }}</h3>
          <p class="advantages__col-text">{{ featured.featuredItem1Text }}</p>
          <RouterLink :to="featured.featuredItem1Link || '/attractions#activity-park'" class="advantages__col-link">Подробнее</RouterLink>
        </div>
        <div class="advantages__col-divider"></div>
        <div class="advantages__col">
          <h3 class="advantages__col-title">{{ featured.featuredItem2Title }}</h3>
          <p class="advantages__col-text">{{ featured.featuredItem2Text }}</p>
          <RouterLink :to="featured.featuredItem2Link || '/attractions#xbox'" class="advantages__col-link">Подробнее</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.advantages {
  // Общие переменные
  --icon-offset: -20px;
  --icon-large-offset: 20px;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  &__slider {
    display: none;
  }

  &__featured--mobile {
    display: none;
  }

  &__card {
    position: relative;
    overflow: hidden;
    background-color: var(--color-accent-light);
    border-radius: 45px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 310px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 15px 35px rgba(255, 150, 23, 0.25);
    }

    // Индивидуальные размеры для каждой картинки
    // яркое игровое пространство" (иконка с цифрой/элементами)
    &:nth-child(1) .advantages__icon {
      --icon-width: 215px;
      --icon-height: 230px;
    }
    
    // Для карточки банкетная комната (иконка с тортом/едой)
    &:nth-child(2) .advantages__icon {
      --icon-width: 240px;
      --icon-height: 230px;
    }
    
    // Для карточки "игровых зон" (игровая консоль/контроллер)
    &:nth-child(3) .advantages__icon {
      --icon-width: 300px;
      --icon-height: 250px;
      --icon-offset: -55px;
    }
    
    // Для карточки "еда" (иконка с билетом/ценой)
    &:nth-child(4) .advantages__icon {
      --icon-width: 200px;
      --icon-height: 200px;
      --icon-offset: 0px;

    }
    // Для карточки "xbox" (иконка с билетом/ценой)
    &:nth-child(5) .advantages__icon {
      --icon-width: 180px;
      --icon-height: 250px;
      --icon-offset: -10px;
    }
     // Для карточки "билет" (иконка с билетом/ценой)
    &:nth-child(6) .advantages__icon {
      --icon-width: 280px;
      --icon-height: 220px;
      --icon-offset: 0px;
    }
  }

  &__label-wrap {
    margin-bottom: 18px;
    max-width: 80%;
  }

  &__label {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
    background-color: var(--color-primary);
    padding: 2px 14px;
    border-radius: 10px;
    line-height: 1.45;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  &__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: auto;
  }

  &__value {
    flex: 1;
  }

  &__icon {
    position: absolute;
    right: var(--icon-offset, -20px);
    bottom: var(--icon-offset, -20px);
    width: var(--icon-width, 200px);
    height: var(--icon-height, 200px);
    object-fit: contain;
    transition: all 0.3s ease;

    &--large {
      right: var(--icon-large-offset, 20px);
      transform: scale(1.5);
    }
  }

  &__featured {
    grid-column: 1 / -1;
    background-color: var(--color-accent-light);
    border-radius: 45px;
    padding: 40px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 20px 40px rgba(255, 150, 23, 0.3);
    }
  }

  &__cols {
    display: flex;
    gap: 40px;
    margin-top: 32px;
  }

  &__col {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 15px 30px rgba(255, 150, 23, 0.2);
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  &__col-divider {
    width: 2px;
    background-color: var(--color-primary);
  }

  &__col-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  &__col-text {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: auto;
  }

  &__col-link {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 8px;
    margin-top: 24px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-link);
    transition: gap 0.3s ease;

    &::after {
      content: '→';
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1.5px solid var(--color-link);
      border-radius: 50%;
      font-size: 14px;
      transition: background-color 0.3s, color 0.3s, transform 0.3s;
    }

    &:hover {
      gap: 12px;

      &::after {
        background-color: var(--color-link);
        color: #fff;
        transform: rotate(-45deg);
      }
    }
  }

  &__number {
    display: block;
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 128px;
    font-weight: 900;
    line-height: 0.75;
  }

  &__unit {
    display: block;
    font-size: 36px;
    font-weight: 500;
    line-height: 1;
  }
}

@media (max-width: 768px) {
  .advantages {
    &__grid {
      display: none;
    }

    &__slider {
      display: block;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__featured--mobile {
      display: block;
      margin-top: 24px;
      border-radius: 24px;
      padding: 24px;
      
      &:hover {
        transform: scale(1.02);
        box-shadow: 0 15px 30px rgba(255, 150, 23, 0.25);
      }
    }

    &__card {
      height: 260px;
      padding: 24px;
      border-radius: 24px;

      // Мобильные размеры для каждой картинки
      &:nth-child(1) .advantages__icon {
        --icon-width: 160px;
        --icon-height: 160px;
      }
      
      &:nth-child(2) .advantages__icon {
        --icon-width: 130px;
        --icon-height: 130px;
      }
      
      &:nth-child(3) .advantages__icon {
        --icon-width: 180px;
        --icon-height: 180px;
        --icon-offset: -25px;
      }
      
      &:nth-child(4) .advantages__icon {
        --icon-width: 140px;
        --icon-height: 140px;
      }
      
      .advantages__icon--large {
        --icon-width: 220px;
        --icon-height: 220px;
        --icon-offset: 15px;
      }
    }

    &__label-wrap {
      max-width: 75%;
      margin-bottom: 12px;
    }

    &__label {
      font-size: 18px;
      padding: 2px 10px;
      border-radius: 8px;
    }

    &__number {
      font-size: 56px;
    }

    &__unit {
      font-size: 24px;
    }

    &__icon {
      width: var(--icon-width, 140px);
      height: var(--icon-height, 140px);
      right: var(--icon-offset, -28px);
      bottom: var(--icon-offset, -28px);

      &--large {
        right: var(--icon-large-offset, 10px);
      }
    }

    &__cols {
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }

    &__col {
      padding: 20px;
      
      &:hover {
        transform: scale(1.02);
      }
    }

    &__col-divider {
      width: 100%;
      height: 2px;
    }

    &__col-title {
      font-size: 22px;
      margin-bottom: 8px;
    }

    &__col-text {
      font-size: 14px;
    }

    &__col-link {
      margin-top: 16px;
      font-size: 14px;

      &::after {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }
    }
  }

  .advantages :deep(.splide__pagination__page.is-active) {
    background-color: var(--color-primary);
  }
}
</style>