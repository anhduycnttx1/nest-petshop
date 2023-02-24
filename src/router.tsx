import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutRoot from './components/layout/root.layout'
import HomePages from './pages/home'
import NotFoundPage from './pages/error/404'
import LoginPage from './pages/login'
import PostDetailsPages from './containers/post-details/index'
import ProfileUserPages from './pages/user/profile'
import GalleryUserPages from './pages/user/gallery'
import UserLayout from './components/layout/user.layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,

    children: [
      {
        path: '/',
        element: <HomePages />,
      },
      {
        path: 'post/public/:postId',
        element: <PostDetailsPages />,
      },
      {
        path: 'user/:userId',
        element: <UserLayout />,
        children: [
          {
            path: '',
            element: <ProfileUserPages />,
          },
          {
            path: 'photos',
            element: <GalleryUserPages />,
          },
        ],
      },
      {
        path: '/popular',
        element: <HomePages />,
      },
      {
        path: '/best-upvoted',
        element: <HomePages />,
      },
      {
        path: '/best-discussions',
        element: <HomePages />,
      },
      {
        path: '/search',
        element: <HomePages />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
