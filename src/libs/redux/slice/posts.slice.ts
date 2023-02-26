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
export const fetchPostByUser = createAsyncThunk('post/user/list', async (userId: string, thunkAPI) => {
  try {
    const result = await axiosPosts.getPostByUser(userId)
    return result.data.content
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

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
        console.log('done')
        state.postSelect = { ...curPostSelect, isUpvote: !curPostSelect.isUpvote }
      }

      const list = [...state.posts]

      const index = list.findIndex((item) => item.id === action.payload)
      if (index !== -1) {
        const curPost = list[index]
        list.splice(index, 1, { ...curPost, isUpvote: !curPost.isUpvote })
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
  },
})

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootStaimport { axiosPosts } from './../../../api/post.axios';
export const { onLoading, setVoteList } = postsSlice.actions

export default postsSlice.reducer
