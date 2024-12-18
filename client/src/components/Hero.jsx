import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Login from '../pages/Login.jsx';

const Hero = () => {
  return (
    <div className="hero bg-base-200 h-[85vh] mt-[-80px]">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold my-4">Karamat Trust</h1>
          <h1 className="text-5xl font-bold">The Commercial Hub</h1>
          <p className="text-2xl font-semibold py-6">
            Your one-stop shop for all your commercial needs!
          </p>
          <button className="btn btn-lg btn-primary"><Link to="/login" element={<Login/>}>Own Shop Now!</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Hero