'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { PiArrowCircleLeft, PiArrowCircleRight } from 'react-icons/pi'
import parse from 'html-react-parser'

interface Props {
  welcomeMessage: IWelcomeMessage
}

const PrincipalSpeech = ({ welcomeMessage }: Props) => {
  const parsedContent = parse(welcomeMessage.message)

  const contentArray = React.Children.toArray(parsedContent)

  const middleIndex = Math.ceil(contentArray.length / 2)
  const firstPart = contentArray.slice(0, middleIndex)
  const secondPart = contentArray.slice(middleIndex)

  const messageParts = [firstPart, secondPart]

  const [currentPart, setCurrentPart] = useState(0)

  const handleNext = () => {
    setCurrentPart((prev) => (prev + 1) % messageParts.length)
  }

  const handlePrev = () => {
    setCurrentPart((prev) => (prev - 1 + messageParts.length) % messageParts.length)
  }

  return (
    <section className="px-3 bg-gradient-to-b from-[#0175C5] to-[#202244] py-5 lg:py-16">
      <h1 className="text-center mb-10 lg:mb-20 text-white font-bold text-2xl lg:text-4xl transition duration-200 ease-in-out">
        Sambutan Kepala Sekolah
      </h1>
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 items-start gap-y-5 lg:gap-16">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[300px] lg:max-w-[70%] bg-dark-blue rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
            <Image
              width={300}
              height={300}
              alt="principal"
              src={welcomeMessage.teacher.imageUrl}
              className="w-full h-auto aspect-square rounded-xl object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:pl-8 px-3 lg:px-0">
          <div className="text-white text-justify text-sm sm:text-base lg:text-lg transition-opacity duration-300 ease-in-out">
            {messageParts[currentPart]}
          </div>
          <h2 className="font-bold text-lg mt-4 text-white">{welcomeMessage.teacher.name}</h2>
          <div className="flex gap-3 mt-4">
            <button
              aria-label="Previous"
              onClick={handlePrev}
              className="hover:scale-105 transition-transform duration-200 ease-in-out text-gray-600 hover:text-orange-05"
            >
              <PiArrowCircleLeft className="text-[35px] lg:text-[45px]" />
            </button>
            <button
              aria-label="Next"
              onClick={handleNext}
              className="hover:scale-105 transition-transform duration-200 ease-in-out text-gray-600 hover:text-orange-05"
            >
              <PiArrowCircleRight className="text-[35px] lg:text-[45px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrincipalSpeech
