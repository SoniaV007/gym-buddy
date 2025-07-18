import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ExercisesPage from './pages/ExercisesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogWorkoutPage from './pages/LogWorkoutPage';
import NotFoundPage from './pages/NotFoundPage';
import RoutinesPage from './pages/RoutinesPage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'exercises',
        element: <ExercisesPage />,
      },
      {
        path: 'routines',
        element: <RoutinesPage />,
      },
      {
        path: 'log-workout',
        element: <LogWorkoutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
