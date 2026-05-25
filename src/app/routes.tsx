import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: MainPage },
      { path: 'about', Component: AboutPage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
]);
