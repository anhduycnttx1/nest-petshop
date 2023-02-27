import React from 'react'
import { Flex, Group, Header, Container, Avatar, Menu, Text, Title, Button } from '@mantine/core'
import { IconApps, IconLogout, IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons'
import avatarDefault from '../../assets/user.png'
import logoDefault from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuthController } from '../../controllers/auth.controller'

const HeaderRoot = () => {
  const { state } = useAuthController()
  const author = state?.user
  const avatarUser = author?.avatar || avatarDefault
  const heightHeader = 48
  const navigate = useNavigate()
  return (
    <Header height={heightHeader}>
      <Container h={heightHeader} fluid>
        <Flex justify="space-between" h={heightHeader}>
          <Group spacing="xs" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            {/* Add logo application */}
            <Avatar size="sm" src={logoDefault} alt="logo" />
            <Title size={20} color="black">
              Posi
            </Title>
          </Group>
          <Group>
            {state.isAuthenticated && (
              <PopoverUser>
                <Group
                  pl={11}
                  pr={4}
                  py={4}
                  spacing="xs"
                  className="my-button"
                  sx={{
                    cursor: 'pointer',
                    background: '#f3f4f6',
                    borderRadius: '50px',
                    boxShadow: '0 3px 8px -3px rgba(99,102,241,.5), 0 1px 3px -4px rgba(99,102,241,.5)',
                  }}
                >
                  <Text fw={500} size={14}>
                    {author?.display_name}
                  </Text>
                  {/* Add logo application */}
                  <Avatar radius={50} src={avatarUser} alt="avatar user" size="sm" />
                </Group>
              </PopoverUser>
            )}
            {!state.isAuthenticated && (
              <Button color="dark" radius="md" onClick={() => navigate('login')}>
                Access all freates
              </Button>
            )}
          </Group>
        </Flex>
      </Container>
    </Header>
  )
}

export default HeaderRoot

type PopoverUserProps = {
  children: React.ReactNode
}

function PopoverUser({ children }: PopoverUserProps) {
  const { state, onLogout } = useAuthController()
  const navigate = useNavigate()
  const handerLogout = async () => onLogout()

  return (
    <Menu trigger="hover" position="bottom" shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconApps size={14} />} onClick={() => navigate(`/user/${state.user?.id}`)}>
          Profile
        </Menu.Item>
        <Menu.Item icon={<IconPhoto size={14} />} onClick={() => navigate(`/user/${state.user?.id}/photos`)}>
          Gallery
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Settings zone</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item onClick={handerLogout} type="button" color="cyan" icon={<IconLogout size={14} />}>
          Logout account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
