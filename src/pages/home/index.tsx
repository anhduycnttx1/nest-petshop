import PostsContainer from '../../containers/posts'
import { useAuthController } from './../../controllers/auth.controller'

const HomePages = () => {
  const useAuth = useAuthController()
  const title = useAuth.state.isAuthenticated && useAuth.state.user ? 'My feed' : 'New'
  return <PostsContainer title={title} type="feed" />
}

export default HomePages
