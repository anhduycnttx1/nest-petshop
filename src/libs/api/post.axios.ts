import axiosInstance from './axios-client'
import Cookies from 'js-cookie'

//API List Post
const getListPost = async (query?: string) => {
  const token = Cookies.get('access_token') || null
  try {
    const response = await axiosInstance.post('/posts', { token })
    return response.data
  } catch (error) {
    throw error
  }
}
const getPostByUser = async (userId: string) => {
  const token = Cookies.get('access_token') || null
  try {
    const response = await axiosInstance.post(`/posts/user/${userId}`, { token })
    return response.data
  } catch (error) {
    throw error
  }
}
// API Post By Id
const getPostById = async (id: string) => {
  const token = Cookies.get('access_token') || null
  try {
    const response = await axiosInstance.post(`post/${id}`, { token })
    return response.data
  } catch (error) {
    throw error
  }
}

const createrPost = async (data: any) => {
  try {
    const response = await axiosInstance.post('create/posts', data)
    return response.data
  } catch (error) {
    throw error
  }
}

const setUpvotePost = async (postId: any) => {
  try {
    const response = await axiosInstance.get(`/upvote/post/${postId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const axiosPosts = {
  getListPost,
  getPostById,
  createrPost,
  getPostByUser,
  setUpvotePost,
}
