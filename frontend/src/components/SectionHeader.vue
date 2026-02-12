<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="section-header">
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 80px;

  &__title {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 30px;
    font-weight: 500;
    background-color: var(--color-primary);
    color: #fff;
    padding: 8px 20px;
    border-radius: 12px;
    white-space: nowrap;
  }

  &__subtitle {
    font-size: 16px;
    line-height: 1.4;
    color: var(--color-text);
    max-width: 390px;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;

    &__title {
      font-size: 22px;
      padding: 6px 16px;
    }

    &__subtitle {
      font-size: 14px;
      max-width: 100%;
    }
  }
}
</style>
