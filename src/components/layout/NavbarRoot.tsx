import { Navbar, Menu, Space, Avatar, Group, Text } from '@mantine/core'
import { IconArrowBigUpLine, IconBookmark, IconDiamond, IconDiamondOff, IconFlame, IconSearch } from '@tabler/icons'
import { useAuthController } from './../../controllers/auth.controller'
import avatarDefault from '../../assets/user.png'
type Props = {}
const heightHeader = 48
const NavbarRoot = (props: Props) => {
  const useAuth = useAuthController()
  return (
    <Navbar width={{ base: 220 }} height={`calc(100% - ${heightHeader})`} p="xs" withBorder hiddenBreakpoint="sm">
      <Navbar.Section mt={24}>
        <Menu>
          <Menu.Item>
            {useAuth.state.user ? (
              <Group>
                <Avatar src={useAuth.state.user.avatar ? useAuth.state.user.avatar : avatarDefault} size="sm" />
                <Text size={13}>My feed</Text>
              </Group>
            ) : (
              <Space h={20} />
            )}
          </Menu.Item>
          <Menu.Label>Discover</Menu.Label>
          <Menu.Item icon={<IconFlame size={14} />}>Popular</Menu.Item>
          <Menu.Item icon={<IconArrowBigUpLine size={14} />}>Most upvoted</Menu.Item>
          <Menu.Item icon={<IconDiamond size={14} />}>Best discussions</Menu.Item>
          <Menu.Item icon={<IconSearch size={14} />}>Search</Menu.Item>
          <Menu.Label>Manage</Menu.Label>
          <Menu.Item icon={<IconBookmark size={14} />}>Bookmark</Menu.Item>
          <Menu.Item icon={<IconDiamondOff size={14} />}>Logout account</Menu.Item>
        </Menu>
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarRoot
