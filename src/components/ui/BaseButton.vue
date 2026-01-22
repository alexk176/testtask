<script setup lang="ts">
const {
  variant = 'success',
  fullWidth = false,
  disabled = false,
} = defineProps<{
  variant?: 'success' | 'danger'
  fullWidth?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'font-bold text-sm py-2.5 px-6 rounded transition-opacity',
      'hover:opacity-90 text-white',
      {
        'bg-figma-success': variant === 'success',
        'bg-figma-danger': variant === 'danger',
        'w-full': fullWidth,
        'disabled:opacity-50': disabled,
      },
    ]"
  >
    <slot />
  </button>
</template>
