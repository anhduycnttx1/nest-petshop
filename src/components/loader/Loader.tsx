import { Flex, Loader } from '@mantine/core'

const LoaderPage = () => {
  return (
    <Flex justify="center" align="center" h="100vh">
      <Loader size="sm" color="cyan" />
    </Flex>
  )
}

export default LoaderPage
