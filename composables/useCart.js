// composables/useCart.js
export const useCart = () => {
  const cart = useState('cart', () => [])

  const addToCart = (item) => {
    const existing = cart.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({ ...item, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    const index = cart.value.findIndex(i => i.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  return { cart, addToCart, removeFromCart, totalPrice, totalItems }
}