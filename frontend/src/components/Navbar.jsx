import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-200 text-gray-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Equipment Rental System</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.firstName} {user.lastName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded text-gray-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
