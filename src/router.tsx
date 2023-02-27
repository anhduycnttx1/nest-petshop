import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutRoot from './components/layout/root.layout'
import HomePages from './pages/home'
import NotFoundPage from './pages/error/404'
import LoginPage from './pages/login'
import PostDetailsPages from './containers/post-details/index'
import ProfileUserPages from './pages/user/profile'
import GalleryUserPages from './pages/user/gallery'
import UserLayout from './components/layout/user.layout'
import PopularPages from './pages/post/popular'
import BestDiscussonsPages from './pages/post/best-discussons'
import MostUpvotedPages from './pages/post/most-upvoted'

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
        element: <PopularPages />,
      },
      {
        path: '/best-upvoted',
        element: <MostUpvotedPages />,
      },
      {
        path: '/best-discussions',
        element: <BestDiscussonsPages />,
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
