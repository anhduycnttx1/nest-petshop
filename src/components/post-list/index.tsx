import { Center, Grid } from '@mantine/core'
import React from 'react'
import { IFPostList } from '../../types'
import PostCard from '../post-card'

type PostListProps = {
  posts: IFPostList[] | null
}

const PostList = (props: PostListProps) => {
  return (
    <Center style={{ width: '100%' }}>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        {props.posts &&
          props.posts[0] &&
          props.posts.map((post: IFPostList) => (
            <Grid.Col key={post.id} span={4}>
              <PostCard post={post} />
            </Grid.Col>
          ))}
      </Grid>
    </Center>
  )
}

export default PostList
