<script setup>
import { onMounted, onUnmounted } from 'vue'
import ContactsSection from '@/components/ContactsSection.vue'
import MapSection from '@/components/MapSection.vue'

onMounted(() => {
  document.body.classList.add('contacts-bg')
})

onUnmounted(() => {
  document.body.classList.remove('contacts-bg')
})
</script>

<template>
  <div class="contacts page container">
    <ContactsSection />
    <MapSection />
  </div>
</template>

<style lang="scss">
body.contacts-bg {
  background: linear-gradient(161.49deg, #FFAB45 0%, #FF7520 39.32%, #FF8F52 58.1%, #FFCB5C 100%);

  .header {
    background-color: transparent;
  }
}
</style>
