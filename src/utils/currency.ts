export const formatPrice = (price: number): string => {
  return `£${price.toFixed(2)}`
}

export const calculateItemTotal = (price: number, quantity: number): number => {
  return price * quantity
}
