import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { IFAuthModel } from '../../../../types'
// import { User } from 'firebase/auth'

// Define a type for the slice state
interface AuthState {
  token: string // the authenticated token
  user: IFAuthModel // the authenticated Record or Admin model
  isValid: boolean
  // user: User | null
  loading: boolean
  error: string
}
// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  token: '',
  isValid: false,
  loading: true,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setAuthModel: (state, action: PayloadAction<IFAuthModel>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setAuthModel, setLoading, setError, setIsValid, setToken } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
