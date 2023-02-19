import axiosInstance from './axios-client'

//API List Post
const getListPost = async (query?: string) => {
  try {
    const response = await axiosInstance.get('/posts')
    return response.data
  } catch (error) {
    throw error
  }
}
// API Post By Id
const getPostById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`post/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const axiosPosts = {
  getListPost,
  getPostById,
}
