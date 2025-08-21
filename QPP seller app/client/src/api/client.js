import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(r => r, async (error) => {
  const original = error.config
  if (error.response && error.response.status === 401 && !original._retry) {
    original._retry = true
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      try {
        const { data } = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/auth/refresh', { refreshToken })
        localStorage.setItem('token', data.token)
        original.headers.Authorization = `Bearer ${data.token}`
        return api(original)
      } catch {}
    }
  }
  return Promise.reject(error)
})

export default api
