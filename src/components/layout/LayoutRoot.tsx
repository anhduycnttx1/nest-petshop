import { AppShell, Group, Divider, Container, Button } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import HeaderRoot from './HeaderRoot'
import { useAuthController } from '../../controllers/auth.controller'
import LoaderPage from '../loader/Loader'
import { IconBrandDiscord, IconBrandTwitter } from '@tabler/icons'
import NavbarRoot from './NavbarRoot'
type LayoutRootProps = {}

function LayoutRoot({}: LayoutRootProps) {
  const { state } = useAuthController()
  const { loading } = state
  return (
    <>
      {loading && <LoaderPage />}
      {/* {!loading && !isAuthenticated && <Navigate to="/login" replace={true} />} */}
      {!loading && (
        <AppShell navbar={<NavbarRoot />} padding="md" header={<HeaderRoot />}>
          {/* Your application here */}
          <Outlet />
          <Container mt={90} mb={50}>
            <Divider my="sm" />
            <Group position="right" py="md">
              <Button variant="filled" color="violet" leftIcon={<IconBrandDiscord />}>
                Join Discord community
              </Button>
              <Button variant="filled" color="blue" leftIcon={<IconBrandTwitter />}>
                Follow Group on Twitter
              </Button>
            </Group>
          </Container>
        </AppShell>
      )}
    </>
  )
}

export default LayoutRoot
