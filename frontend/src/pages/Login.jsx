import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      if (response.data.role === 'customer') {
        navigate('/catalogue');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage('Invalid user credentials');
    }
  };


  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit}>
        
        <h1 className="text-2xl  mb-4 text-center text-gray-800 mt-10">Equipment Rental System</h1>
        <p className="text-gray-600 text-align-left text-sm mt-8">Email</p>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <p className="text-gray-600 text-align-left text-sm mt-6">Password</p>
        <input
          type="password"
          placeholder="**************"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        {message && <p className="text-red-500 text-center">{message}</p>}
        <button type="submit" className="w-2/4 bg-blue-700 text-white p-2 rounded mt-6 block mx-auto">
          Login
        </button>
        <p className="text-center mt-10 text-gray-600">
          Don't have an account? <Link className="text-blue-500 hover:underline " to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
