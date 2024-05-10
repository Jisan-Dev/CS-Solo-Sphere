import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import JobDetails from '../pages/job-details';
import AddJob from '../pages/add-job';
import ErrorPage from '../pages/ErrorPage';
import MyPostedJobs from '../pages/my-posted-jobs';
import UpdateJob from '../pages/update-job/UpdateJob';
import MyBids from '../pages/my-bids';
import BidRequests from '../pages/bid-requests';
import PrivateRoute from './PrivateRoute';
import AllJobs from '../pages/all-jobs/AllJobs';

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
        path: '/all-jobs',
        element: <AllJobs />,
      },
      {
        path: '/add-job',
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-posted-jobs',
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bids',
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: '/bid-requests',
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
      },
      {
        path: '/jobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
      },
    ],
  },
]);

export default router;
