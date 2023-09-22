import { useAppSelector, useAppDispatch } from '../libs/redux/hooks'
import type { RootState } from '../libs/redux/store'
import {
  fetchPostById,
  fetchPosts,
  createPostByUser,
  onLoading,
  fetchFeedPosts,
  fetchPostByUser,
  setVoteList,
} from '../libs/redux/slice/posts.slice'

import { toast } from 'react-toastify'
import { axiosPosts } from './../libs/api/post.axios'
import { uploadImage } from '../libs/api/image.axios'

export function usePostController() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state.post)

  function onGetPosts(query?: any) {
    try {
      dispatch(fetchPosts({ query }))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  function onGetPostsByUser(userId: string, query?: any) {
    try {
      dispatch(fetchPostByUser({ userId, query }))
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
  function onGetFeedPosts(query?: any) {
    try {
      dispatch(fetchFeedPosts({ query }))
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
        formData.append('file', file)
        formData.append('type', 'post')

        await uploadImage(formData)
          .then((dataImage) => dispatch(createPostByUser({ ...data, imageId: dataImage?.imgId })))
          .catch((err) => toast.error(err.message))
      } else {
        dispatch(createPostByUser(data))
      }
    } catch (err) {
    } finally {
      dispatch(onLoading(false))
    }
  }

  async function onVotePosts(postId: any) {
    await axiosPosts
      .setUpvotePost(postId)
      .then((_) => dispatch(setVoteList(postId)))
      .catch((err) => toast.error(err.message))
  }

  return {
    state,
    onGetPosts,
    onGetPostById,
    onCreatePost,
    onGetPostsByUser,
    onVotePosts,
    onGetFeedPosts,
  }
}
