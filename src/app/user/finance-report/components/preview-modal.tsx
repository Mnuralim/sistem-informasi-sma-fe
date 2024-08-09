import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'

type FinanceReport = {
  title: string
  type: string
  url: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  file: FinanceReport
}

const PreviewModal = ({ isOpen, onClose, file }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${
            file.type === 'image' ? 'sm:my-8 sm:align-middle sm:max-w-lg sm:w-full' : 'w-full h-full'
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-end">
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                  </button>
                </div>
                <div>
                  {file.type === 'image' ? (
                    <Image
                      width={500}
                      height={500}
                      src={file.url}
                      alt={file.title}
                      className="w-full h-auto object-center object-cover"
                    />
                  ) : (
                    <iframe src={file.url} className="w-full h-[80vh]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
