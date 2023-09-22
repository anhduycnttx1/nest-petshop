import { toast } from 'react-toastify';
import axiosInstance from './axios-client'

type DataResponseUploadImage = {
  "imgId": number,
  "size": number
}
//API Post Image
export const uploadImage = async (formData: any): Promise<DataResponseUploadImage | undefined> => {
  try {
    const res = await axiosInstance.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as DataResponseUploadImage
  } catch (error: any) {
    toast.error(error.message)
  }
}

type DataResponseUpdateAvatar = {
  "code": number,
  "message": string
  "data": {
    "mid": string
  }
}

export const updateAvatar = async (body: { imageId: string }): Promise<DataResponseUpdateAvatar | undefined> => {
  try {
    const res = await axiosInstance.post('/user/update/avatar', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data as DataResponseUpdateAvatar
  } catch (error: any) {
    toast.error(error.message)
  }
}


type DataResponseUpdateCoverImage = {
  "code": number,
  "message": string
  "data": {
    "mid": string
  }
}

export const updateCoverImage = async (body: { imageId: string }): Promise<DataResponseUpdateCoverImage | undefined> => {
  try {
    const res = await axiosInstance.post('/user/update/banner', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data as DataResponseUpdateCoverImage
  } catch (error: any) {
    toast.error(error.message)
  }
}


