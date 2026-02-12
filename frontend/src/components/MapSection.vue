<script setup>
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { getMapSection } from '@/api/map'

const data = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    data.value = await getMapSection()
  } catch (e) {
    console.error('Failed to load map section:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section v-if="!loading && data" class="map-section">
    <SectionHeader :title="data.title" :subtitle="data.subtitle" />
    <div class="map-section__wrapper">
      <iframe
        class="map-section__iframe"
        :src="data.embedUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.map-section {
  &__wrapper {
    background-color: var(--color-accent-light);
    border-radius: 45px;
    padding: 16px;
    overflow: hidden;
  }

  &__iframe {
    display: block;
    width: 100%;
    height: 500px;
    border: none;
    border-radius: 32px;
  }
}

@media (max-width: 768px) {
  .map-section {
    &__wrapper {
      border-radius: 24px;
      padding: 8px;
    }

    &__iframe {
      height: 350px;
      border-radius: 18px;
    }
  }
}
</style>
