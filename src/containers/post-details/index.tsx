import { Container, Stack, Loader, Center, Text, Group, ActionIcon, Modal } from '@mantine/core'
import PostView from '../../components/post-view'
import { usePostController } from '../../controllers/post.controller'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NotFoundPage from '../../pages/error/404'
import React from 'react'
import CommentList from '../../components/comment-list'
import { useCommentController } from '../../controllers/comment.controller'
import { IconBookmark, IconHeart, IconMessageCircle2 } from '@tabler/icons'
import { IconHeartFilled } from '@tabler/icons-react'
import CommentForm from '../../components/comment-form'
import { useAuthController } from './../../controllers/auth.controller'

const PostDetailsContainer = () => {
  let { postId } = useParams()
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()
  const usePost = usePostController()
  const useComment = useCommentController()
  const useAuth = useAuthController()
  useEffect(() => {
    if (postId) {
      usePost.onGetPostById(postId)
      useComment.onGetCommentOrderbyPost(postId)
    }
  }, [postId])
  const handlerComment = () => {
    if (!useAuth.state.isAuthenticated) return navigate(`/login`)
    return setOpened(true)
  }
  const handlerUpvote = () => {
    if (!useAuth.state.isAuthenticated) return navigate(`/login`)
    return usePost.onVotePosts(postId)
  }
  const handlerBookmark = () => {
    if (!useAuth.state.isAuthenticated) return navigate(`/login`)
  }
  return (
    <Container>
      {usePost.state.loading && <Loader />}
      {!usePost.state.loading && !usePost.state.postSelect && <NotFoundPage />}
      {!usePost.state.loading && usePost.state.postSelect && (
        <React.Fragment>
          {/* ========== Post detail =============*/}
          <Stack>
            <PostView post={usePost.state.postSelect} />
            <Group
              position="center"
              grow
              mt={14}
              style={{
                padding: '12px',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#cfd6e6',
                borderRadius: 16,
              }}
            >
              <ActionIcon color="pink" onClick={handlerUpvote}>
                <Group>
                  {usePost.state.postSelect.isUpvote ? <IconHeartFilled /> : <IconHeart />}

                  <Text weight={700} size="sm">
                    Upvote
                  </Text>
                </Group>
              </ActionIcon>
              <ActionIcon color="pink" onClick={handlerComment}>
                <Group>
                  <IconMessageCircle2 />
                  <Text weight={700} size="sm">
                    Comment
                  </Text>
                </Group>
              </ActionIcon>
              <ActionIcon color="pink" onClick={handlerBookmark}>
                <Group>
                  <IconBookmark />
                  <Text weight={700} size="sm">
                    Bookmark
                  </Text>
                </Group>
              </ActionIcon>
            </Group>
            <Modal
              withCloseButton={false}
              opened={opened}
              radius="lg"
              onClose={() => {
                setOpened(false)
              }}
              size="auto"
            >
              <CommentForm post={usePost.state.postSelect} setOpened={setOpened} />
            </Modal>

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
