import OsisStructure from "./components/osis-structure"

const Page = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Struktur Organisasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Struktur Organisasi OSIS
          </p>
        </div>
        <OsisStructure />
      </div>
    </section>
  )
}

export default Page
