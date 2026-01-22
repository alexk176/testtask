<script setup lang="ts">
const headers = ['Product', 'Price', 'Quantity', 'Total']
const paddings = ['', 'pl-4', 'pl-6', 'pl-20']
</script>

<template>
  <div
    v-for="(header, index) in headers"
    :key="header"
    :class="['py-3 font-bold text-xl text-figma-primary border-b border-figma-border-light', paddings[index]]"
  >
    {{ header }}
  </div>
</template>
