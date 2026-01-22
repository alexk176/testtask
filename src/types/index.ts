export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface ShippingInfo {
  country: string
  state: string
  zipCode: string
}

export interface CartTotals {
  subtotal: number
  shipping: number
  tax: number
  total: number
}
