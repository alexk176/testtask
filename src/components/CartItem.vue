<script setup lang="ts">
import type { CartItem } from '@/types'
import { formatPrice, calculateItemTotal } from '@/utils/currency'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'remove', id: number): void
  (e: 'increment', id: number): void
  (e: 'decrement', id: number): void
  (e: 'update-quantity', id: number, quantity: number): void
}>()

const itemTotal = (): number => {
  return calculateItemTotal(props.item.price, props.item.quantity)
}

const handleQuantityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (!isNaN(value) && value >= 0) {
    emit('update-quantity', props.item.id, value)
  }
}
</script>

<template>
  <div class="py-4 border-b border-figma-border-light">
    <div class="flex items-center gap-3">
      <!-- Product Image with overlapping Remove Button -->
      <div class="size-20 flex-shrink-0 bg-figma-bg rounded relative">
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-contain p-2"
          loading="lazy"
        />
        <!-- Remove Button overlapping image -->
        <button
          @click="emit('remove', item.id)"
          class="absolute -top-1 -right-1 size-4 rounded-full bg-black text-white flex items-center justify-center hover:bg-figma-danger transition-colors"
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Product Info -->
      <div class="min-w-0 font-lato">
        <h3 class="font-normal text-black text-sm line-clamp-2 mb-1">
          {{ item.title }}
        </h3>
        <p class="text-xs text-figma-text-light">Color: <span class="text-sm">Brown</span></p>
        <p class="text-xs text-figma-text-light">Size: <span class="text-sm">XL</span></p>
      </div>
    </div>
  </div>

  <!-- Price -->
  <div class="text-figma-secondary text-sm min-w-20 flex items-center pl-4 py-4 border-b border-figma-border-light">
      {{ formatPrice(item.price) }}
  </div>

  <!-- Quantity -->
  <div class="flex items-center pl-6 py-4 border-b border-figma-border-light">
    <div class="inline-flex items-center bg-figma-input-bg rounded">
        <button
          @click="emit('decrement', item.id)"
          :disabled="item.quantity <= 1"
          class="px-2.5 py-2 text-figma-quantity-text hover:text-figma-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <div class="bg-figma-input-border px-3">
          <input
            type="number"
            :value="item.quantity"
            @change="handleQuantityInput"
            min="1"
            class="w-12 text-center text-xs py-2 bg-transparent text-figma-quantity-text focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label="Quantity"
          />
        </div>
        <button
          @click="emit('increment', item.id)"
          class="px-2.5 py-2 text-figma-quantity-text hover:text-figma-primary transition-colors"
          aria-label="Increase quantity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
  </div>

  <!-- Total -->
  <div class="text-figma-secondary text-sm min-w-20 flex items-center pl-20 py-4 border-b border-figma-border-light">
    {{ formatPrice(itemTotal()) }}
  </div>
</template>
