import React, { useEffect } from 'react'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content')
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.classList.add('overflow-hidden')
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.classList.remove('overflow-hidden')
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="modal-content bg-white px-6 py-16 rounded-lg shadow-lg max-w-3xl w-full lg:h-[90%] max-h-screen overflow-y-auto space-y-6">
        {children}
      </div>
    </div>
  )
}

export default Modal
