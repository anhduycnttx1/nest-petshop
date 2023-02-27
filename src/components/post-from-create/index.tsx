import {
  Box,
  Button,
  FileButton,
  Group,
  TextInput,
  Text,
  Image,
  Stack,
  ActionIcon,
  createStyles,
  Title,
  Textarea,
} from '@mantine/core'
import { useCallback, useState } from 'react'
import { useForm } from '@mantine/form'
import { IconX, IconHash } from '@tabler/icons'
import { usePostController } from '../../controllers/post.controller'

type Props = {
  onOpened: React.Dispatch<React.SetStateAction<boolean>>
}
const PostFromCreate = ({ onOpened }: Props) => {
  const { onCreatePost, state } = usePostController()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const { classes } = useStyles()

  const handlerUpfile = useCallback((files: any) => {
    const selectedFile = files[0]
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }, [])

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      tags: '',
    },

    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Invalid title'),
    },
  })
  const handleSubmit = (values: { title: string; content: string; tags: string }) => {
    setLoading(true)
    try {
      onCreatePost(values, file)
    } catch (err) {
    } finally {
      setLoading(false)
      return onOpened(false)
    }
  }
  return (
    <div>
      <Box mx="auto">
        <Title pb={10} order={2}>
          New post
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="lg">
            <TextInput
              radius="lg"
              withAsterisk
              label="Title"
              placeholder="Enter title your post"
              {...form.getInputProps('title')}
            />
            <Textarea radius="lg" placeholder="Enter content" label="Content" {...form.getInputProps('content')} />
            <TextInput
              radius="lg"
              icon={<IconHash scale={14} />}
              placeholder="Enter tags"
              label="Tags"
              {...form.getInputProps('tags')}
            />
            <Stack>
              <Text weight={500} size={14}>
                Picture
              </Text>
              {file ? (
                <div
                  style={{
                    position: 'relative',
                  }}
                >
                  <Image width={500} height={250} radius="lg" src={previewUrl} alt="upload image" />
                  <ActionIcon
                    size="sm"
                    variant="light"
                    sx={{ position: 'absolute', top: -8, right: -8 }}
                    color="red"
                    onClick={() => setFile(null)}
                  >
                    <IconX size={18} />
                  </ActionIcon>
                </div>
              ) : (
                <div className={classes.btnUpload}>
                  <FileButton onChange={handlerUpfile} accept="image/png,image/jpeg" multiple>
                    {(props) => (
                      <ActionIcon color="cyan" variant="transparent" {...props} size="lg" w={400}>
                        <Text weight={600}>Upload image</Text>
                      </ActionIcon>
                    )}
                  </FileButton>
                </div>
              )}
            </Stack>
            <Group position="right" mt="md">
              <Button color="cyan" type="submit" loading={state.loading}>
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </div>
  )
}

export default PostFromCreate

const useStyles = createStyles((theme) => ({
  btnUpload: {
    padding: '10px 20px',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: theme.spacing.lg,
  },
}))
