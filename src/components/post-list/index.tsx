import { Center, Grid } from '@mantine/core'
import { IFPostList } from '../../types'
import PostCard from '../post-card'

type PostListProps = {
  posts: IFPostList[] | null
}

const PostList = (props: PostListProps) => {
  return (
    <Grid w="100%" gutter={25} columns={12}>
      {props.posts &&
        props.posts[0] &&
        props.posts.map((post: IFPostList) => (
          <Grid.Col key={post.id} sm={6} lg={4}>
            <PostCard post={post} />
          </Grid.Col>
        ))}
    </Grid>
  )
}

export default PostList
