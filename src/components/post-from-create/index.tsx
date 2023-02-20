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

const PostFromCreate = () => {
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
      title: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid title'),
    },
  })

  return (
    <div>
      <Box mx="auto">
        <Title pb={10} order={2}>
          New post
        </Title>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              <Button color="cyan" type="submit">
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

// function handleSubmit(event) {
//      event.preventDefault();
//      const formData = new FormData();
//      formData.append('image', file);
//      axios.post('/api/upload-image', formData).then(response => {
//        console.log(response.data);
//      });
//    }

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
  btnUpload: {
    padding: '10px 20px',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: theme.spacing.lg,
  },
}))
