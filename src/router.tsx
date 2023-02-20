import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutRoot from './components/layout/LayoutRoot'
import HomePages from './pages/home'
import NotFoundPage from './pages/error/404'
import LoginPage from './pages/login'
import PostDetailsPages from './containers/post-details/index'
import ProfileUserPages from './pages/user/profile'
import PostFromCreate from './components/post-from-create'

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
        path: '/post/public/:postId',
        element: <PostDetailsPages />,
      },
      {
        path: '/user/profile/:userId',
        element: <ProfileUserPages />,
      },
      {
        path: '/test',
        element: <PostFromCreate />,
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
