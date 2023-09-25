import { useEffect } from 'react'
import { useAppDispatch } from '../../../libs/redux/hooks'
import { reloadPosts } from '../../../libs/redux/slice/posts.slice'
import PostsContainer from './../../../containers/posts'

const MostUpvotedPages = () => {
  const dispatch = useAppDispatch()
  const title = 'Popular'
  const query = {
    order: 'upvote',
    direction: 'desc',
  }
  useEffect(() => {
    dispatch(reloadPosts())
  }, [])
  return <PostsContainer title={title} query={query} />
}

export default MostUpvotedPages
