import { SigninRequest } from '../../types'
import axiosInstance from './axios-client'
import Cookies from 'js-cookie'

// Login API
const login = async (username: string, password: string) => {
  // Gọi API để lấy token
  try {
    const response = await axiosInstance.post('/auth/sign-in-password', { username, password })
    // Trích xuất token từ phản hồi
    const token = response.data.data
    // Lưu access_token mới vào cookie hoặc local storage
    Cookies.set('access_token', token.access_token)
    Cookies.set('refresh_token', token.refresh_token)
    return token
  } catch (error) {
    throw error
  }
}
// Logout API
const logout = async () => {
  try {
    const response = await axiosInstance.get('/auth/sign-out')
    return response.data
  } catch (error) {
    throw error
  }
}

// Authentication API
const fetchAuthenticate = async () => {
  try {
    const response = await axiosInstance.get('/auth/authenticate')
    return response.data
  } catch (error) {
    // throw error
  }
}

// Sign-up API
const signup = async (data: SigninRequest) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', data)
    const token = response.data.data
    // Lưu access_token mới vào cookie hoặc local storage
    Cookies.set('access_token', token.access_token)
    Cookies.set('refresh_token', token.refresh_token)
    return response.data
  } catch (error) {
    throw error
  }
}

export const axiosAuth = {
  login,
  fetchAuthenticate,
  logout,
  signup,
}
