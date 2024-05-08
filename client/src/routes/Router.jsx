import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JobDetails from '../pages/job-details';
import AddJob from '../pages/add-job';

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
        path: '/add-job',
        element: <AddJob />,
      },
      {
        path: '/jobs/:id',
        element: <JobDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
      },
    ],
  },
]);

export default router;
