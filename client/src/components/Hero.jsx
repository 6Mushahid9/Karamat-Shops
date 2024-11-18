import React from 'react'

const Hero = () => {
  return (
    <div className="hero bg-base-200 h-[85vh] mt-[-80px]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Karamat Trust</h1>
          <h1 className="text-3xl font-bold">The Commercial Hub</h1>
          <p className="text-2xl font-semibold py-6">
            Your one-stop shop for all your commercial needs!
          </p>
          <button className="btn btn-lg btn-primary">Own Shop Now!</button>
        </div>
      </div>
    </div>
  )
}

export default Hero