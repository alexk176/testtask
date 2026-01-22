<script setup lang="ts">
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import CartItem from "@/components/CartItem.vue";
import CartTotals from "@/components/CartTotals.vue";
import ShippingCalculator from "@/components/ShippingCalculator.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CartGridHeader from "@/components/ui/CartGridHeader.vue";
import type { ShippingInfo } from "@/types";

const cartStore = useCartStore();

const handleCalculateShipping = (info: ShippingInfo) => {
  cartStore.calculateShipping(info);
};

const handleCheckout = () => {
  alert("Proceeding to checkout...");
};

onMounted(() => {
  cartStore.fetchInitialProducts();
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading -->
      <div v-if="cartStore.isLoading" class="text-center py-16 text-figma-text">
        Loading...
      </div>

      <!-- Error -->
      <div
        v-else-if="cartStore.error"
        class="text-center py-16 text-figma-danger"
      >
        {{ cartStore.error }}
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items Grid -->
        <div class="lg:col-span-2">
          <div v-if="cartStore.items.length > 0" class="grid grid-cols-[1fr_auto_auto_auto]">
            <CartGridHeader />
            <CartItem
              v-for="item in cartStore.items"
              :key="item.id"
              :item="item"
              @remove="cartStore.removeItem"
              @increment="cartStore.incrementQuantity"
              @decrement="cartStore.decrementQuantity"
              @update-quantity="cartStore.updateQuantity"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap justify-between gap-4 mt-8">
            <BaseButton
              @click="cartStore.addNewProduct"
              :disabled="cartStore.isAddingItem"
              variant="success"
            >
              {{ cartStore.isAddingItem ? "Adding..." : "Add Item" }}
            </BaseButton>
            <BaseButton @click="cartStore.clearCart" variant="danger">
              Clear Cart
            </BaseButton>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <CartTotals
            :totals="cartStore.cartTotals"
            @checkout="handleCheckout"
          />
          <ShippingCalculator @calculate="handleCalculateShipping" />
        </div>
      </div>
    </main>
  </div>
</template>
