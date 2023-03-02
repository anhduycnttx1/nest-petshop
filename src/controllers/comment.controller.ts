import { fetchCommentOrderbyPost, createComment } from '../libs/redux/slice/comment.slice'
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

  async function onCreatePost(data: { comment: string }, postId: number) {
    try {
      dispatch(createComment({ data, postId }))
    } catch (err) {}
  }

  return {
    state,
    onCreatePost,
    onGetCommentOrderbyPost,
  }
}
