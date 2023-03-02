import axiosInstance from './axios-client'

//API List Post
const getListComment = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/comments/${postId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

const createComment = async (data: any, postId: number) => {
  try {
    const response = await axiosInstance.post(`/comments/${postId}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const axiosComments = {
  getListComment,
  createComment,
}
