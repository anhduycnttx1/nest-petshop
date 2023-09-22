import { Box, Flex, Image, createStyles } from '@mantine/core'
import { IFPhotoList } from '../../types'
import './style.css'

type PostListProps = {
  images: IFPhotoList[] | null
  mxhi?: string
  mxwi?: string
  onGetImageId?: (data: { id: number; url: string }) => void
}

const useStyles = createStyles((theme) => ({
  photo: {
    maxWidth: '290px',
    height: 'auto',
    paddingBottom: '30px',

    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .35s ease-in',
    },
  },

  item: {
    position: 'relative',
  },
}))
const PhotoList = (props: PostListProps) => {
  const { classes } = useStyles()
  return (
    <div className="photo-list">
      {props.images &&
        props.images[0] &&
        props.images.map((image: IFPhotoList) => (
          <Box key={image.id} className={classes.item} onClick={() => props.onGetImageId && props.onGetImageId(image)}>
            {image.url && <Image className={classes.photo} radius="lg" src={image.url} alt={`photo_${image.id}`} />}
          </Box>
        ))}
    </div>
  )
}

export default PhotoList
