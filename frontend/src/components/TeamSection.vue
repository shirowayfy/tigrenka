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
        <div class="team__avatar">
          <span class="team__avatar-placeholder">{{ member.name.charAt(0) }}</span>
        </div>
        <h3 class="team__name">{{ member.name }} <img src="@/assets/images/pav.png" alt="" class="team__paw"></h3>
        <div class="team__divider"></div>
        <p class="team__description">{{ member.description }}</p>
      </div>
    </div>

    <!-- Mobile slider -->
    <Splide :options="sliderOptions" class="team__slider">
      <SplideSlide v-for="member in members" :key="member.id">
        <div class="team__card">
          <div class="team__avatar">
            <span class="team__avatar-placeholder">{{ member.name.charAt(0) }}</span>
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
  }

  &__paw {
    width: 25px !important;
    height: 25px !important;
    max-width: none !important;
    object-fit: contain;
    display: inline !important;
    vertical-align: middle;
    margin-left: 8px;
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    background-color: var(--color-accent-light);
  }

  &__avatar-placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--color-primary);
  }

  &__name {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
  }

  &__divider {
    height: 3px;
    background-color: var(--color-primary);
    border-radius: 2px;
    margin-bottom: 16px;
  }

  &__description {
    font-size: 16px;
    line-height: 1.5;
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
  }
}
</style>
