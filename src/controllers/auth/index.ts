import { useAppSelector, useAppDispatch } from '../../libs/redux/hooks'
import type { RootState } from '../../libs/redux/store'
import { toast } from 'react-toastify'
import {
  setLoading,
  setError,
  setAuthModel,
  setIsValid,
  setToken,
} from '../../libs/redux/features/auth/authSlice'
import { IFAuthModel } from '../../types'
import { pb } from '../../libs/pocketbase'

export function useAuthController() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state.auth)
  const fetchAuth = (user: IFAuthModel) => dispatch(setAuthModel(user))
  const fetchLoading = (payload: boolean) => dispatch(setLoading(payload))
  const fetchIsValid = (payload: boolean) => dispatch(setIsValid(payload))
  const fetchToken = (token: string) => dispatch(setToken(token))
  async function onSignUp(
    fullname: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    const username = email.substring(0, email.lastIndexOf('@'))
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: passwordConfirm,
      name: fullname,
    }
    try {
      dispatch(setLoading(true))
      await pb.collection('users').create(data)
      dispatch(setLoading(false))
    } catch (err) {
      dispatch(setError('Error Register'))
    }
  }

  function onSignIn(email: string, password: string) {
    try {
      dispatch(setLoading(true))
      pb.collection('users')
        .authWithPassword(email, password)

        .then((_) => {
          console.log(pb.authStore.model)
          fetchAuth(pb.authStore.model)
          fetchToken(pb.authStore.token)
          fetchIsValid(pb.authStore.isValid)
          toast.success('Login success!')
        })
        .catch((_) => toast.error('Email/password you entered is incorrect!'))
        .finally(() => dispatch(setLoading(false)))
    } catch (err) {
      dispatch(setError('Error Login'))
    }
  }

  async function onLogOut() {
    try {
      dispatch(setLoading(true))
      pb.authStore.clear()
      fetchAuth(pb.authStore.model)
      fetchIsValid(pb.authStore.isValid)
      fetchToken(pb.authStore.token)
      dispatch(setLoading(false))
      toast.success('Logout success!')
    } catch (err) {
      dispatch(setError('Error Logout'))
    }
  }

  return {
    state,
    onSignUp,
    onSignIn,
    onLogOut,
    fetchAuth,
    fetchToken,
    fetchLoading,
    fetchIsValid,
  }
}
