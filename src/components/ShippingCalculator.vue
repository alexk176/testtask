<script setup lang="ts">
import { reactive } from "vue";
import type { ShippingInfo } from "@/types";
import ShippingInput from "./ui/ShippingInput.vue";
import BaseButton from "./ui/BaseButton.vue";

interface Emits {
  (e: "calculate", info: ShippingInfo): void;
}

const emit = defineEmits<Emits>();

const form = reactive<ShippingInfo>({
  country: "",
  state: "",
  zipCode: "",
});

const handleCalculate = () => {
  if (form.country && form.state && form.zipCode) {
    emit("calculate", { ...form });
  }
};
</script>

<template>
  <div class="bg-figma-bg rounded p-7">
    <h2 class="text-xl font-bold text-figma-primary mb-10">
      Calculate Shopping
    </h2>

    <div class="space-y-6">
      <ShippingInput v-model="form.country" placeholder="Stuttgart" />
      <ShippingInput v-model="form.state" placeholder="Mirpur Dhaka - 1200" />
      <ShippingInput v-model="form.zipCode" placeholder="12345" />

      <BaseButton
        @click="handleCalculate"
        variant="danger"
        :fullWidth="true"
      >
        Calculate Shipping
      </BaseButton>
    </div>
  </div>
</template>
