import { ActionIcon, Button, Container, Stack, TextInput, Title } from '@mantine/core'
import PostList from '../../components/post-list'

import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { KeyboardEvent, useEffect, useState } from 'react'
import LoaderPage from '../../components/loader/Loader'
import { useAuthController } from './../../controllers/auth.controller'
import { IconSearch } from '@tabler/icons'
import { useDispatch } from 'react-redux'
import { reloadPosts } from '../../libs/redux/slice/posts.slice'

type Props = {
  title: string
  query?: any
  type?: string
  isHiddenAddNew?: boolean
  isShowSearch?: boolean
}

const POST_LIMIT_OF_PAGE = 9

const PostsContainer = (props: Props) => {
  const useAuth = useAuthController()
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [qSearch, setQSearch] = useState<string>('')
  const { state, onGetPosts, onGetFeedPosts } = usePostController()
  const { loading, posts } = state

  useEffect(() => {
    if (qSearch.length > 0) {
      setPage(() => 0)
      dispatch(reloadPosts())
    }
    const params = { ...props.query, 'page-size': POST_LIMIT_OF_PAGE, 'page-index': page, title: qSearch }
    if (useAuth.state.isAuthenticated && useAuth.state.user && props.type === 'feed') {
      onGetFeedPosts(params)
    } else {
      onGetPosts(params)
    }
  }, [page, qSearch])

  const handlerSearch = () => {
    setQSearch(search)
  }

  const handleEnterPress = (event: React.KeyboardEvent<any>, callback: () => void) => {
    if (event.key === 'Enter') {
      callback()
    }
  }

  return (
    <Container>
      {!props.isHiddenAddNew && <SectionAddPost />}
      {props.isShowSearch && (
        <TextInput
          my="md"
          value={search}
          onKeyDown={(e: React.KeyboardEvent<any>) => handleEnterPress(e, handlerSearch)}
          onChange={(event) => setSearch(event.currentTarget.value)}
          rightSection={
            <ActionIcon onClick={handlerSearch}>
              <IconSearch />
            </ActionIcon>
          }
          placeholder="Search by title ..."
        />
      )}
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
