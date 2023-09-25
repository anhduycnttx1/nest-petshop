import { Button, Container, Stack, Title } from '@mantine/core'
import PostList from '../../components/post-list'

import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { useEffect, useState } from 'react'
import LoaderPage from '../../components/loader/Loader'
import { useAuthController } from './../../controllers/auth.controller'

type Props = {
  title: string
  query?: any
  type?: string
}

const POST_LIMIT_OF_PAGE = 9

const PostsContainer = (props: Props) => {
  const useAuth = useAuthController()
  const [page, setPage] = useState<number>(1)
  const { state, onGetPosts, onGetFeedPosts } = usePostController()
  const { loading, posts } = state

  useEffect(() => {
    const params = { ...props.query, 'page-size': POST_LIMIT_OF_PAGE, 'page-index': page }
    if (useAuth.state.isAuthenticated && useAuth.state.user && props.type === 'feed') {
      onGetFeedPosts(params)
    } else {
      onGetPosts(params)
    }
  }, [page])

  return (
    <Container>
      <SectionAddPost />
      <Stack spacing="xl">
        <Title order={4}>{props.title}</Title>
        <PostList posts={posts} />
        {loading && <LoaderPage />}
        <Button onClick={() => setPage(page + 1)} variant="subtle">
          Load more
        </Button>
      </Stack>
    </Container>
  )
}

export default PostsContainer
