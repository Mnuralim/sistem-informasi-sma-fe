'use client'
import dynamic from 'next/dynamic'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const Form = () => {
  const [aboutHtml, setAboutHtml] = useState('')
  const [developmentHtml, setDevelopmentHtml] = useState('')

  const handleAboutChange = (html: string) => {
    setAboutHtml(html)
  }

  const handleDevelopmentChange = (html: string) => {
    setDevelopmentHtml(html)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Submitted content:', { aboutHtml, developmentHtml })
  }

  const [aboutImage, setAboutImage] = useState<File | null>(null)
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null)
  const [developmentImage, setDevelopmentImage] = useState<File | null>(null)
  const [developmentImageUrl, setDevelopmentImageUrl] = useState<string | null>(null)

  const onDropAbout = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setAboutImage(file)
    setAboutImageUrl(URL.createObjectURL(file))
  }, [])

  const onDropDevelopment = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setDevelopmentImage(file)
    setDevelopmentImageUrl(URL.createObjectURL(file))
  }, [])

  const { getRootProps: getAboutRootProps, getInputProps: getAboutInputProps } = useDropzone({ onDrop: onDropAbout })
  const { getRootProps: getDevelopmentRootProps, getInputProps: getDevelopmentInputProps } = useDropzone({
    onDrop: onDropDevelopment,
  })

  return (
    <div className="mx-5 mt-5 mb-10 rounded-lg lg:mx-12">
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10 gap-y-8">
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="about" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Awal Berdiri
          </label>
          <ReactQuill
            className="w-full aspect-[4/3] lg:aspect-[5/3] bg-gray-50"
            value={aboutHtml}
            onChange={handleAboutChange}
            modules={Form.modules}
            formats={Form.formats}
            placeholder="Ceritakan bagaimana awal mula sekolah berdiri"
          />
          <div
            {...getAboutRootProps()}
            className="mt-4 border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
          >
            <input {...getAboutInputProps()} />
            <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
          </div>
          {aboutImageUrl && (
            <div className="mt-4">
              <Image
                width={500}
                height={500}
                src={aboutImageUrl}
                alt="Preview Gambar Awal Berdiri"
                className="object-cover object-center h-auto max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="development" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Perkembangan
          </label>
          <ReactQuill
            className="w-full aspect-[4/3] lg:aspect-[5/3] bg-gray-50"
            value={developmentHtml}
            onChange={handleDevelopmentChange}
            modules={Form.modules}
            formats={Form.formats}
            placeholder="Ceritakan bagaimana perkembangan sekolah hingga saat ini"
          />
          <div
            {...getDevelopmentRootProps()}
            className="mt-4 border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
          >
            <input {...getDevelopmentInputProps()} />
            <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
          </div>
          {developmentImageUrl && (
            <div className="mt-4">
              <Image
                width={500}
                height={500}
                src={developmentImageUrl}
                alt="Preview Gambar Perkembangan"
                className="object-cover object-center h-auto max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex w-full lg:col-span-2 justify-center">
          <button
            type="submit"
            className="mt-8 py-2 lg:py-2.5 px-8 lg:w-fit font-semibold rounded w-full bg-orange-05 text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}

Form.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

Form.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

export default Form
