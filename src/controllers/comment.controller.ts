import { fetchCommentOrderbyPost } from '../libs/redux/slice/comment.slice'
import { useAppSelector, useAppDispatch } from '../libs/redux/hooks'
import type { RootState } from '../libs/redux/store'
import { toast } from 'react-toastify'
// import { axiosImage } from '../libs/api/image.axios'

export function useCommentController() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state.comment)

  function onGetCommentOrderbyPost(postId: string) {
    try {
      dispatch(fetchCommentOrderbyPost(postId))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }

  //   async function onCreatePost(data: any, file: File | null) {
  //     try {
  //       dispatch(onLoading(true))
  //       if (file) {
  //         const formData = new FormData()
  //         formData.append('file', file)
  //         formData.append('type', 'post')

  //         await axiosImage
  //           .uploadImage(formData)
  //           .then((dataImage) => dispatch(createPostByUsser({ ...data, imageId: dataImage.imgId })))
  //           .catch((err) => toast.error(err.message))
  //           .finally(() => dispatch(onLoading(false)))
  //       } else {
  //         dispatch(createPostByUsser(data))
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  return {
    state,
    onGetCommentOrderbyPost,
  }
}
