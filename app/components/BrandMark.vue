<script setup>
defineProps({ light: Boolean, compact: Boolean })
</script>

<template>
  <span class="brand" :class="{ 'brand--light': light, 'brand--compact': compact }">
    <svg class="brand__symbol" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M6 11.5 22 3l16 8.5v21L22 41 6 32.5Z" fill="currentColor" opacity=".12" />
      <path d="M12 28.5c3.2-8.2 6.8-12.3 10-12.3s6.8 4.1 10 12.3M12 28.5h20M22 8v8.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="22" cy="8" r="2.2" fill="currentColor" />
    </svg>
    <span class="brand__type"><strong>CROBIZ</strong><small>Česko · Hrvatska</small></span>
  </span>
</template>

<style scoped>
.brand { display:inline-flex; align-items:center; gap:11px; color:var(--navy); }
.brand__symbol { width:42px; height:42px; flex:none; color:var(--gold-dark); }
.brand__type { display:grid; gap:1px; }
.brand__type strong { font-family:var(--font-display); font-size:1.08rem; letter-spacing:.18em; line-height:1; }
.brand__type small { color:var(--ink-muted); font-size:.62rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
.brand--light { color:white; }
.brand--light .brand__symbol { color:var(--gold-light); }
.brand--light .brand__type small { color:rgba(255,255,255,.64); }
.brand--compact .brand__symbol { width:38px; height:38px; }
@media (max-width:420px){ .brand__type small{display:none}.brand__type strong{font-size:.94rem}.brand__symbol{width:36px;height:36px} }
</style>
