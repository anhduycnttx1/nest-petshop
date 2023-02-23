import { Container, Group, Loader, Space, Stack } from '@mantine/core'
import PostList from '../../components/post-list'
import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { useEffect, useState } from 'react'
import HeaderInfo from '../../components/user-header-info'
import { useParams } from 'react-router-dom'
import { useUserController } from '../../controllers/user.controller'
import { useAuthController } from './../../controllers/auth.controller'
import NotFoundPage from '../../pages/error/404'

const UserProfileContainer = () => {
  let { userId } = useParams()
  const usePost = usePostController()
  const useUser = useUserController()
  const useAuth = useAuthController()
  useEffect(() => {
    if (userId) {
      useUser.onGetUserById(userId)
      usePost.onGetPostsByUser(userId)
    }
  }, [userId])

  return (
    <>
      {!useUser.state.loading && !useUser.state.user && <NotFoundPage />}
      {!useUser.state.loading && useUser.state.user && (
        <Container>
          <HeaderInfo user={useUser.state.user} />
          <Group position="right">
            {useAuth.state.user?.id && useAuth.state.user?.id === userId ? <SectionAddPost /> : <Space h={40} />}
          </Group>
          <Stack></Stack>
          <Group>
            {!usePost.state.loading ? (
              usePost.state.posts && <PostList posts={usePost.state.posts} />
            ) : (
              <Loader color="cyan" size="sm" />
            )}
          </Group>
        </Container>
      )}
    </>
  )
}

export default UserProfileContainer
