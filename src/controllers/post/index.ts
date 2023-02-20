import { useAppSelector, useAppDispatch } from '../../libs/redux/hooks'
import type { RootState } from '../../libs/redux/store'
import {
  fetchPostById,
  fetchPosts,
  createPostByUsser,
  onLoading,
  fetchPostByUser,
} from '../../libs/redux/features/post/posts-slice'
import { axiosImage } from './../../libs/api/image.axios'
import { toast } from 'react-toastify'

export function usePostController() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state.post)

  function onGetPosts() {
    try {
      dispatch(fetchPosts())
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  function onGetPostsByUser(userId: string) {
    try {
      dispatch(fetchPostByUser(userId))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }

  function onGetPostById(id: string) {
    try {
      dispatch(fetchPostById(id))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  async function onCreatePost(data: any, file: File | null) {
    try {
      dispatch(onLoading(true))
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('tpye', 'post')

        await axiosImage
          .uploadImage(formData)
          .then((data) => dispatch(createPostByUsser({ ...data, imageId: data.imgId })))
          .catch((err) => toast.error(err.message))
          .finally(() => dispatch(onLoading(false)))
      } else {
        dispatch(createPostByUsser(data))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    state,
    onGetPosts,
    onGetPostById,
    onCreatePost,
    onGetPostsByUser,
  }
}
