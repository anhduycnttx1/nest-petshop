import { Flex, Grid, Group, Image, createStyles } from '@mantine/core'
import { IFPhotoList } from '../../types'
import React from 'react'

type PostListProps = {
  images: IFPhotoList[] | null
  hi?: string
  mxwi?: string
  onGetImageId?: (data: { id: number; url: string }) => void
}

const useStyles = createStyles((theme, { h, mx }: { h: string; mx: string }) => ({
  photo: {
    maxWidth: '100%',
    verticalAlign: 'top',
    height: h,
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
    maxWidth: mx,
    width: '100%',
    background: '#000000',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#34495e',
  },
}))
const PhotoList = (props: PostListProps) => {
  const heightImage = props.hi || '210px'
  const mxwidthImage = props.mxwi || '290px'
  const { classes } = useStyles({ h: heightImage, mx: mxwidthImage })
  return (
    <Group position="center">
      <Flex wrap="wrap">
        {props.images &&
          props.images[0] &&
          props.images.map((image: IFPhotoList) => (
            <div
              key={image.id}
              className={classes.item}
              onClick={() => props.onGetImageId && props.onGetImageId(image)}
            >
              {image.url && <img className={classes.photo} src={image.url} alt={`photo_${image.id}`} />}
            </div>
          ))}
      </Flex>
    </Group>
  )
}

export default PhotoList
