import { Group, Loader, Space } from '@mantine/core'
import PostList from '../../components/post-list'
import { usePostController } from '../../controllers/post.controller'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import NotSearchPage from '../../pages/error/not-search'

const UserProfileContainer = () => {
  let { userId } = useParams()
  const usePost = usePostController()

  useEffect(() => {
    if (userId) {
      usePost.onGetPostsByUser(userId)
    }
  }, [userId])

  return (
    <React.Fragment>
      <Group position="center">
        {usePost.state.loading && <Loader color="cyan" size="sm" />}
        {!usePost.state.loading && usePost.state.posts && <PostList posts={usePost.state.posts} />}
        {!usePost.state.loading && !usePost.state.posts[0] && (
          <NotSearchPage title="Can't see any posts" isBtn={false} />
        )}
      </Group>
    </React.Fragment>
  )
}

export default UserProfileContainer
