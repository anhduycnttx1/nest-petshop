import { Card, Image, Text, Avatar, Button, Tooltip, Group, ActionIcon } from '@mantine/core'
import { IFPostList } from '../../types/index'
import { IconBookmark, IconHeart, IconMessageCircle2 } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import avatarfault from './../../assets/user.png'
import imageDfault from './../../assets/banner.png'
import { timeAgoHepler } from '../../helpers'
import { IconHeartFilled } from '@tabler/icons-react'
import { usePostController } from '../../controllers/post.controller'
import { useCallback } from 'react'
import { useAuthController } from './../../controllers/auth.controller'

type MyCardProps = {
  post: IFPostList
}
function PostCard(props: MyCardProps) {
  const { title, image, id, countLike, isUpvote, countComment, release_date, author } = props.post
  const usePost = usePostController()
  const useAuth = useAuthController()
  const navigate = useNavigate()
  const handlerUpvote = useCallback(() => {
    if (useAuth.state.isAuthenticated) {
      return usePost.onVotePosts(id)
    } else {
      return navigate(`/login`)
    }
  }, [])
  const handlerComment = useCallback(() => {
    if (useAuth.state.isAuthenticated) {
      return navigate(`/post/public/${id}`)
    } else {
      return navigate(`/login`)
    }
  }, [])
  const handlerBookmark = useCallback(() => {
    if (useAuth.state.isAuthenticated) {
      // return navigate(`/post/public/${id}`)
    } else {
      return navigate(`/login`)
    }
  }, [])
  return (
    <Card shadow="md" style={{ minWidth: 300, cursor: 'pointer', backgroundColor: '#f9fafb' }} radius="md" withBorder>
      <Card.Section px="md" py="xs">
        <Tooltip label={author.display_name} color="dark" position="top-start" withArrow>
          <Group>
            <Avatar
              sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
              onClick={() => navigate(`/user/${author.id}`)}
              size={32}
              radius="xl"
              color="blue"
              src={author.avatar || avatarfault}
              alt="Avatar"
            />
            <div>
              <Text weight={600} size={14}>
                {author?.display_name}
              </Text>
              <Text size={12}>{timeAgoHepler(release_date)}</Text>
            </div>
          </Group>
        </Tooltip>
      </Card.Section>
      <Card.Section px="md" mih={50} onClick={() => navigate(`/post/public/${id}`)}>
        <Group mb="xs">
          <Text weight={700} size="md" lineClamp={2}>
            {title}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section mt="sm" px="xs" onClick={() => navigate(`/post/public/${id}`)}>
        <Image src={image || imageDfault} alt={title} height={180} radius="md" withPlaceholder />
      </Card.Section>
      <Group grow style={{ marginTop: 10 }}>
        <ActionIcon color="pink" variant="transparent" onClick={handlerUpvote}>
          {isUpvote ? <IconHeartFilled /> : <IconHeart />}
          <Text weight={700} size="sm" ml={10}>
            {countLike > 0 ? countLike : null}
          </Text>
        </ActionIcon>
        <ActionIcon color="pink" variant="transparent" onClick={handlerComment}>
          <IconMessageCircle2 />
          <Text weight={700} size="sm" ml={10}>
            {countComment > 0 ? countComment : null}
          </Text>
        </ActionIcon>
        <ActionIcon color="pink" variant="transparent" onClick={handlerBookmark}>
          <IconBookmark />
        </ActionIcon>
      </Group>
    </Card>
  )
}

export default PostCard
