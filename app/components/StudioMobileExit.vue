<script setup>
const { locale } = useI18n()

const labels = {
  cs: 'Ukončit editor',
  hr: 'Izađi iz uređivača',
  en: 'Exit editor',
}

const buttonLabel = computed(() => labels[locale.value] || labels.en)

const exitStudio = () => {
  const studioHost = window.useStudioHost?.()

  if (studioHost?.ui?.deactivateStudio) {
    studioHost.ui.deactivateStudio()
  } else {
    document.body.removeAttribute('data-studio-active')
    document.body.removeAttribute('data-expand-sidebar')
  }
}
</script>

<template>
  <button
    type="button"
    class="studio-mobile-exit"
    :aria-label="buttonLabel"
    @click="exitStudio"
  >
    <span aria-hidden="true">×</span>
    {{ buttonLabel }}
  </button>
</template>

<style scoped>
.studio-mobile-exit {
  display: none;
}

@media (max-width: 820px) {
  :global(body[data-studio-active] .studio-mobile-exit) {
    display: flex;
    position: fixed;
    z-index: 2147483647;
    top: max(12px, env(safe-area-inset-top));
    right: max(12px, env(safe-area-inset-right));
    left: auto !important;
    align-items: center;
    gap: 0.45rem;
    min-height: 46px;
    padding: 0.65rem 0.9rem;
    border: 1px solid rgb(255 255 255 / 22%);
    border-radius: 999px;
    background: #12182e;
    box-shadow: 0 8px 28px rgb(0 0 0 / 28%);
    color: #fff;
    font: 700 0.875rem/1 system-ui, sans-serif;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .studio-mobile-exit:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }

  .studio-mobile-exit span {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 0.75;
  }
}
</style>
