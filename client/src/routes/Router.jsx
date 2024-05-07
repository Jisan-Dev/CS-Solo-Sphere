import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JobDetails from '../pages/job-details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/jobs/:id',
        element: <JobDetails />,
      },
    ],
  },
]);

export default router;
