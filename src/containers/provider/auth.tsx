import React, { useEffect } from 'react'
// import { auth } from '../../libs/firebase'
import { useAuthController } from '../../controllers/auth'
import { pb } from '../../libs/pocketbase'
type AuthProvider = {
  children?: React.ReactNode
}

const AuthProvider = (props: AuthProvider): JSX.Element => {
  const { fetchIsValid, fetchAuth, fetchLoading, fetchToken } = useAuthController()
  useEffect(() => {
    const currentUser = pb.authStore.model
    console.log(currentUser)
    fetchIsValid(pb.authStore.isValid)
    fetchToken(pb.authStore.token)
    fetchAuth(currentUser)
    fetchLoading(false)
  }, [])
  return <>{props.children}</>
}

export default AuthProvider

// use Firebase get authentication
// useEffect(() => {
//   //function that firebase notifies you if a user is set
//   const unsubsrcibe = auth.onAuthStateChanged((user) => {
//     fetchUser(user)
//     fetchLoading(false)
//   })
//   return unsubsrcibe
// }, [])
