<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :type="type || 'text'"
    :placeholder="placeholder"
    class="w-full px-4 py-3 bg-transparent border-b-2 border-figma-input-border text-sm text-figma-primary placeholder-figma-text-placeholder focus:outline-none focus:border-figma-link font-lato"
  />
</template>
