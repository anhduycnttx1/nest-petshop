import { Outlet, useParams } from 'react-router-dom'
import LoaderPage from '../loader/Loader'
import React, { useEffect } from 'react'
import { useUserController } from '../../controllers/user.controller'
import NotFoundPage from '../../pages/error/404'
import { Box, Container, Group, Space } from '@mantine/core'
import HeaderInfo from '../user-header-info'
import { useAuthController } from '../../controllers/auth.controller'
import SectionAddPost from '../add-post-section'

const UserLayout = () => {
  let { userId } = useParams()
  const useAuth = useAuthController()
  const useUser = useUserController()

  useEffect(() => {
    if (userId) useUser.onGetUserById(userId)
  }, [userId])

  return (
    <Box>
      {useUser.state.loading && <LoaderPage />}
      {!useUser.state.loading && !useUser.state.user && <NotFoundPage />}
      {!useUser.state.loading && useUser.state.user && (
        <Container>
          <HeaderInfo user={useUser.state.user} />
          <Group position="right">
            {useAuth.state.user &&
            (useAuth.state.user?.id === Number(userId) || useAuth.state.user?.username === userId) ? (
              <SectionAddPost />
            ) : (
              <Space h={40} />
            )}
          </Group>
          <Outlet />
        </Container>
      )}
    </Box>
  )
}
export default UserLayout
