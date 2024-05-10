import { useContext } from 'react';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = async () => {
    await logOut();
    toast.success('logged out successfully', {
      style: {
        borderRadius: '10px',
        background: '#333',
        padding: '14px 20px',
        color: '#fff',
      },
    });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to={'/'} className="flex gap-2 items-center">
          <img className="w-auto h-12" src={logo} />
          <span className="font-black text-2xl underline">SoloSphere</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal font-bold text-base px-1">
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/all-jobs'}>All Jobs</NavLink>
          </li>

          {!user && (
            <li>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <details className="dropdown dropdown-end font-bold  z-50">
            <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full" title="">
                <img referrerPolicy="no-referrer" alt="User Profile Photo" src={user?.photoURL} />
              </div>
            </summary>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/add-job" className="justify-between">
                  Add Job
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-posted-jobs">My Posted Jobs</NavLink>
              </li>
              <li>
                <NavLink to="/my-bids">My Bids</NavLink>
              </li>
              <li>
                <NavLink to="/bid-requests">Bid Requests</NavLink>
              </li>
              <li className="mt-2">
                <button onClick={handleLogout} className="bg-gray-200 block text-center">
                  Logout
                </button>
              </li>
            </ul>
          </details>
        )}
      </div>
    </div>
  );
};

export default Header;
