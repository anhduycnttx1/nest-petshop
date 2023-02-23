import { Container } from '@mantine/core'
import PostList from '../../components/post-list'
import { IFPostList } from '../../types'
import SectionAddPost from '../../components/add-post-section'
import { usePostController } from '../../controllers/post.controller'
import { useEffect, useState } from 'react'
import LoaderPage from '../../components/loader/Loader'

const HomeContainer = () => {
  const { state, onGetPosts } = usePostController()
  const { loading, posts } = state
  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <Container>
      <SectionAddPost />
      {loading && <LoaderPage />}
      {!loading && posts && <PostList posts={posts} />}
    </Container>
  )
}

export default HomeContainer
