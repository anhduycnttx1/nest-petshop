import { useForm } from '@mantine/form'
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useAuthController } from '../../controllers/auth.controller'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IconHome } from '@tabler/icons'

type FormLoginValue = {
  username: string
  password: string
}
const shadow_md = {
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}
const LoginPage = () => {
  const [opened, setOpened] = useState(false)
  const { onSignin, state } = useAuthController()
  const { loading, isAuthenticated } = state
  const navigator = useNavigate()
  const formLogin = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => (value.length >= 4 ? null : 'Username must have at least 4 letters'),
      password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 letters'),
    },
  })
  const handlerSubmit = (values: FormLoginValue) => onSignin(values.username, values.password)

  return (
    <>
      {/* {loading && <LoaderPage />} */}
      {!loading && isAuthenticated && <Navigate to="/" />}
      {!isAuthenticated && (
        <Container>
          <Flex h="100vh" align="center" justify="center">
            <Box sx={{ ...shadow_md }} mx="auto" px={40} py={24}>
              <form onSubmit={formLogin.onSubmit(handlerSubmit)} style={{ width: 'auto' }}>
                <Group>
                  <ActionIcon color="dark" variant="transparent" onClick={() => navigator('/')}>
                    <IconHome size={18} />
                  </ActionIcon>
                  <Title size="md">Login Account</Title>
                </Group>
                <Space h="md"></Space>
                <TextInput
                  withAsterisk
                  label="Username"
                  placeholder="username"
                  {...formLogin.getInputProps('username')}
                />

                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  withAsterisk
                  {...formLogin.getInputProps('password')}
                />

                <Group position="right" mt="md">
                  <Button type="submit" color="cyan" loading={loading}>
                    Login
                  </Button>
                </Group>

                <Modal opened={opened} onClose={() => setOpened(false)} title="It's quick and easy.">
                  {/* Modal content */}
                  <FormRegister />
                </Modal>
              </form>
              <Group position="center" mt="md">
                <Text fz="xs">
                  Don't have an account?{' '}
                  <Button variant="subtle" color="cyan" compact onClick={() => setOpened(true)}>
                    Register
                  </Button>
                </Text>
              </Group>
            </Box>
          </Flex>
        </Container>
      )}
    </>
  )
}

export default LoginPage

type FormRegisterValue = {
  email: string
  password: string
  confirmPassword: string
  fisrtName: string
  surName: string
  username: string
}

function FormRegister() {
  const { onSignup, state } = useAuthController()
  const formRegister = useForm({
    initialValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
      fisrtName: '',
      surName: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 letters'),
      username: (value) => (value.length >= 6 ? null : 'Username must have at least 6 letters'),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  })
  const handlerSubmit = (values: FormRegisterValue) => {
    onSignup({
      username: values.username,
      password: values.confirmPassword,
      email: values.email,
      lastName: values.surName,
      firstName: values.fisrtName,
    })
  }

  return (
    <Box>
      <form onSubmit={formRegister.onSubmit(handlerSubmit)} style={{ width: 'auto' }}>
        <Group>
          <Title size="lg">Signup Account</Title>
        </Group>
        <Space h="md"></Space>
        <Stack>
          <Group>
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="First name"
              {...formRegister.getInputProps('fisrtName')}
            />
            <TextInput withAsterisk label="Surname" placeholder="Suname" {...formRegister.getInputProps('surName')} />
          </Group>
          <TextInput withAsterisk label="Email" placeholder="your@email.com" {...formRegister.getInputProps('email')} />
          <TextInput withAsterisk label="Username" placeholder="username" {...formRegister.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Password" {...formRegister.getInputProps('password')} />
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            {...formRegister.getInputProps('confirmPassword')}
          />
        </Stack>
        <Group position="right" mt="md">
          <Button type="submit" color="cyan" loading={state.loading}>
            Register
          </Button>
        </Group>
      </form>
    </Box>
  )
}
