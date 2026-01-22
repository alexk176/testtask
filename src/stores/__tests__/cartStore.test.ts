import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types'

vi.mock('@/services/productService', () => ({
  productService: {
    getProducts: vi.fn().mockResolvedValue([
      { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', category: 'cat1', image: 'img1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Desc 2', category: 'cat2', image: 'img2.jpg' },
    ]),
    getProductById: vi.fn().mockResolvedValue({
      id: 5,
      title: 'Random Product',
      price: 29.99,
      description: 'A random product',
      category: 'electronics',
      image: 'random-product.jpg',
    }),
    addProduct: vi.fn().mockResolvedValue({
      id: 21,
      title: 'New Product',
      price: 29.99,
    }),
  },
}))

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should have empty cart initially', () => {
      const store = useCartStore()
      expect(store.items).toEqual([])
      expect(store.isEmpty).toBe(true)
      expect(store.itemCount).toBe(0)
    })

    it('should have zero totals initially', () => {
      const store = useCartStore()
      expect(store.subtotal).toBe(0)
      expect(store.tax).toBe(0)
      expect(store.total).toBe(0)
    })
  })

  describe('Adding Items', () => {
    it('should add a new item to cart', () => {
      const store = useCartStore()
      const product: Product = {
        id: 1,
        title: 'Test Product',
        price: 25.99,
        description: 'Test',
        category: 'test',
        image: 'test.jpg',
      }

      store.addItem(product, 2)

      expect(store.items).toHaveLength(1)
      expect(store.items[0].quantity).toBe(2)
      expect(store.itemCount).toBe(2)
    })

    it('should increase quantity when adding existing item', () => {
      const store = useCartStore()
      const product: Product = {
        id: 1,
        title: 'Test Product',
        price: 25.99,
        description: 'Test',
        category: 'test',
        image: 'test.jpg',
      }

      store.addItem(product, 1)
      store.addItem(product, 2)

      expect(store.items).toHaveLength(1)
      expect(store.items[0].quantity).toBe(3)
    })
  })

  describe('Removing Items', () => {
    it('should remove item from cart', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)

      store.removeItem(1)

      expect(store.items).toHaveLength(0)
    })

    it('should clear all items', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)
      store.addItem({ id: 2, title: 'P2', price: 20, description: '', category: '', image: '' }, 1)

      store.clearCart()

      expect(store.items).toHaveLength(0)
    })
  })

  describe('Updating Quantity', () => {
    it('should update item quantity', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)

      store.updateQuantity(1, 5)

      expect(store.items[0].quantity).toBe(5)
    })

    it('should increment quantity', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)

      store.incrementQuantity(1)

      expect(store.items[0].quantity).toBe(2)
    })

    it('should decrement quantity', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 3)

      store.decrementQuantity(1)

      expect(store.items[0].quantity).toBe(2)
    })

    it('should not decrement below 1', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)

      store.decrementQuantity(1)

      expect(store.items[0].quantity).toBe(1)
    })

    it('should remove item when quantity set to 0', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 2)

      store.updateQuantity(1, 0)

      expect(store.items).toHaveLength(0)
    })
  })

  describe('Calculations', () => {
    it('should calculate subtotal correctly', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 2)
      store.addItem({ id: 2, title: 'P2', price: 15, description: '', category: '', image: '' }, 3)

      // (10 * 2) + (15 * 3) = 65
      expect(store.subtotal).toBe(65)
    })

    it('should calculate tax correctly (20%)', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 100, description: '', category: '', image: '' }, 1)

      expect(store.tax).toBe(20)
    })

    it('should calculate total correctly', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 100, description: '', category: '', image: '' }, 1)

      // subtotal: 100, tax: 20, shipping: 0
      expect(store.total).toBe(120)
    })

    it('should include shipping in total', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 100, description: '', category: '', image: '' }, 1)
      store.calculateShipping({ country: 'USA', state: 'CA', zipCode: '90210' })

      expect(store.total).toBeGreaterThan(120)
      expect(store.shippingCost).toBeGreaterThan(0)
    })
  })

  describe('Shipping', () => {
    it('should calculate shipping', () => {
      const store = useCartStore()

      store.calculateShipping({ country: 'USA', state: 'CA', zipCode: '90210' })

      expect(store.shippingInfo).toBeDefined()
      expect(store.shippingCost).toBeGreaterThanOrEqual(5)
      expect(store.shippingCost).toBeLessThanOrEqual(25)
    })

    it('should clear shipping when clearing cart', () => {
      const store = useCartStore()
      store.addItem({ id: 1, title: 'P1', price: 10, description: '', category: '', image: '' }, 1)
      store.calculateShipping({ country: 'USA', state: 'CA', zipCode: '90210' })

      store.clearCart()

      expect(store.shippingCost).toBe(0)
    })
  })

  describe('Async Operations', () => {
    it('should fetch initial products', async () => {
      const store = useCartStore()

      await store.fetchInitialProducts()

      expect(store.isLoading).toBe(false)
      expect(store.items.length).toBeGreaterThan(0)
    })

    it('should add new product via API', async () => {
      const store = useCartStore()
      const initialLength = store.items.length

      await store.addNewProduct()

      expect(store.items.length).toBe(initialLength + 1)
    })
  })
})
