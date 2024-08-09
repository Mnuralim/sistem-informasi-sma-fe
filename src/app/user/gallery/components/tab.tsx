'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Tab = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeTab = searchParams.get('type') || ''

  const handleChangeTab = (type: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', type)
    replace(`${pathname}?${params}`)
  }

  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={() => handleChangeTab('photos')}
        className={`mx-4 px-4 py-2 rounded-md text-lg font-medium ${
          activeTab === 'photos' ? 'bg-[#EB5437] text-white' : 'bg-white text-[#EB5437] border border-[#EB5437]'
        }`}
      >
        Foto
      </button>
      <button
        onClick={() => handleChangeTab('videos')}
        className={`mx-4 px-4 py-2 rounded-md text-lg font-medium ${
          activeTab === 'videos' ? 'bg-[#EB5437] text-white' : 'bg-white text-[#EB5437] border border-[#EB5437]'
        }`}
      >
        Video
      </button>
    </div>
  )
}

export default Tab
