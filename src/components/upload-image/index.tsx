import {
  Box,
  Flex,
  Stack,
  Title,
  createStyles,
  Image,
  ActionIcon,
  Button,
  FileButton,
  Text,
  Loader,
} from '@mantine/core'
import { useUserController } from '../../controllers/user.controller'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../../libs/redux/hooks'
import { updateAvatar, updateCoverImage, uploadImage } from '../../libs/api/image.axios'
import { authenticate } from '../../libs/redux/slice/auth.slice'
import { IconX } from '@tabler/icons'
import PhotoList from '../photo-list'

const useStylesImage = createStyles((theme) => ({
  btnUpload: {
    padding: '10px 20px',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: theme.spacing.lg,
  },
}))

const ScreenUploadImage = ({ isCoverImageClicked, onClose }: any) => {
  const { onPhotosOrderByUser, state } = useUserController()
  const { classes } = useStylesImage()
  const [file, setFile] = useState<File | null>(null)
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    onPhotosOrderByUser()
  }, [])

  const handlerUpfile = useCallback((files: any) => {
    const selectedFile = files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      console.log(selectedFile)
    }
  }, [])

  const handleAvatarApi = async () => {
    if (file) {
      setLoadingUpload(() => true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'user')
      const dataImage = await uploadImage(formData)
      if (dataImage) {
        const result = await updateAvatar({ imageId: dataImage?.imgId + '' })
        if (result?.code) {
          onClose()
          dispatch(authenticate())
        }
      }
      setLoadingUpload(() => false)
    }
  }

  const handleCoverImageApi = async () => {
    if (file) {
      setLoadingUpload(() => true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'user')
      const dataImage = await uploadImage(formData)
      if (dataImage) {
        const res = await updateCoverImage({ imageId: dataImage?.imgId + '' })
        if (res?.code === 200) {
          onClose()
          dispatch(authenticate())
        }
      }
      setLoadingUpload(() => false)
    }
  }

  return (
    <div>
      <Box mx="auto">
        <Stack pb={30}>
          <Title order={4}>{isCoverImageClicked ? 'Update Cover Image' : 'Update Avatar'}</Title>
          {file ? (
            <Stack align="center">
              <Flex pos="relative" justify="center">
                {isCoverImageClicked ? (
                  <Image width={400} height={250} radius="lg" src={previewUrl} alt="upload image" />
                ) : (
                  <Image width={250} height={250} radius="lg" src={previewUrl} alt="upload image" />
                )}
                <ActionIcon
                  size="sm"
                  variant="light"
                  pos="absolute"
                  top={-10}
                  right={-10}
                  color="red"
                  onClick={() => setFile(null)}
                >
                  <IconX size={18} />
                </ActionIcon>
              </Flex>
              {isCoverImageClicked ? (
                <Button onClick={handleCoverImageApi} color="cyan" w={150} loading={loadingUpload}>
                  Save
                </Button>
              ) : (
                <Button onClick={handleAvatarApi} color="cyan" w={150} loading={loadingUpload}>
                  Save
                </Button>
              )}
            </Stack>
          ) : (
            <Flex className={classes.btnUpload} justify="center">
              <FileButton onChange={handlerUpfile} accept="image/png,image/jpeg" multiple>
                {(props) => (
                  <ActionIcon color="cyan" variant="transparent" {...props} size="lg" w={600}>
                    <Text weight={600}>Upload image</Text>
                  </ActionIcon>
                )}
              </FileButton>
            </Flex>
          )}
        </Stack>
        <Stack>
          <Title order={5}>Your photo</Title>
          <Flex>
            {!state.loadingPhoto ? (
              state.photos && <PhotoList onGetImageId={(photo) => console.log(photo)} images={state.photos} />
            ) : (
              <Loader color="cyan" size="sm" />
            )}
          </Flex>
        </Stack>
      </Box>
    </div>
  )
}

export default ScreenUploadImage
