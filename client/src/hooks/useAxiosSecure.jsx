import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  //-------------------- axios interceptor-------------------

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      console.log('intercepted response from server before hitting the client, Response: ', response);
      return response;
    },
    async (error) => {
      console.log('intercepted error from server before hitting the client, Error: ', error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  // Requests interceptor
  // axiosSecure.interceptors.request

  //-------------------- axios interceptor-------------------

  return axiosSecure;
};

export default useAxiosSecure;
