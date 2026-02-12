<script setup>
import { ref, onMounted } from 'vue'
import AppBanner from '@/components/AppBanner.vue'
import AdvantagesSection from '@/components/AdvantagesSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import ContactFormSection from '@/components/ContactFormSection.vue'
import MapSection from '@/components/MapSection.vue'
import { getHomePage } from '@/api/home'
import { strapiMedia } from '@/api/strapi'

const pageData = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    pageData.value = await getHomePage()
  } catch (e) {
    console.error('Failed to load home page:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page container">
    <AppBanner
      v-if="pageData"
      :title="pageData.bannerTitle"
      :button-text="pageData.bannerButtonText"
      :button-link="pageData.bannerButtonLink"
      :image="strapiMedia(pageData.bannerImage)"
    />
    <AdvantagesSection />
    <FaqSection />
    <TeamSection />
    <ReviewsSection />
    <ContactFormSection />
    <MapSection />
  </div>
</template>
