import { Container, Stack, Loader, Center, Text } from '@mantine/core'
import PostView from '../../components/post-view'
import { usePostController } from '../../controllers/post.controller'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NotFoundPage from '../../pages/error/404'
import React from 'react'
import CommentList from '../../components/comment-list'
import { useCommentController } from '../../controllers/comment.controller'

const PostDetailsContainer = () => {
  let { postId } = useParams()
  const usePost = usePostController()
  const useComment = useCommentController()
  useEffect(() => {
    if (postId) {
      usePost.onGetPostById(postId)
      useComment.onGetCommentOrderbyPost(postId)
    }
  }, [postId])

  return (
    <Container>
      {usePost.state.loading && <Loader />}
      {!usePost.state.loading && !usePost.state.postSelect && <NotFoundPage />}
      {!usePost.state.loading && usePost.state.postSelect && (
        <React.Fragment>
          {/* ========== Post detail =============*/}
          <Stack>
            <PostView post={usePost.state.postSelect} />

            {/* ========= Comment list ============ */}
            {useComment.state.loading && <Loader />}
            {!useComment.state.loading && !useComment.state.comments[0] && (
              <Center mih={100}>
                <Text weight={500} size="sm" sx={{ opacity: 0.6 }}>
                  Be the first to commet
                </Text>
              </Center>
            )}
            {!useComment.state.loading && useComment.state.comments[0] && (
              <CommentList comments={useComment.state.comments} />
            )}
          </Stack>
        </React.Fragment>
      )}
    </Container>
  )
}

export default PostDetailsContainer
