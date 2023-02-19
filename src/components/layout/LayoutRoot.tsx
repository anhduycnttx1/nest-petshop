import { AppShell } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'
import HeaderRoot from './HeaderRoot'
import { useAuthController } from '../../controllers/auth'
import LoaderPage from '../loader/Loader'
type LayoutRootProps = {}

function LayoutRoot({}: LayoutRootProps) {
  const { state } = useAuthController()
  const { loading } = state
  return (
    <>
      {loading && <LoaderPage />}
      {/* {!loading && !isAuthenticated && <Navigate to="/login" replace={true} />} */}
      {!loading && (
        <AppShell padding="md" header={<HeaderRoot />}>
          {/* Your application here */}
          <Outlet />
        </AppShell>
      )}
    </>
  )
}

export default LayoutRoot
