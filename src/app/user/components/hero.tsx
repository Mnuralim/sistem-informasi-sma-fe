import Image from 'next/image'
import Link from 'next/link'

interface Props {
  name: string
  tagline: string
  logo: string
}

export default function Hero({ logo, name, tagline }: Props) {
  return (
    <section
      className={`overflow-hidden relative select-none pt-10 text-white bg-[linear-gradient(270deg,#202244_0.25%,#0B49B4_85.39%)] px-[5vw] md:px-[10vw] `}
      data-cy="hero-section"
      id="hero"
    >
      <div
        className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/hero-vector.svg')",
        }}
      />
      <div className="relative flex flex-col-reverse items-center mx-auto max-w-7xl md:grid md:grid-cols-2 md:items-end">
        {/* <Image
          alt="Hero Vector"
          className="absolute -top-56 md:-top-[350px] md:-left-[350px] 2xl:-left-[100px] w-[1000px] h-[1000px]"
          draggable={false}
          height={0}
          priority={true}
          src={'/img/hero-vector.svg'}
          width={0}
        /> */}
        <div className="z-10 flex flex-col justify-center max-w-md gap-2 pb-16">
          <h2 className="text-sm lg:text-base font-bold rounded-full px-3 py-2 text-center w-full md:w-fit bg-[rgba(255,255,255,0.1)]">
            Terakreditasi A
          </h2>
          <h2 className="text-2xl font-extrabold leading-tight sm:leading-snug lg:leading-normal md:text-3xl lg:text-4xl">
            SMA NEGERI 2
            <br />
            <span>LOREM</span>
          </h2>
          <p className="my-2 font-medium text-[#D5DFF1]">
            Selamat datang di SMA Negeri 2 Lorem, kami menyediakan pendidikan terbaik untuk anak-anak dengan slogan{' '}
            {tagline}.
          </p>
          <div className="flex justify-center gap-5 text-center md:justify-normal">
            <Link
              className="px-4 py-2 xl:px-5 xl:py-3 text-sm xl:text-lg text-[#383746] transition-colors rounded-lg font-semibold bg-white border border-transparent hover:bg-[#EBEBEB] w-fit"
              href="/user#contact"
            >
              Hubungi Kami
            </Link>
            <Link
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-transparent border border-white rounded-lg xl:px-5 xl:py-3 xl:text-lg hover:bg-black/10 w-fit"
              href="/user/history"
            >
              Tentang Sekolah
            </Link>
          </div>
        </div>
        <Image
          alt="Logo"
          className="aspect-square max-w-[60%] md:justify-self-end mb-5"
          data-cy="hero-image"
          draggable={false}
          height={2000}
          src={logo}
          width={2000}
        />
      </div>
    </section>
  )
}
