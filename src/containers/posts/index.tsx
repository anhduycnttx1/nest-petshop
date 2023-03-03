import { Container, Stack, Title } from '@mantine/core'
import PostList from '../../components/post-list'

import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { useEffect } from 'react'
import LoaderPage from '../../components/loader/Loader'
import { useAuthController } from './../../controllers/auth.controller'

type Props = {
  title: string
  query?: any
  type?: string
}

const PostsContainer = (props: Props) => {
  const useAuth = useAuthController()
  const { state, onGetPosts, onGetFeedPosts } = usePostController()
  const { loading, posts } = state

  useEffect(() => {
    if (useAuth.state.isAuthenticated && useAuth.state.user && props.type === 'feed') {
      onGetFeedPosts(props.query)
    } else {
      onGetPosts(props.query)
    }
  }, [])

  return (
    <Container>
      <SectionAddPost />
      <Stack spacing="xl">
        <Title order={4}>{props.title}</Title>
        {loading && <LoaderPage />}
        {!loading && posts && <PostList posts={posts} />}
      </Stack>
    </Container>
  )
}

export default PostsContainer
