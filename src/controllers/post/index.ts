import { useAppSelector, useAppDispatch } from '../../libs/redux/hooks'
import type { RootState } from '../../libs/redux/store'
import { fetchPostById, fetchPosts } from '../../libs/redux/features/post/posts-slice'

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
  function onGetPostById(id: string) {
    try {
      dispatch(fetchPostById(id))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  return {
    state,
    onGetPosts,
    onGetPostById,
  }
}
