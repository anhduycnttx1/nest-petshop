import { useEffect } from 'react'
import PostsContainer from './../../../containers/posts'
import { reloadPosts } from '../../../libs/redux/slice/posts.slice'
import { useAppDispatch } from '../../../libs/redux/hooks'

const BestDiscussionsPages = () => {
  const dispatch = useAppDispatch()
  const title = 'Popular'
  const query = {
    order: 'comment',
    direction: 'desc',
  }
  useEffect(() => {
    dispatch(reloadPosts())
  }, [])
  return <PostsContainer title={title} query={query} />
}

export default BestDiscussionsPages
