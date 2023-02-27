import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IFAuthRps, SigninRequest } from '../../../types'
import Cookies from 'js-cookie'
import { axiosAuth } from '../../api'
import { toast } from 'react-toastify'

// Define a type for the slice state
interface AuthState {
  user: IFAuthRps | null
  isAuthenticated: boolean
  loading: boolean
  error: any
}
// define initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
}

// define login thunk
export const login = createAsyncThunk('auth/login', async (body: { email: string; password: string }, thunkAPI) => {
  try {
    await axiosAuth.login(body.email, body.password)
    const response = await axiosAuth.fetchAuthenticate()
    return response.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.message)
  }
})
// define register thunk
export const register = createAsyncThunk('auth/register', async (body: SigninRequest, thunkAPI) => {
  try {
    await axiosAuth.signup(body)
    const response = await axiosAuth.fetchAuthenticate()
    return response.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.message)
  }
})
// define authentication thunk
export const authenticate = createAsyncThunk('auth/authenticate', async (_, thunkAPI) => {
  const refreshToken = Cookies.get('refresh_token') || ''
  if (!refreshToken) throw thunkAPI.rejectWithValue(null)
  try {
    const response = await axiosAuth.fetchAuthenticate()
    return response.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.message)
  }
})

// define authentication thunk
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const refreshToken = Cookies.get('refresh_token') || ''
  if (!refreshToken) throw thunkAPI.rejectWithValue(null)
  try {
    const response = await axiosAuth.logout()
    return response.data
  } catch (error) {
    // @ts-ignore
    return thunkAPI.rejectWithValue(error.message)
  }
})

// define slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   Cookies.remove('access_token')
    //   Cookies.remove('refresh_token')
    //   state.isAuthenticated = false
    //   state.user = null
    // },
  },
  extraReducers: (builder) => {
    builder
      // thunk async login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        toast.success('Login success!')
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload.message
        // @ts-ignore
        toast.error(action.payload)
      })
      // thunk async register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
        // @ts-ignore
        toast.error(action.payload)
      })
      // thunk async authenticate
      .addCase(authenticate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
      })
      // thunk async logout
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
      })
  },
})

// export actions and reducer
export const {} = authSlice.actions
export default authSlice.reducer
