import type { Product } from '@/types'

const API_BASE_URL = 'https://fakestoreapi.com'

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  async getProducts(limit: number = 5): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`)
    }
    return response.json()
  },

  async addProduct(product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    if (!response.ok) {
      throw new Error('Failed to add product')
    }
    return response.json()
  },
}
