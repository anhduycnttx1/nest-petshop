import React, { useEffect } from 'react'
// import { auth } from '../../libs/firebase'
import { useAuthController } from './controllers/auth.controller'

type AppPrors = {
  children?: React.ReactNode
}

const App = (props: AppPrors): JSX.Element => {
  const { onAuthenticate } = useAuthController()
  useEffect(() => {
    onAuthenticate()
  }, [])
  return <React.Fragment>{props.children}</React.Fragment>
}

export default App
