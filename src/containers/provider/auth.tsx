import React, { useEffect } from 'react'
// import { auth } from '../../libs/firebase'
import { useAuthController } from '../../controllers/auth.controller'
import LoaderPage from '../../components/loader/Loader'
import { Navigate } from 'react-router-dom'
type AuthProvider = {
  children?: React.ReactNode
}

const AuthProvider = (props: AuthProvider): JSX.Element => {
  const { onAuthenticate, state } = useAuthController()
  const { loading, isAuthenticated } = state
  useEffect(() => {
    onAuthenticate()
  }, [])
  return (
    <React.Fragment>
      {loading && <LoaderPage />}
      {!loading && !isAuthenticated && <Navigate to="/login" replace={true} />}
      {!loading && isAuthenticated && props.children}
    </React.Fragment>
  )
}

export default AuthProvider
