import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFCommentList } from '../../../types'
import { axiosComments } from '../../api/comment.axios'
import { toast } from 'react-toastify'

// Define a type for the slice state
interface PostsState {
  comments: IFCommentList[]
  loading: boolean
}
// Define the initial state using that type
const initialState: PostsState = {
  comments: [],
  loading: true,
}

// define fetchPostByID
export const fetchCommentOrderbyPost = createAsyncThunk('comment/list', async (postId: string, thunkAPI) => {
  try {
    const result = await axiosComments.getListComment(postId)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

//define login thunk
export const createComment = createAsyncThunk('post/create', async (body: { data: any; postId: number }, thunkAPI) => {
  try {
    const result = await axiosComments.createComment(body.data, body.postId)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

export const commentSlice = createSlice({
  name: 'comment',

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // thunk async list comment
      .addCase(fetchCommentOrderbyPost.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCommentOrderbyPost.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchCommentOrderbyPost.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      // thuml async add comment
      .addCase(createComment.pending, (state) => {
        state.loading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false
        state.comments.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const {} = commentSlice.actions

export default commentSlice.reducer
