<script setup lang="ts">
defineProps<{
  label: string
  value: string
  isTotal?: boolean
}>()
</script>

<template>
  <div 
    :class="[
      'flex justify-between items-center pb-3 border-b border-figma-border',
      isTotal ? 'pt-2' : ''
    ]"
  >
    <span 
      :class="[
        'text-figma-primary text-lg font-lato',
        isTotal ? 'font-medium' : 'font-semibold'
      ]"
    >
      {{ label }}
    </span>
    <span :class="['text-figma-secondary', isTotal ? 'font-semibold' : '']">
      {{ value }}
    </span>
  </div>
</template>
