<script setup>
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { getTeamMembers } from '@/api/collections'

const members = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    members.value = await getTeamMembers()
  } catch (e) {
    console.error('Failed to load team members:', e)
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
  <section v-if="!loading && members.length" class="team">
    <SectionHeader title="Наша команда" subtitle="Кто веселит, а также помогает Вам и вашим детям" />

    <!-- Desktop grid -->
    <div class="team__grid">
      <div v-for="member in members" :key="member.id" class="team__card">
        <div class="team__card-header">
          <div class="team__avatar">
            <span class="team__avatar-placeholder">{{ member.name.charAt(0) }}</span>
          </div>
          <img src="@/assets/images/pav.png" alt="" class="team__paw">
        </div>
        <h3 class="team__name">{{ member.name }}</h3>
        <div class="team__divider"></div>
        <p class="team__description">{{ member.description }}</p>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="team__slider">
      <SplideSlide v-for="member in members" :key="member.id">
        <div class="team__card">
          <div class="team__card-header">
            <div class="team__avatar">
              <span class="team__avatar-placeholder">{{ member.name.charAt(0) }}</span>
            </div>
            <img src="@/assets/images/pav.png" alt="" class="team__paw">
          </div>
          <h3 class="team__name">{{ member.name }}</h3>
          <div class="team__divider"></div>
          <p class="team__description">{{ member.description }}</p>
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

<style lang="scss" scoped>
.team {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  &__slider {
    display: none;
  }

  &__card {
    border: 2px solid var(--color-primary);
    border-radius: 24px;
    padding: 32px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 15px 30px rgba(255, 150, 23, 0.25);
      background-color: rgba(255, 150, 23, 0.02);
    }
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  &__paw {
    width: 32px;
    height: 32px;
    object-fit: contain;
    opacity: 0.8;
    transition: transform 0.3s ease, opacity 0.3s ease;
    
    .team__card:hover & {
      transform: scale(1.1) rotate(10deg);
      opacity: 1;
    }
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-accent-light);
    transition: border-color 0.3s ease;
    
    .team__card:hover & {
      border-color: var(--color-primary-dark);
    }
  }

  &__avatar-placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--color-primary);
    transition: color 0.3s ease;
    
    .team__card:hover & {
      color: var(--color-primary-dark);
    }
  }

  &__name {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    transition: color 0.3s ease;
    
    .team__card:hover & {
      color: var(--color-primary);
    }
  }

  &__divider {
    height: 3px;
    background-color: var(--color-primary);
    border-radius: 2px;
    margin-bottom: 16px;
    transition: background-color 0.3s ease, width 0.3s ease;
    width: 50px;
    
    .team__card:hover & {
      background-color: var(--color-primary-dark);
      width: 80px;
    }
  }

  &__description {
    font-size: 16px;
    line-height: 1.5;
    transition: color 0.3s ease;
  }
}

@media (max-width: 768px) {
  .team {
    &__grid {
      display: none;
    }

    &__slider {
      display: block;
      margin-left: -20px;
      margin-right: -20px;
    }

    &__card {
      padding: 20px;
      border-radius: 16px;
      
      &:hover {
        transform: scale(1.02);
      }
    }

    &__paw {
      width: 24px;
      height: 24px;
    }

    &__avatar {
      width: 48px;
      height: 48px;
    }

    &__avatar-placeholder {
      font-size: 18px;
    }

    &__name {
      font-size: 18px;
      margin-bottom: 12px;
    }

    &__description {
      font-size: 14px;
    }
    
    &__divider {
      width: 40px;
      
      .team__card:hover & {
        width: 60px;
      }
    }
  }
}
</style>