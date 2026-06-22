export const useUser = () => {
  const user = useState('user', () => {
    if (process.client) {
      const stored = localStorage.getItem('user')
      if (stored) {
        try { return JSON.parse(stored) } catch (e) {}
      }
    }
    return null
  })

  const setUser = (userData) => {
    user.value = userData
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const clearUser = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem('user')
    }
  }

  const isAuthenticated = computed(() => user.value !== null)

  return { user, setUser, clearUser, isAuthenticated }
}