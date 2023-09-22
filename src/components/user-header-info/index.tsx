import { Text, createStyles, ActionIcon, Modal, Avatar } from '@mantine/core'
import defaultAvt from './../../assets/user.png'
import defaultBanner from './../../assets/banner.png'
import { IFUserView } from '../../types'
import { IconCamera } from '@tabler/icons'
import { useAuthController } from '../../controllers/auth.controller'
import { useCallback, useState } from 'react'
import ScreenUploadImage from '../upload-image'
import { useStyles } from './style'

type Props = {
  user: IFUserView | null
}
export default function HeaderInfo({ user }: Props) {
  const [opened, setOpened] = useState(false)
  const useAuth = useAuthController()
  const avatar = user?.avatar ? user?.avatar : defaultAvt
  const banner = user?.banner ? user?.banner : defaultBanner
  const isShowChageImage = useAuth.state.user?.id && useAuth.state.user?.id === user?.id
  const { classes } = useStyles({ url: banner })
  const [isCoverImageClicked, setIsCoverImageClicked] = useState(false)

  const handleAvatar = useCallback(() => {
    setOpened(true)
    setIsCoverImageClicked(false)
  }, [])

  const handleCoverImage = useCallback(() => {
    setOpened(true)
    setIsCoverImageClicked(true)
  }, [])
  return (
    <div className={classes.hero}>
      <Modal
        withCloseButton={false}
        opened={opened}
        radius="lg"
        onClose={() => {
          setOpened(false)
        }}
        size={650}
      >
        <ScreenUploadImage isCoverImageClicked={isCoverImageClicked} onClose={() => setOpened(false)} />
      </Modal>
      {isShowChageImage && (
        <ActionIcon
          size="lg"
          radius={50}
          variant="light"
          color="violet"
          className={classes.chageBanne}
          onClick={handleCoverImage}
        >
          <IconCamera />
        </ActionIcon>
      )}
      {isShowChageImage && (
        <ActionIcon
          size="lg"
          radius={50}
          variant="light"
          color="violet"
          className={classes.chageAvatar}
          onClick={handleAvatar}
        >
          <IconCamera />
        </ActionIcon>
      )}
      <div className={classes.avatar}>
        <Avatar size={150} radius={100} src={avatar} />
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
