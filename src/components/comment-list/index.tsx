import { Stack } from '@mantine/core'

import { IFCommentList } from './../../types/index'
import React from 'react'
import CommentCard from '../comment-card'

type PostListProps = {
  comments: IFCommentList[] | null
}

const CommentList = (props: PostListProps) => {
  return (
    <Stack spacing="xl" mt={20}>
      {props.comments &&
        props.comments[0] &&
        props.comments.map((item: IFCommentList) => (
          <React.Fragment key={item.id}>
            <CommentCard comment={item} />
          </React.Fragment>
        ))}
    </Stack>
  )
}

export default CommentList
