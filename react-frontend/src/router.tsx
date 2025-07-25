import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ExercisesPage from './pages/ExercisesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogWorkoutPage from './pages/LogWorkoutPage';
import NotFoundPage from './pages/NotFoundPage';
import RoutinesPage from './pages/RoutinesPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectedRoute />, // <--- This wraps the protected routes
        children: [
          { path: 'exercises', element: <ExercisesPage /> },
          { path: 'routines', element: <RoutinesPage /> },      // PROTECTED
          { path: 'log-workout', element: <LogWorkoutPage /> }, // PROTECTED
        ],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

export default router;
