'use client'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const Form = () => {
  const [editorHtml, setEditorHtml] = useState('')

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  const handleSubmit = () => {
    console.log('Submitted content:', editorHtml)
  }

  return (
    <div className="mx-5 mt-5 mb-10 rounded-lg lg:px-10">
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-8">
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="about" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Visi Sekolah
          </label>
          <ReactQuill
            className="w-full aspect-[5/3] bg-gray-50"
            value={editorHtml}
            onChange={handleChange}
            modules={Form.modules}
            formats={Form.formats}
          />
        </div>
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="about" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Misi Sekolah
          </label>
          <ReactQuill
            className="w-full aspect-[5/3] bg-gray-50"
            value={editorHtml}
            onChange={handleChange}
            modules={Form.modules}
            formats={Form.formats}
          />
        </div>
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="mt-8 py-2 lg:py-2.5 px-8 lg:w-fit font-semibold rounded w-full bg-orange-05 text-white"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}

Form.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
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
]

export default Form
