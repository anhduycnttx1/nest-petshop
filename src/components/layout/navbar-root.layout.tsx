import { Navbar, Menu, Space, Avatar, Group, Text, createStyles } from '@mantine/core'
import { IconArrowBigUpLine, IconBookmark, IconDiamond, IconDiamondOff, IconFlame, IconSearch } from '@tabler/icons'
import { useAuthController } from '../../controllers/auth.controller'
import avatarDefault from '../../assets/user.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const heightHeader = 48

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    header: {
      paddingBottom: theme.spacing.sm,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
  }
})
const data = [
  { link: '/popular', label: 'Popular', icon: IconFlame },
  { link: '/best-upvoted', label: 'Most upvoted', icon: IconArrowBigUpLine },
  { link: '/best-discussions', label: 'Best discussions', icon: IconDiamond },
  { link: '/search', label: 'Search', icon: IconSearch },
  { link: '/bookmark', label: 'Bookmark', icon: IconBookmark },
  { link: '/blocks', label: 'Blocks', icon: IconDiamondOff },
]

const NavbarRoot = () => {
  const useAuth = useAuthController()
  const [active, setActive] = useState('Billing')
  const navigate = useNavigate()
  const { classes, cx } = useStyles()
  const handlerFeed = () => {
    setActive('My feed')
    return () => navigate('/')
  }
  return (
    <Navbar width={{ base: 220 }} height={`calc(100% - ${heightHeader})`} p="xs" withBorder hiddenBreakpoint="sm">
      <Navbar.Section grow>
        {useAuth.state.user ? (
          <Group onClick={handlerFeed} className={classes.header} position="apart" sx={{ cursor: 'pointer' }}>
            <Group px={15} pt={15}>
              <Avatar src={useAuth.state.user.avatar ? useAuth.state.user.avatar : avatarDefault} size="sm" />
              <Text size={14} weight={620}>
                My feed
              </Text>
            </Group>
          </Group>
        ) : (
          <Space h={30} />
        )}
        {data.map((item) => (
          <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
              event.preventDefault()
              setActive(item.label)
              navigate(item.link)
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </a>
        ))}
      </Navbar.Section>
    </Navbar>
  )
}

export default NavbarRoot
