import { Text, Image, createStyles, ActionIcon } from '@mantine/core'
import defaultAvt from './../../assets/user.png'
import { IFUserView } from '../../types'
import { IconCamera } from '@tabler/icons'
import { useAuthController } from '../../controllers/auth.controller'
const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 400,
    borderRadius: theme.spacing.sm,
    marginBottom: 110,
  },
  avatar: {
    position: 'absolute',
    bottom: -96,
    left: 20,
    width: 140,
    height: 140,
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#fff',
    background: '#fff',
    boxShadow: '0 8px 15px -3px rgba(99,102,241,.5), 0 2px 4px -4px rgba(99,102,241,.5)',
    cursor: 'pointer',
  },
  info: {
    position: 'absolute',
    bottom: -88,
    left: 200,
  },
  chageImage: {
    boxShadow: '0 8px 15px -3px rgba(99,102,241,.5), 0 2px 4px -4px rgba(99,102,241,.5)',
    cursor: 'pointer',
    zIndex: 2,
    position: 'absolute',
    bottom: -96,
    left: 120,
    opacity: 0.8,
  },
  chageBanne: {
    boxShadow: '0 8px 15px -3px rgba(99,102,241,.5), 0 2px 4px -4px rgba(99,102,241,.5)',
    cursor: 'pointer',
    zIndex: 2,
    position: 'absolute',
    top: 10,
    right: 10,
    opacity: 0.8,
  },
}))

type Props = {
  user: IFUserView | null
}
export default function HeaderInfo({ user }: Props) {
  const { classes } = useStyles()
  const useAuth = useAuthController()
  const avatar = user?.avatar ? user?.avatar : defaultAvt
  const isShowChageImage = useAuth.state.user?.id && useAuth.state.user?.id === user?.id
  return (
    <div className={classes.hero}>
      {isShowChageImage && (
        <ActionIcon size="lg" radius={50} variant="light" color="violet" className={classes.chageBanne}>
          <IconCamera />
        </ActionIcon>
      )}
      {isShowChageImage && (
        <ActionIcon size="lg" radius={50} variant="light" color="violet" className={classes.chageImage}>
          <IconCamera />
        </ActionIcon>
      )}
      <div className={classes.avatar}>
        <Image radius={100} src={avatar} withPlaceholder />
      </div>
      <div className={classes.info}>
        <Text weight={750} size={28} color="#1f2937">
          {user?.display_name}
        </Text>
        <Text size={18} color="#6b7280">
          @{user?.username}
        </Text>
      </div>
    </div>
  )
}
