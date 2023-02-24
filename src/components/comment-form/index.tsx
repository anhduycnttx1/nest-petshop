import { IFPostView } from './../../types/index'
import { Avatar, Group, Stack, Text, createStyles, Textarea, Button } from '@mantine/core'
import avatarDefutl from '../../assets/user.png'
import { timeAgoHepler } from '../../helpers'
import { useForm } from '@mantine/form'
import { useAuthController } from './../../controllers/auth.controller'
import { useCommentController } from './../../controllers/comment.controller'
import { toast } from 'react-toastify'
type Props = {
  post: IFPostView
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}
const useStyles = createStyles((theme) => ({
  reply: {
    marginLeft: 20,
    padding: '15px 30px',
    borderWidth: 1,
    borderLeftColor: theme.colors.gray[4],
    borderLeftStyle: 'solid',
  },
}))
const CommentForm = ({ post, setOpened }: Props) => {
  const { classes } = useStyles()
  const useAuth = useAuthController()
  const useComment = useCommentController()
  const form = useForm({
    initialValues: {
      comment: '',
    },
    validate: {
      comment: (value) => (value.length === 0 ? 'Please enter your comment' : null),
    },
  })

  const handleSubmit = (dataForm: { comment: string }) => {
    try {
      useComment.onCreatePost(dataForm, post.id)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setOpened(false)
      return form.reset()
    }
  }
  return (
    <Stack miw={400} px={18} py={10}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group>
          <Avatar
            sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
            size={45}
            radius="xl"
            color="blue"
            src={post.author.avatar || avatarDefutl}
            alt="Avatar"
          />
          <div>
            <Text weight={500} size={14}>
              {post.author?.display_name}
            </Text>
            <Text size={12}>{timeAgoHepler(post.release_date)}</Text>
          </div>
        </Group>
        <Text py={10} weight={400}>
          {post.title}
        </Text>
        <div>
          <div className={classes.reply}>
            <Text size={12}>
              Reply to <b>{post.author.display_name}</b>
            </Text>
          </div>
          <Group pl={5} align="start" mih={80}>
            <Avatar size={30} radius="sm" color="blue" src={useAuth.state.user?.avatar || avatarDefutl} alt="Avatar" />
            <Textarea
              autosize={true}
              w="calc(100% - 50px)"
              placeholder="Your comment"
              variant="unstyled"
              withAsterisk
              {...form.getInputProps('comment')}
            />
          </Group>
        </div>
        <Group position="right">
          <Button radius="lg" size="md" color="cyan" variant="light" type="submit" loading={useComment.state.loading}>
            Post
          </Button>
        </Group>
      </form>
    </Stack>
  )
}

export default CommentForm
