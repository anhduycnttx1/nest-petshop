import authReducer from './slice/auth.slice'
import postsReducer from './slice/posts.slice'
import commentReducer from './slice/comment.slice'
import userReducer from './slice/user.slice'
export const reducerRoot = {
  auth: authReducer,
  post: postsReducer,
  comment: commentReducer,
  user: userReducer,
}
