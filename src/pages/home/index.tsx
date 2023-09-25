import { useEffect } from 'react'
import PostsContainer from '../../containers/posts'
import { useAuthController } from './../../controllers/auth.controller'
import { reloadPosts } from '../../libs/redux/slice/posts.slice'
import { useAppDispatch } from '../../libs/redux/hooks'

const HomePages = () => {
  const dispatch = useAppDispatch()
  const useAuth = useAuthController()
  const title = useAuth.state.isAuthenticated && useAuth.state.user ? 'My feed' : 'New'
  useEffect(() => {
    dispatch(reloadPosts())
  }, [])
  return <PostsContainer title={title} type="feed" />
}

export default HomePages
