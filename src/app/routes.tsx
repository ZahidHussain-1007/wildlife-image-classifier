import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          { index: true, Component: MainPage },
          { path: 'profile', Component: ProfilePage },
        ],
      },
      { path: 'about', Component: AboutPage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/auth/callback',
    Component: AuthCallbackPage,
  },
]);
