import { useEffect } from 'react'
import PostsContainer from '../../containers/posts'
import { useAppDispatch } from '../../libs/redux/hooks'
import { reloadPosts } from '../../libs/redux/slice/posts.slice'
import { useAuthController } from './../../controllers/auth.controller'

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
