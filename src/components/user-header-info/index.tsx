import { Image, createStyles } from '@mantine/core'
import { useAuthController } from './../../controllers/auth/index'
import defaultAvt from './../../assets/user.png'
const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 400,
    borderRadius: theme.spacing.sm,
    marginBottom: 26,
  },
  avatar: {
    position: 'absolute',
    bottom: -80,
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
  },
}))

export default function HeaderInfo() {
  const { classes } = useStyles()
  const { user } = useAuthController().state

  const avatar = user?.avatar ? user?.avatar : defaultAvt
  return (
    <div className={classes.hero}>
      <div className={classes.avatar}>
        <Image radius={100} src={avatar} />
      </div>
    </div>
  )
}
