import { Container } from '@mantine/core'
import PostView from '../../components/post-view'
import { usePostController } from '../../controllers/post/index'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoaderPage from '../../components/loader/Loader'
import NotFoundPage from '../../pages/error/404'

const PostDetailsContainer = () => {
  let { postId } = useParams()
  const { state, onGetPostById } = usePostController()
  const { postSelect, loading } = state
  useEffect(() => {
    postId && onGetPostById(postId)
  }, [postId])
  return (
    <Container>
      {loading && <LoaderPage />}
      {!loading && !postSelect && <NotFoundPage />}
      {!loading && postSelect && <PostView post={postSelect} />}
    </Container>
  )
}

export default PostDetailsContainer
