import React from 'react'

const Vision = () => {
  return (
    <section id="vision" className="py-10 lg:py-20 px-5 lg:px-0 bg-gray-50">
      <div className="grid lg:grid-cols-2 gap-y-10 gap-x-14 items-center w-full max-w-7xl mx-auto">
        <div
          className="w-full mx-auto h-auto bg-no-repeat bg-center bg-cover aspect-square lg:aspect-[10/9.4] rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url('/img/visi.png')`,
          }}
        ></div>
        <div className="lg:pl-10 text-center lg:text-left space-y-5">
          <h1 className="text-orange-05 font-bold text-3xl lg:text-5xl">Visi Sekolah</h1>
          <p className="text-black-secondary font-medium text-base lg:text-lg leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum temporibus dolor ipsam beatae nihil quod,
            dicta cupiditate autem officiis harum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, quis.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Vision
