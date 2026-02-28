<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FloatingContacts from '@/components/FloatingContacts.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <FloatingContacts />
</template>

<style scoped></style>
