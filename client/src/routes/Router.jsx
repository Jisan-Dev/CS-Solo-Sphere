import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JobDetails from '../pages/job-details';
import AddJob from '../pages/add-job';
import ErrorPage from '../pages/ErrorPage';
import MyPostedJobs from '../pages/my-posted-jobs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: '/my-posted-jobs',
        element: <MyPostedJobs />,
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
