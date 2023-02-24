import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFUserView, IFPhotoList } from '../../../types'
import { axiosUsers } from './../../api/user.axios'
// Define a type for the slice state
interface UserState {
  user: IFUserView | null
  loading: boolean
  photos: IFPhotoList[]
  loadingPhoto: boolean
}
// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: true,
  photos: [],
  loadingPhoto: true,
}

// define fetchUserById
export const fetchUserById = createAsyncThunk('user/view', async (userId: string, thunkAPI) => {
  try {
    const result = await axiosUsers.getUserById(userId)
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

// define fetchPhotosOrderByUser
export const fetchPhotos = createAsyncThunk('user/photos', async (_, thunkAPI) => {
  try {
    const result = await axiosUsers.getPhotoOrderByUser()
    return result.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error)
  }
})

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // thunk async info user
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
      })
      // thunk async list photo
      .addCase(fetchPhotos.pending, (state) => {
        state.loadingPhoto = true
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loadingPhoto = false
        state.photos = action.payload
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loadingPhoto = false
        // @ts-ignore
        state.error = action.payload.message
      })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const {} = userSlice.actions

export default userSlice.reducer
