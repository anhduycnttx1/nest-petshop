import { useForm } from '@mantine/form'
import {
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
import { useAuthController } from '../../controllers/auth'
import LoaderPage from '../../components/loader/Loader'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'

type FormLoginValue = {
  email: string
  password: string
}
const shadow_md = {
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}
const LoginPage = () => {
  const [opened, setOpened] = useState(false)
  const { onSignIn, state } = useAuthController()
  const { loading, isValid } = state
  const formLogin = useForm({
    initialValues: {
      email: 'admin@test.com',
      password: 'abcd1234',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 letters'),
    },
  })
  const handlerSubmit = (values: FormLoginValue) => onSignIn(values.email, values.password)
  return (
    <>
      {/* {loading && <LoaderPage />} */}
      {!loading && isValid && <Navigate to="/" replace={true} />}
      {!isValid && (
        <Container>
          <Flex h="100vh" align="center" justify="center">
            <form onSubmit={formLogin.onSubmit(handlerSubmit)} style={{ width: 'auto' }}>
              <Box sx={{ ...shadow_md }} mx="auto" px={40} py={24}>
                <Group>
                  <Title size="md">Login Account</Title>
                </Group>
                <Space h="md"></Space>
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...formLogin.getInputProps('email')}
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

                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="It's quick and easy."
                >
                  {/* Modal content */}
                  <FormRegister />
                </Modal>
                <Group position="center" mt="md">
                  <Text fz="xs">
                    Don't have an account?{' '}
                    <Button variant="subtle" compact onClick={() => setOpened(true)}>
                      Register
                    </Button>
                  </Text>
                </Group>
              </Box>
            </form>
          </Flex>
        </Container>
      )}
    </>
  )
}

export default LoginPage

type FormRegisterProps = {}
type FormRegisterValue = {
  email: string
  password: string
  confirmPassword: string
  fisrtName: string
  surName: string
}
function FormRegister(props: FormRegisterProps) {
  const { onSignUp, state } = useAuthController()
  const formRegister = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fisrtName: '',
      surName: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must have at least 6 letters'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })
  const handlerSubmit = (values: FormRegisterValue) => {
    const fullname = `${values.fisrtName} ${values.surName}`
    onSignUp(fullname, values.email, values.password, values.confirmPassword)
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
              {...formRegister.getInputProps('firstName')}
            />
            <TextInput
              withAsterisk
              label="Surname"
              placeholder="Suname"
              {...formRegister.getInputProps('surName')}
            />
          </Group>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...formRegister.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...formRegister.getInputProps('password')}
          />
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
