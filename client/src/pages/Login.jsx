import React from 'react'

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="relative w-[90vw] md:w-[50vw] lg:w-fit">
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 shadow-lg animate-pulse" />
                <div
                    id="form-container"
                    className="bg-white p-16 rounded-lg shadow-2xl relative z-10 transform transition duration-500 ease-in-out"
                >
                    <h2
                    id="form-title"
                    className="text-center text-3xl font-bold mb-10 text-gray-800"
                    >
                    Login
                    </h2>
                    <form className="space-y-5">
                    <input
                        className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                        placeholder="Email"
                        type="text"
                    />
                    <input
                        className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                        placeholder="Password"
                        type="password"
                    />
                    <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign in
                    </button>
                    <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">
                        Forgot Password?
                    </a>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default Login