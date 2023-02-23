import axiosInstance from './axios-client'

//API List Post
const getUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const axiosUsers = {
  getUserById,
}
