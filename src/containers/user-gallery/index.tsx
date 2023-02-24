import { Group, Loader, Space, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthController } from './../../controllers/auth.controller'
import PhotoList from '../../components/photo-list'
import { useUserController } from './../../controllers/user.controller'
import NotSearchPage from '../../pages/error/not-search'

const UserGalleryContainer = () => {
  let { userId } = useParams()
  const useAuth = useAuthController()
  const { onPhotosOrderByUser, state } = useUserController()

  useEffect(() => {
    onPhotosOrderByUser()
  }, [])

  return (
    <React.Fragment>
      {useAuth.state.user?.id !== userId && <NotSearchPage isBtn={true} />}
      {useAuth.state.user?.id === userId && (
        <React.Fragment>
          <Group my={10} mx={10}>
            <Title order={3}>My photos</Title>
          </Group>
          <Group>
            {!state.loadingPhoto ? (
              state.photos && <PhotoList images={state.photos} />
            ) : (
              <Loader color="cyan" size="sm" />
            )}
          </Group>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default UserGalleryContainer
