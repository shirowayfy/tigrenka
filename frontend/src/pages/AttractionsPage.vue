<script setup>
import { ref, onMounted } from 'vue'
import AppBanner from '@/components/AppBanner.vue'
import ActivityParkSection from '@/components/ActivityParkSection.vue'
import XboxSection from '@/components/XboxSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import ContactFormSection from '@/components/ContactFormSection.vue'
import MapSection from '@/components/MapSection.vue'
import { getAttractionsPage } from '@/api/attractions'
import { strapiMedia } from '@/api/strapi'

const pageData = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    pageData.value = await getAttractionsPage()
  } catch (e) {
    console.error('Failed to load attractions page:', e)
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
      :text="pageData.bannerText"
      :button-text="pageData.bannerButtonText"
      :button-link="pageData.bannerButtonLink"
      :image="strapiMedia(pageData.bannerImage)"
    />
    <ActivityParkSection
      v-if="pageData"
      id="activity-park"
      :label="pageData.activityParkLabel"
      :number="pageData.activityParkNumber"
      :unit="pageData.activityParkUnit"
      :description="pageData.activityParkDescription"
      :image1="strapiMedia(pageData.activityParkImage1)"
      :image2="strapiMedia(pageData.activityParkImage2)"
    />
    <XboxSection
      v-if="pageData"
      id="xbox"
      :description="pageData.xboxDescription"
      :features="pageData.xboxFeatures"
      :image1="strapiMedia(pageData.xboxImage1)"
      :image2="strapiMedia(pageData.xboxImage2)"
    />
    <ReviewsSection />
    <ContactFormSection />
    <MapSection />
  </div>
</template>
