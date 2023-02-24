import { Avatar, Card, Group, Text, ActionIcon, Image, Stack, Center, Badge } from '@mantine/core'
import { IFPostView } from './../../types/index'
import { useNavigate } from 'react-router-dom'
import avatarfault from './../../assets/user.png'
import imageDfault from './../../assets/banner.png'
import { timeAgoHepler } from '../../helpers'

type PostViewProps = {
  post: IFPostView
}
const listGradient = [
  { from: 'indigo', to: 'cyan' },
  { from: 'orange', to: 'red' },
  { from: 'teal', to: 'blue', deg: 60 },
  { from: 'teal', to: 'lime', deg: 105 },
  { from: '#ed6ea0', to: '#ec8c69', deg: 35 },
]
const PostView = (props: PostViewProps) => {
  const { title, image, id, content, countLike, tags, countComment, release_date, author } = props.post
  const navigate = useNavigate()

  return (
    <Stack style={{ minWidth: 310, cursor: 'pointer' }}>
      <Card.Section pt={18} pb={16} px={32} onClick={() => navigate(`/user/profile/${author.id}`)}>
        <Group align="center">
          <Avatar
            sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
            size={40}
            radius="xl"
            color="blue"
            src={author?.avatar || avatarfault}
            alt="avatar"
          />
          <div>
            <Text weight={600} size={14}>
              {author?.display_name}
            </Text>
            <Text size={12}>{timeAgoHepler(release_date)}</Text>
          </div>
        </Group>
      </Card.Section>
      <Card.Section px="md">
        <Group mb="xs">
          <Text weight={700} size={32}>
            {title}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section px="md" mih={50}>
        <Group mb="xs" px="md" style={{ borderLeftWidth: '3px', borderLeftStyle: 'solid', borderColor: '#ce3df3' }}>
          <Text size="md">{content}</Text>
        </Group>
      </Card.Section>
      <Group px="md" mt="lg">
        {tags &&
          tags[0] &&
          tags.map((tag: any, index: number) => (
            <Badge key={index} size="lg" variant="gradient" gradient={listGradient[index]}>
              {tag.name}
            </Badge>
          ))}
      </Group>
      <Card.Section mt="lg" px="xs">
        <Image src={image || imageDfault} alt={title} height={330} radius="md" />
      </Card.Section>
    </Stack>
  )
}

export default PostView
