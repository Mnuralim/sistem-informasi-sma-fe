import Image from 'next/image'
import React from 'react'
import { PiArrowCircleLeft, PiArrowCircleRight } from 'react-icons/pi'

const PrincipalSpeech = () => {
  return (
    <section className="px-3 bg-[#f9f9fa] py-5 lg:py-16">
      <h1 className="text-center mb-10 lg:mb-20 text-orange-500 font-bold text-2xl lg:text-4xl">
        Sambutan Kepala Sekolah
      </h1>
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-y-5 lg:gap-16">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[300px] lg:max-w-[70%] bg-dark-blue rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              width={300}
              height={300}
              alt="principal"
              src={'/img/PPL 1.svg'}
              className="w-full h-auto aspect-square rounded-xl"
            />
          </div>
        </div>
        <div className="lg:pl-8 px-3 lg:px-0">
          <p className="text-black-secondary font-medium text-justify text-sm sm:text-base lg:text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore vel pariatur libero nesciunt vero quis
            placeat ab. Minus cupiditate soluta reiciendis perferendis voluptates! Est, quia quae officiis animi
            voluptas quisquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eum ea mollitia vel.
            Dolore impedit numquam itaque explicabo id modi.
          </p>
          <h2 className="font-bold text-lg mt-4">John Doe</h2>
          <div className="flex gap-3 mt-4">
            <button aria-label="Previous">
              <PiArrowCircleLeft className="hover:scale-95 text-[35px] lg:text-[45px]" />
            </button>
            <button aria-label="Next">
              <PiArrowCircleRight className="hover:scale-95 text-[35px] lg:text-[45px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrincipalSpeech
