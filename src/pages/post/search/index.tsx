import { useEffect } from 'react'
import { useAppDispatch } from '../../../libs/redux/hooks'
import { reloadPosts } from '../../../libs/redux/slice/posts.slice'
import PostsContainer from './../../../containers/posts'

const SearchPages = () => {
  const dispatch = useAppDispatch()
  const title = 'Search Post'
  const query = {
    order: 'popularity',
    direction: 'desc',
  }

  useEffect(() => {
    dispatch(reloadPosts())
  }, [])

  return <PostsContainer title={title} query={query} isHiddenAddNew isShowSearch />
}

export default SearchPages
