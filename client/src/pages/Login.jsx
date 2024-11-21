import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext.jsx'; // Import the AuthContext hook

const Login = () => {
  const { login } = useAuth(); // Access the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      login(response.data.token); // Use AuthContext to manage login
      window.location.href = '/'; // Redirect to home page or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-[90vw] md:w-[50vw] lg:w-fit">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 shadow-lg animate-pulse" />
        <div id="form-container" className="bg-white p-16 rounded-lg shadow-2xl relative z-10">
          <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
          <div className="space-y-5">
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
