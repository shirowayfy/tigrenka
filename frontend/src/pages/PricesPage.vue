<script setup>
import { ref, onMounted } from 'vue'
import AppBanner from '@/components/AppBanner.vue'
import PricingSection from '@/components/PricingSection.vue'
import ContactFormSection from '@/components/ContactFormSection.vue'
import MapSection from '@/components/MapSection.vue'
import { getPricesPage } from '@/api/prices'
import { getPricingCards } from '@/api/collections'
import { strapiMedia } from '@/api/strapi'

const pageData = ref(null)
const pricingCards = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [page, cards] = await Promise.all([
      getPricesPage(),
      getPricingCards(),
    ])
    pageData.value = page
    pricingCards.value = cards
  } catch (e) {
    console.error('Failed to load prices page:', e)
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
      :image="strapiMedia(pageData.bannerImage)"
    />

    <div v-if="pageData" class="prices__text">
      <p>{{ pageData.introText1 }}</p>
      <p>{{ pageData.introText2 }}</p>
    </div>

    <PricingSection
      v-if="pageData"
      :cards="pricingCards"
      :image1="strapiMedia(pageData.pricingImage1)"
      :image2="strapiMedia(pageData.pricingImage2)"
    />
    <ContactFormSection />
    <MapSection />
  </div>
</template>

<style lang="scss" scoped>
.prices__text {
  background-color: var(--color-primary);
  color: #fff;
  border-radius: 45px;
  padding: 50px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.6;

  p + p {
    margin-top: 8px;
  }
}

@media (max-width: 768px) {
  .prices__text {
    padding: 24px;
    font-size: 16px;
    border-radius: 20px;
  }
}
</style>
