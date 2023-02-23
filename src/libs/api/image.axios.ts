import axiosInstance from './axios-client'

//API Post Image
const uploadImage = async (formData: any) => {
  try {
    const response = await axiosInstance.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const axiosImage = {
  uploadImage,
}
