import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { IFPostList } from '../../../../types'
import { axiosPosts } from '../../../api/post.axios'
import { IFPostView } from './../../../../types/index'

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

// define login thunk
export const fetchPosts = createAsyncThunk('post/list', async (_, thunkAPI) => {
  try {
    const result = await axiosPosts.getListPost()
    return result.data.content
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})
// define login thunk
export const fetchPostById = createAsyncThunk('post/details', async (postId: string, thunkAPI) => {
  try {
    const result = await axiosPosts.getPostById(postId)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

export const postsSlice = createSlice({
  name: 'post',

  initialState,
  reducers: {},
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
  },
})

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootStaimport { axiosPosts } from './../../../api/post.axios';
export const {} = postsSlice.actions

export default postsSlice.reducer
