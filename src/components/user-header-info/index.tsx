import {
  Text,
  Image,
  createStyles,
  ActionIcon,
  Modal,
  Stack,
  Group,
  Title,
  Flex,
  Loader,
  Button,
  FileButton,
} from '@mantine/core'
import defaultAvt from './../../assets/user.png'
import defaultBanner from './../../assets/banner.png'
import { IFUserView } from '../../types'
import { IconCamera } from '@tabler/icons'
import { useAuthController } from '../../controllers/auth.controller'
import { useCallback, useEffect, useState } from 'react'
import { useUserController } from '../../controllers/user.controller'
import PhotoList from '../photo-list'
const useStyles = createStyles((theme, { url }: { url: string }) => ({
  hero: {
    position: 'relative',
    backgroundImage: `url(${url})`,
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
  chageAvatar: {
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
  const [opened, setOpened] = useState(false)
  const useAuth = useAuthController()
  const avatar = user?.avatar ? user?.avatar : defaultAvt
  const banner = user?.banner ? user?.banner : defaultBanner
  const isShowChageImage = useAuth.state.user?.id && useAuth.state.user?.id === user?.id
  const { classes } = useStyles({ url: banner })

  const handleAvatar = useCallback(() => {
    setOpened(true)
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
        size="auto"
      >
        <ScreenUploadImage />
      </Modal>
      {isShowChageImage && (
        <ActionIcon size="lg" radius={50} variant="light" color="violet" className={classes.chageBanne}>
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
const useStylesImage = createStyles((theme) => ({
  btnUpload: {
    padding: '10px 20px',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: theme.spacing.lg,
  },
}))

function ScreenUploadImage() {
  const [imageId, setImageId] = useState(null)
  const { onPhotosOrderByUser, state } = useUserController()
  const { classes } = useStylesImage()
  useEffect(() => {
    onPhotosOrderByUser()
  }, [])
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handlerUpfile = useCallback((files: any) => {
    const selectedFile = files[0]
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }, [])

  return (
    <Stack miw={400} px={18} py={10}>
      <Stack>
        <Title order={4}>Update profile picture</Title>
        <div className={classes.btnUpload}>
          <FileButton onChange={handlerUpfile} accept="image/png,image/jpeg" multiple>
            {(props) => (
              <ActionIcon color="cyan" variant="transparent" {...props} size="lg" w={400}>
                <Text weight={600}>Upload image</Text>
              </ActionIcon>
            )}
          </FileButton>
        </div>
      </Stack>
      <Stack>
        <Title order={5}>Your photo</Title>
        <Flex>
          {!state.loadingPhoto ? (
            state.photos && (
              <PhotoList mxwi="100px" hi="100px" onGetImageId={(photo) => console.log(photo)} images={state.photos} />
            )
          ) : (
            <Loader color="cyan" size="sm" />
          )}
        </Flex>
      </Stack>
    </Stack>
  )
}
