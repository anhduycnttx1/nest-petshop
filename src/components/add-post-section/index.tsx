import { Button, Center, Grid, Group, Modal, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import { useAuthController } from '../../controllers/auth.controller'
import { useState } from 'react'
import PostFromCreate from '../post-from-create'

type PostListProps = {}

export default function SectionAddPost(props: PostListProps) {
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()
  const { state } = useAuthController()
  const groupStyle = {
    boxShadow: '0 8px 15px -3px rgba(99,102,241,.5), 0 2px 4px -4px rgba(99,102,241,.5)',
    cursor: 'pointer',
    borderRadius: '0.75rem',
  }

  const handlerShareIdeas = () => {
    if (!state.isAuthenticated) return navigate('login')
    return setOpened(true)
  }
  return (
    <Center style={{ width: '100%' }} mb={52} mt={14}>
      <Group sx={groupStyle} px={12} py={8}>
        <Text size={13} ml={8} mr={12}>
          Share what you know, you'll get more in return
        </Text>
        <Modal
          radius="lg"
          opened={opened}
          size="auto"
          onClose={() => setOpened(false)}
          transition="fade"
          transitionDuration={500}
          transitionTimingFunction="ease"
        >
          <PostFromCreate onOpened={setOpened} />
        </Modal>
        <Button color="violet" radius="md" leftIcon={<IconPlus />} onClick={handlerShareIdeas}>
          Share your ideas
        </Button>
      </Group>
    </Center>
  )
}
