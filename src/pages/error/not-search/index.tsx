import { createStyles, Title, Text, Button, Container, Group, Image, Flex } from '@mantine/core'
import { Link } from 'react-router-dom'
import NotSearch from './../../../assets/not-search.svg'
const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: '#fcafea',
    marginTop: theme.spacing.lg,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg * 1.5,
  },
}))
type Props = {
  title?: string
  isBtn: boolean
}
export default function NotSearchPage(props: Props) {
  const { classes } = useStyles()
  return (
    <Flex align="center" justify="center" pt={50}>
      <Container>
        <Group position="center">
          <Image src={NotSearch} alt="404" width={200} />
        </Group>
        <Title className={classes.title}>OOPS!</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          {props.title ? props.title : 'Unfortunately, Not found you want!'}
        </Text>
        <Group position="center">
          <Link to="/">
            {props.isBtn && (
              <Button color="cyan" variant="subtle" size="md">
                Go to Home
              </Button>
            )}
          </Link>
        </Group>
      </Container>
    </Flex>
  )
}
