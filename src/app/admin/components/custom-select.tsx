import React, { useState, useEffect, useRef } from 'react'

interface Props {
  options: {
    id: string
    name: string
  }[]
  value: string
  onChange: (value: string) => void
  label: string
  autocomplete?: boolean
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const CustomSelect = ({
  options,
  value,
  onChange,
  label,
  autocomplete = false,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(controlledIsOpen || false)
  }, [controlledIsOpen])

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
      if (onClose) onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleOptionClick = (selectedValue: string) => {
    const selectedOption = options.find((option) => option.id === selectedValue)
    if (selectedOption) {
      onChange(selectedValue)
      setSearchTerm(selectedOption.name)
      setIsOpen(false)
      if (onClose) onClose()
    }
  }

  const filteredOptions = autocomplete
    ? options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  return (
    <div ref={selectRef} className="relative w-full mb-4">
      {autocomplete ? (
        <input
          type="text"
          value={searchTerm}
          placeholder={label}
          onFocus={() => {
            setIsOpen(true)
            if (onOpen) onOpen()
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
            if (onOpen) onOpen()
          }}
          className="border px-4 py-2 rounded-lg w-full bg-white focus:ring-2 focus:ring-[#EB5437] focus:outline-none"
        />
      ) : (
        <div
          className="border px-4 py-2 rounded-lg cursor-pointer bg-white focus:ring-2 focus:ring-[#EB5437]"
          onClick={() => {
            setIsOpen(!isOpen)
            if (!isOpen && onOpen) onOpen()
            if (isOpen && onClose) onClose()
          }}
        >
          {value ? options.find((option) => option.id === value)?.name : label}
        </div>
      )}

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg mt-1 z-10 max-h-60 overflow-auto shadow-lg">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 cursor-pointer hover:bg-[#EB5437] hover:text-white"
              onClick={() => handleOptionClick(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute w-full bg-white border rounded-lg mt-1 z-10 max-h-60 overflow-auto shadow-lg">
          <p className="px-4 py-2 text-gray-500">Tidak ada hasil yang cocok</p>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
