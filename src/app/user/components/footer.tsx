import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { FaEnvelope, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

interface Props {
  profile: IProfile
}

const Footer = ({ profile }: Props) => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="w-full max-w-7xl mx-auto px-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Image src="/img/logo.png" alt="Logo Sekolah" width={64} height={64} className="h-16 w-16" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600 text-sm md:text-base lg:max-w-[50%]">
                {profile.address}, {profile.city}, {profile.province}
              </p>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link
              href={profile.facebook}
              target="_blank"
              className="text-gray-600 hover:text-gray-900 bg-white shadow-md aspect-square p-2 rounded-full flex items-center justify-center"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href={profile.instagram}
              target="_blank"
              className="text-gray-600 hover:text-gray-900 bg-white shadow-md aspect-square p-2 rounded-full flex items-center justify-center"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href={profile.youtube}
              target="_blank"
              className="text-gray-600 hover:text-gray-900 bg-white shadow-md aspect-square p-2 rounded-full flex items-center justify-center"
            >
              <FaYoutube size={20} />
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              className="text-gray-600 hover:text-gray-900 bg-white shadow-md aspect-square p-2 rounded-full flex items-center justify-center"
            >
              <FaEnvelope size={20} />
            </Link>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-700">
          <p>
            &copy; {new Date().getFullYear()}
            {' - '}
            <span className="font-medium">{profile.name}</span>. All rights reserved.
          </p>
          <p className="text-sm">
            Designed by{' '}
            <Link href="https://github.com/Mnuralim" className="text-blue-600 hover:underline">
              Mnuralim
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
