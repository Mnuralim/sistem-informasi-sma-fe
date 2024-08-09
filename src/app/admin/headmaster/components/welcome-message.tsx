'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const WelcomeMessage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('')

  const handleSaveMessage = () => {
    console.log('Pesan sambutan disimpan:', welcomeMessage)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9] ">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="lg:text-4xl text-3xl font-bold text-[#202244] mb-8 text-center">Sambutan Kepala Sekolah</h1>
        <div className="space-y-6">
          <ReactQuill
            value={welcomeMessage}
            onChange={setWelcomeMessage}
            theme="snow"
            className="mb-4 w-full aspect-square lg:aspect-[3/1]"
            placeholder="Tulis sambutan kepala sekolah di sini..."
          />
          <div>
            <button
              onClick={handleSaveMessage}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#EB5437] hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
            >
              Simpan Sambutan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeMessage
