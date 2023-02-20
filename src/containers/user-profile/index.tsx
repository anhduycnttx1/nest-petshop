import { Container, Loader, Space } from '@mantine/core'
import PostList from '../../components/post-list'
import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post'
import { useEffect, useState } from 'react'
import HeaderInfo from '../../components/user-header-info'
import { useAuthController } from '../../controllers/auth'
import { useParams } from 'react-router-dom'

const UserProfileContainer = () => {
  let { userId } = useParams()
  const { state, onGetPosts } = usePostController()
  const { user } = useAuthController().state
  const { loading, posts } = state
  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <Container>
      <HeaderInfo />
      {user?.id === userId ? <SectionAddPost /> : <Space h={100} />}
      {loading && <Loader color="cyan" size="sm" />}
      {!loading && posts && <PostList posts={posts} />}
    </Container>
  )
}

export default UserProfileContainer
