import axiosInstance from './axios-client'

//API List Post
const getListPost = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/comments/${postId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

const createrPost = async (data: any) => {
  try {
    const response = await axiosInstance.post('posts', data)
    return response.data
  } catch (error) {
    throw error
  }
}
export const axiosComments = {
  getListPost,
  createrPost,
}
