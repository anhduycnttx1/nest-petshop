import { Flex, Grid, Group, Image, createStyles } from '@mantine/core'
import { IFPhotoList } from '../../types'
import React from 'react'

type PostListProps = {
  images: IFPhotoList[] | null
}

const useStyles = createStyles((theme) => ({
  photo: {
    maxWidth: '100%',
    verticalAlign: 'top',
    height: '210px',
    boxSizing: 'border-box',
    objectPosition: 'center',
    objectFit: 'cover',

    '&:hover': {
      opacity: '0.44',
      filter: 'grayscale(100%)',
      transform: 'scale(1.2)',
      transition: 'all .35s ease-in',
    },
  },

  item: {
    position: 'relative',
    float: 'left',
    overflow: 'hidden',
    margin: '10px 1%',
    minWidth: '220px',
    maxWidth: '290px',
    width: '100%',
    background: '#000000',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#34495e',
  },
}))
const PhotoList = (props: PostListProps) => {
  const { classes } = useStyles()
  return (
    <Group position="center">
      <Flex wrap="wrap">
        {props.images &&
          props.images[0] &&
          props.images.map((image: IFPhotoList) => (
            <div key={image.id} className={classes.item}>
              {image.url && <img className={classes.photo} src={image.url} alt={image.id} />}
            </div>
          ))}
      </Flex>
    </Group>
  )
}

export default PhotoList
