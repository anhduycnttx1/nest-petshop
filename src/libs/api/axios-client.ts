import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/posi/v1/',
})

// Thêm interceptor cho yêu cầu
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('access_token') || null
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Thêm interceptor cho phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // Nếu phản hồi trả về mã lỗi 401, có thể tức là token hết hạn hoặc không hợp lệ
    if (error.response && error.response.status === 401) {
      // Lấy token mới từ server
      const newToken = await refreshToken()
      // Nếu lấy được token mới, thay thế token cũ và thực hiện lại yêu cầu ban đầu
      if (newToken) {
        const originalRequest = error.config
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)
async function refreshToken() {
  const refreshToken = Cookies.get('refresh_token') || null
  if (!refreshToken) return null
  try {
    const newToken = await fetchNewToken(refreshToken)
    // Lưu access_token mới vào cookie hoặc local storage
    Cookies.set('access_token', newToken.access_token)
    Cookies.set('refresh_token', newToken.refresh_token)
    //localStorage.setItem('access_token', newToken.access_token)
    return newToken.access_token
  } catch (error) {
    //@ts-ignore
    throw error
  }
}

async function fetchNewToken(refreshToken: any) {
  try {
    // Gọi API để lấy token mới
    const response = await axiosInstance.get('auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    // Lấy token mới từ response và trả về
    const token = response.data.data
    return token
  } catch (error) {
    //@ts-ignore
    // throw error
  }
}

export default axiosInstance
