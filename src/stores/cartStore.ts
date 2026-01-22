import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CartItem, Product, ShippingInfo, CartTotals } from "@/types";
import { productService } from "@/services/productService";

const TAX_RATE = 0.2;

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const shippingInfo = ref<ShippingInfo | null>(null);
  const shippingCost = ref(0);
  const isAddingItem = ref(false);

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  );

  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  const tax = computed(() => subtotal.value * TAX_RATE);

  const total = computed(() => subtotal.value + shippingCost.value + tax.value);

  const cartTotals = computed<CartTotals>(() => ({
    subtotal: subtotal.value,
    shipping: shippingCost.value,
    tax: tax.value,
    total: total.value,
  }));

  const isEmpty = computed(() => items.value.length === 0);

  const findItem = (productId: number) =>
    items.value.find((item) => item.id === productId);

  async function fetchInitialProducts() {
    isLoading.value = true;
    error.value = null;
    try {
      const products = await productService.getProducts(4);
      items.value = products.map((product) => ({
        ...product,
        quantity: 1,
      }));
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load products";
    } finally {
      isLoading.value = false;
    }
  }

  function addItem(product: Product, quantity: number = 1) {
    const existingItem = findItem(product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ ...product, quantity });
    }
  }

  async function addNewProduct() {
    isAddingItem.value = true;
    error.value = null;
    try {
      // Fetch a random product from the API (products 1-20)
      const randomId = Math.floor(Math.random() * 20) + 1;
      const product = await productService.getProductById(randomId);

      // Add it to the cart with a unique timestamp-based id to avoid conflicts with existing items
      const uniqueProduct: Product = {
        ...product,
        id: Date.now(), // Use timestamp for unique ID
      };

      addItem(uniqueProduct, 1);
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to add product";
    } finally {
      isAddingItem.value = false;
    }
  }

  function removeItem(productId: number) {
    const index = items.value.findIndex((item) => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = findItem(productId);
    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function incrementQuantity(productId: number) {
    const item = findItem(productId);
    if (item) {
      item.quantity++;
    }
  }

  function decrementQuantity(productId: number) {
    const item = findItem(productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  function clearCart() {
    items.value = [];
    shippingCost.value = 0;
    shippingInfo.value = null;
  }

  function calculateShipping(info: ShippingInfo) {
    shippingInfo.value = info;
    // Mock shipping calculation - random cost between 5 and 25
    shippingCost.value = Math.round((Math.random() * 20 + 5) * 100) / 100;
  }

  function clearShipping() {
    shippingCost.value = 0;
    shippingInfo.value = null;
  }

  return {
    items,
    isLoading,
    error,
    shippingInfo,
    shippingCost,
    isAddingItem,
    itemCount,
    subtotal,
    tax,
    total,
    cartTotals,
    isEmpty,
    fetchInitialProducts,
    addItem,
    addNewProduct,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    calculateShipping,
    clearShipping,
  };
});
