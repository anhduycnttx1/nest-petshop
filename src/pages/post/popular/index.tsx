import { useEffect } from 'react'
import { useAppDispatch } from '../../../libs/redux/hooks'
import PostsContainer from './../../../containers/posts'
import { reloadPosts } from '../../../libs/redux/slice/posts.slice'

const PopularPages = () => {
  const dispatch = useAppDispatch()
  const title = 'Popular'
  const query = {
    order: 'popularity',
    direction: 'desc',
  }
  useEffect(() => {
    dispatch(reloadPosts())
  }, [])
  return <PostsContainer title={title} query={query} />
}

export default PopularPages
