import { Container, Stack, Title } from '@mantine/core'
import PostList from '../../components/post-list'

import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { useEffect } from 'react'
import LoaderPage from '../../components/loader/Loader'

type Props = {
  title: string
  query?: any
}

const PostsContainer = (props: Props) => {
  const { state, onGetPosts } = usePostController()
  const { loading, posts } = state

  useEffect(() => {
    onGetPosts(props.query)
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
