import React from 'react'

const Mission = () => {
  return (
    <section className="py-10 lg:py-20 px-5 lg:px-0 bg-white">
      <div className="grid lg:grid-cols-2 gap-y-10 gap-x-14 items-center w-full max-w-7xl mx-auto">
        <div
          className="w-full mx-auto h-auto bg-no-repeat bg-center bg-cover aspect-square lg:aspect-[10/7] rounded-lg shadow-lg overflow-hidden lg:order-2"
          style={{
            backgroundImage: `url('/img/misi.png')`,
          }}
        ></div>
        <div className="lg:pl-10 text-center lg:text-left space-y-5 lg:order-1">
          <h1 className="text-orange-05 font-bold text-3xl lg:text-5xl">Misi Sekolah</h1>
          <p className="text-black-secondary font-medium text-base lg:text-lg leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum temporibus dolor ipsam beatae nihil quod,
            dicta cupiditate autem officiis harum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, quis.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mission
