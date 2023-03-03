import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFPostList } from '../../../types'
import { axiosPosts } from '../../api/post.axios'
import { IFPostView } from '../../../types/index'
import { toast } from 'react-toastify'

// Define a type for the slice state
interface PostsState {
  posts: IFPostList[]
  loading: boolean
  postSelect: IFPostView | null
}
// Define the initial state using that type
const initialState: PostsState = {
  posts: [],
  loading: true,
  postSelect: null,
}

// define list posts
export const fetchPosts = createAsyncThunk('post/list', async (data: { query?: any }, thunkAPI) => {
  try {
    const result = await axiosPosts.getListPost(data.query)
    return result.data.content
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})
// define feed posts
export const fetchFeedPosts = createAsyncThunk('post/feed', async (data: { query?: any }, thunkAPI) => {
  try {
    const result = await axiosPosts.getFeedPosts(data.query)
    return result.data.content
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})
// define fetchPostByID
export const fetchPostById = createAsyncThunk('post/details', async (postId: string, thunkAPI) => {
  try {
    const result = await axiosPosts.getPostById(postId)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

// define fetchPostByUser
export const fetchPostByUser = createAsyncThunk(
  'post/user/list',
  async (data: { userId: string; query?: any }, thunkAPI) => {
    try {
      const result = await axiosPosts.getPostByUser(data.userId, data.query)
      return result.data.content
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// define login thunk
export const createPostByUsser = createAsyncThunk('post/create', async (data: any, thunkAPI) => {
  try {
    const result = await axiosPosts.createrPost(data)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

export const postsSlice = createSlice({
  name: 'post',

  initialState,
  reducers: {
    onLoading: (state, action) => {
      state.loading = action.payload
    },
    setVoteList: (state, action) => {
      const curPostSelect = state.postSelect
      if (curPostSelect && curPostSelect.id == action.payload) {
        state.postSelect = { ...curPostSelect, isUpvote: !curPostSelect.isUpvote }
      }

      const list = [...state.posts]

      const index = list.findIndex((item) => item.id === action.payload)
      if (index !== -1) {
        const curPost = list[index]
        const countLike = curPost.isUpvote ? curPost.countLike - 1 : curPost.countLike + 1
        list.splice(index, 1, { ...curPost, isUpvote: !curPost.isUpvote, countLike: countLike })
        state.posts = list
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // thunk async list post
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      // thunk async list post
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false
        state.postSelect = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      //create post
      .addCase(createPostByUsser.pending, (state) => {
        state.loading = true
      })
      .addCase(createPostByUsser.fulfilled, (state, action) => {
        state.loading = false
        toast.success('Create a post success!')
        state.posts.splice(0, 0, action.payload)
      })
      .addCase(createPostByUsser.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      //get post by user
      .addCase(fetchPostByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPostByUser.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPostByUser.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      //get post by feed
      .addCase(fetchFeedPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
  },
})

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootStaimport { axiosPosts } from './../../../api/post.axios';
export const { onLoading, setVoteList } = postsSlice.actions

export default postsSlice.reducer
