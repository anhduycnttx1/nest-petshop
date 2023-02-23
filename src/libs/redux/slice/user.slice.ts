import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFUserView } from '../../../types'
import { axiosUsers } from './../../api/user.axios'
// Define a type for the slice state
interface UserState {
  user: IFUserView | null
  loading: boolean
}
// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: true,
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

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // thunk async list comment
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
  },
})

// Other code such as selectors can use the imported `RootState` type
export const {} = userSlice.actions

export default userSlice.reducer
