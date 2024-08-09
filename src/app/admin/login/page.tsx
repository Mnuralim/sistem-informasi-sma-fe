import React from 'react'
import LoginForm from './components/form'

const Page = () => {
  return (
    <div className="min-h-screen fixed top-0 left-0 bg-gray-100 overflow-hidden flex items-center justify-center  w-full p-3">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default Page
