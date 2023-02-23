import { Card, Text, Avatar, Tooltip, Group } from '@mantine/core'
import { IFCommentList } from '../../types/index'
import { useNavigate } from 'react-router-dom'
import avatarfault from './../../assets/user.png'

import { timeAgoHepler } from '../../helpers'

type CommentCardProps = {
  comment: IFCommentList
}
function CommentCard(props: CommentCardProps) {
  const { content, id, release_date, author } = props.comment
  const navigate = useNavigate()
  return (
    <Card shadow="md" style={{ minWidth: 300, cursor: 'pointer', backgroundColor: '#f9fafb' }} radius="md">
      <Card.Section px="md" py="xs">
        <Tooltip label={author.display_name} color="dark" position="top-start" withArrow>
          <Group onClick={() => navigate(`/user/profile/${author.id}`)}>
            <Avatar
              sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
              size={40}
              radius="xl"
              color="blue"
              src={author.avatar || avatarfault}
              alt="Avatar"
            />
            <div>
              <Text weight={600} size={16}>
                {author?.display_name}
              </Text>
              <Text size={12}>{timeAgoHepler(release_date)}</Text>
            </div>
          </Group>
        </Tooltip>
      </Card.Section>
      <Card.Section px="md" mt="sm" mih={50}>
        <Group mb="xs" pl={20}>
          <Text weight={500} size="md">
            {content}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default CommentCard
