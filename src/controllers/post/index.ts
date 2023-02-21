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
  async function onCreatePost(data: { title: string; content: string; tags: string }, file: File | null) {
    dispatch(onLoading(true))
    try {
      if (file) {
        const formData = new FormData()
        formData.append('type', 'post')
        formData.append('file', file)
        await axiosImage
          .uploadImage(formData)
          .then((image) => dispatch(createPostByUsser({ ...data, imageId: image.imgId })))
          .catch((err) => toast.error(err.message))
      } else {
        dispatch(createPostByUsser(data))
      }
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(onLoading(false))
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
