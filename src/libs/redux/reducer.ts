import authReducer from './features/auth/authSlice'
import postsReducer from './features/post/posts-slice'

export const reducerRoot = {
  auth: authReducer,
  post: postsReducer,
}
