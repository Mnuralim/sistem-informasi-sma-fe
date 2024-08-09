'use client'

import { credentialLogin } from '@/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { IoWarningOutline } from 'react-icons/io5'

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/home'

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await credentialLogin(formData, callbackUrl)

      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push(result.callbackUrl)
      }
    } catch (error) {
      setError('Terjadi kesalahan yang tidak terduga')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10">
      {error && (
        <div
          className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <IoWarningOutline className="flex-shrink-0 w-5 h-5 mr-3" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
