import { Button, Center, Grid, Group, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthController } from './../../controllers/auth/index'

type PostListProps = {}

export default function SectionAddPost(props: PostListProps) {
  const navigate = useNavigate()
  const { state } = useAuthController()
  const groupStyle = {
    boxShadow: '0 8px 15px -3px rgba(99,102,241,.5), 0 2px 4px -4px rgba(99,102,241,.5)',
    cursor: 'pointer',
    borderRadius: '0.75rem',
  }

  const handlerShareIdeas = () => {
    if (!state.isAuthenticated) return navigate('login')
    return navigate('post/create')
  }
  return (
    <Center style={{ width: '100%' }} mb={52} mt={14}>
      <Group sx={groupStyle} px={12} py={8}>
        <Text size={13} ml={8} mr={12}>
          Share what you know, you'll get more in return
        </Text>
        <Button color="violet" radius="md" leftIcon={<IconPlus />} onClick={handlerShareIdeas}>
          Share your ideas
        </Button>
      </Group>
    </Center>
  )
}
