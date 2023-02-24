import { fetchUserById, fetchPhotos } from '../libs/redux/slice/user.slice'
import { useAppSelector, useAppDispatch } from '../libs/redux/hooks'
import type { RootState } from '../libs/redux/store'
import { toast } from 'react-toastify'

export function useUserController() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state.user)

  function onGetUserById(userId: string) {
    try {
      dispatch(fetchUserById(userId))
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  function onPhotosOrderByUser() {
    try {
      dispatch(fetchPhotos())
    } catch (err) {
      // @ts-ignore
      toast.error(err.message)
    }
  }
  return {
    state,
    onGetUserById,
    onPhotosOrderByUser,
  }
}
