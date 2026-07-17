<script setup>
defineProps({ code: { type:String, required:true } })
</script>

<template>
  <svg v-if="code === 'hr'" class="language-flag" viewBox="0 0 30 20" role="img" aria-label="Croatia">
    <defs>
      <pattern id="croatian-checkerboard" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="1.5" height="1.5" fill="#d4213d"/>
        <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#d4213d"/>
      </pattern>
    </defs>
    <rect width="30" height="20" rx="2" fill="#fff"/>
    <path d="M0 0h30v6.67H0z" fill="#ff0000"/>
    <path d="M0 13.33h30V20H0z" fill="#171796"/>
    <path d="M11.25 7.1h7.5v4.45c0 2.38-1.57 3.75-3.75 4.58-2.18-.83-3.75-2.2-3.75-4.58Z" fill="#fff" stroke="#fff" stroke-width=".85" stroke-linejoin="round"/>
    <path d="M11.25 7.1h7.5v4.45c0 2.38-1.57 3.75-3.75 4.58-2.18-.83-3.75-2.2-3.75-4.58Z" fill="url(#croatian-checkerboard)" stroke="#174489" stroke-width=".28" stroke-linejoin="round"/>
    <g stroke="#fff" stroke-width=".18" stroke-linejoin="round">
      <path d="m11.25 7.1.18-1.55 1.32-.35v1.9Z" fill="#78a8d8"/>
      <path d="M12.75 7.1V5.2l1.5-.32V7.1Z" fill="#174489"/>
      <path d="M14.25 7.1V4.88L15 4.45l.75.43V7.1Z" fill="#68a65b"/>
      <path d="M15.75 7.1V4.88l1.5.32v1.9Z" fill="#174489"/>
      <path d="M17.25 7.1V5.2l1.32.35.18 1.55Z" fill="#78a8d8"/>
    </g>
  </svg>
  <svg v-else-if="code === 'en'" class="language-flag" viewBox="0 0 30 20" role="img" aria-label="United Kingdom">
    <rect width="30" height="20" rx="2" fill="#17365d"/>
    <path d="M0 0 30 20M30 0 0 20" stroke="#fff" stroke-width="4"/>
    <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" stroke-width="1.7"/>
    <path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/>
    <path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.2"/>
  </svg>
  <svg v-else class="language-flag" viewBox="0 0 30 20" role="img" aria-label="Czech Republic">
    <rect width="30" height="20" rx="2" fill="#fff"/>
    <path d="M0 10h30v10H0z" fill="#d7141a"/>
    <path d="M0 0v20l13-10z" fill="#11457e"/>
  </svg>
</template>

<style scoped>
.language-flag{width:27px;height:18px;display:block;flex:none;border-radius:2px;box-shadow:0 0 0 1px rgba(11,35,65,.16);overflow:hidden}
</style>
