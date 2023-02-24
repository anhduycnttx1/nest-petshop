import axiosInstance from './axios-client'

//API Info Usser
const getUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/user/view/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

//API List Photo
const getPhotoOrderByUser = async () => {
  try {
    const response = await axiosInstance.get(`/user/photos`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const axiosUsers = {
  getUserById,
  getPhotoOrderByUser,
}
