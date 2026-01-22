<script setup lang="ts">
import type { CartTotals } from "@/types";
import CartTotalRow from "./CartTotalRow.vue";
import BaseButton from './ui/BaseButton.vue'
import { formatPrice } from '@/utils/currency'

defineProps<{
  totals: CartTotals;
}>()

const emit = defineEmits<{
  (e: "checkout"): void;
}>()
</script>

<template>
  <div class="bg-figma-bg rounded p-7">
    <h2 class="text-xl font-bold text-figma-primary mb-10">Cart Totals</h2>

    <div class="space-y-9">
      <CartTotalRow label="Subtotals:" :value="formatPrice(totals.subtotal)" />

      <CartTotalRow
        label="Shipping"
        :value="totals.shipping > 0 ? formatPrice(totals.shipping) : '—'"
      />

      <CartTotalRow label="Tax (20%)" :value="formatPrice(totals.tax)" />

      <CartTotalRow
        label="Totals:"
        :value="formatPrice(totals.total)"
        :isTotal="true"
      />
    </div>

    <BaseButton
      @click="emit('checkout')"
      variant="success"
      :fullWidth="true"
      class="mt-8 !py-3"
    >
      Proceed To Checkout
    </BaseButton>
  </div>
</template>
