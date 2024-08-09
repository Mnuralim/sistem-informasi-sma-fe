'use client'
import React, { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'
import Image from 'next/image'
import CustomNode from './custom-node'

interface OSISMember {
  id: number
  name: string
  position: string
  description: string
  image: File | null
  imageUrl: string | null
}

const initialMembers: OSISMember[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    position: 'Ketua OSIS',
    description: 'Ketua OSIS periode 2023/2024',
    image: null,
    imageUrl: '/img/misi.png',
  },
  {
    id: 2,
    name: 'Emily Davis',
    position: 'Wakil Ketua OSIS',
    description: 'Wakil Ketua OSIS periode 2023/2024',
    image: null,
    imageUrl: '/img/misi.png',
  },
]

const initialNodes = [
  {
    id: '1',
    data: { label: 'Alex Johnson (Ketua OSIS)', imageUrl: '/img/misi.png' },
    position: { x: 250, y: 5 },
    type: 'custom',
  },
  {
    id: '2',
    data: { label: 'Emily Davis (Wakil Ketua OSIS)', imageUrl: '/img/misi.png' },
    position: { x: 250, y: 100 },
    type: 'custom',
  },
]

const nodeTypes = { custom: CustomNode }

const OrganizationStructure = () => {
  const [members, setMembers] = useState<OSISMember[]>(initialMembers)
  const [newMember, setNewMember] = useState<{
    name: string
    position: string
    description: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', position: '', description: '', image: null, imageUrl: null })
  const [isAddingNewMember, setIsAddingNewMember] = useState<boolean>(false)
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [showFlow, setShowFlow] = useState<boolean>(false)
  const flowRef = useRef<HTMLDivElement>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (editingMemberId !== null) {
        setMembers((prevMembers) =>
          prevMembers.map((member) => (member.id === editingMemberId ? { ...member, image: file, imageUrl } : member))
        )
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === `${editingMemberId}` ? { ...node, data: { ...node.data, imageUrl } } : node
          )
        )
        setEditImageUrl(imageUrl)
      } else {
        setNewMember((prevState) => ({ ...prevState, image: file, imageUrl }))
      }
    },
    [editingMemberId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddMember = () => {
    if (newMember.name && newMember.position && newMember.description && newMember.image) {
      const newId = `${members.length + 1}`
      const newNode = {
        id: newId,
        data: { label: `${newMember.name} (${newMember.position})`, imageUrl: newMember.imageUrl || '' },
        position: { x: 250, y: (members.length + 1) * 100 },
        type: 'custom',
      }
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: newMember.name,
          position: newMember.position,
          description: newMember.description,
          image: newMember.image,
          imageUrl: newMember.imageUrl,
        },
      ])
      setNodes((nds) => nds.concat(newNode))
      setNewMember({ name: '', position: '', description: '', image: null, imageUrl: null })
      setIsAddingNewMember(false)
    }
  }

  const handleSaveEditMember = () => {
    if (editingMemberId !== null) {
      setEditingMemberId(null)
      setEditImageUrl(null)
    }
  }

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
    setNodes((nds) => nds.filter((node) => node.id !== `${id}`))
  }

  const handleNameChange = (id: number, name: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, name } : member)))
    setNodes(
      nodes.map((node) =>
        node.id === `${id}`
          ? {
              ...node,
              data: { ...node.data, label: `${name} (${node.data.label.split('(')[1]}` },
            }
          : node
      )
    )
  }

  const handlePositionChange = (id: number, position: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, position } : member)))
    setNodes(
      nodes.map((node) =>
        node.id === `${id}`
          ? {
              ...node,
              data: {
                ...node.data,
                label: `${node.data.label.split(' ')[0]} (${position})`,
              },
            }
          : node
      )
    )
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, description } : member)))
  }

  const toggleEditMember = (id: number) => {
    setEditingMemberId(editingMemberId === id ? null : id)
    const memberToEdit = members.find((member) => member.id === id)
    if (memberToEdit) {
      setEditImageUrl(memberToEdit.imageUrl)
    }
  }

  const toggleShowFlow = () => {
    setShowFlow(true)
    setTimeout(() => {
      flowRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100) // Slight delay to ensure the ref is available
  }

  const saveFlowChanges = () => {
    setShowFlow(false)
    // Implement any additional save logic here if needed
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Struktur Organisasi OSIS</h1>
        <div className="space-y-6">
          <div className="flex justify-between gap-3">
            <button
              className={`px-4 py-2 text-sm lg:text-base ${
                isAddingNewMember ? 'bg-gray-200' : 'bg-[#EB5437] text-white'
              } rounded-lg`}
              onClick={() => setIsAddingNewMember(!isAddingNewMember)}
            >
              {isAddingNewMember ? 'Batal' : 'Tambah Anggota OSIS'}
            </button>
            {isAddingNewMember ? null : (
              <button
                className={`px-4 py-2 text-sm lg:text-base ${
                  showFlow ? 'bg-gray-200' : 'bg-[#EB5437] text-white'
                } rounded-lg`}
                onClick={toggleShowFlow}
              >
                {showFlow ? 'Batal' : 'Edit Denah'}
              </button>
            )}
          </div>

          {isAddingNewMember && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl lg:text-2xl font-bold text-[#202244] mb-4">Tambah Anggota OSIS Baru</h2>
              <input
                type="text"
                placeholder="Nama"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="text"
                placeholder="Posisi"
                value={newMember.position}
                onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi"
                value={newMember.description}
                onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-3"
              >
                <input {...getInputProps()} />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newMember.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Preview:</p>
                  <Image
                    src={newMember.imageUrl}
                    alt="New Member Preview"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#d93b25]"
              >
                Tambah Anggota
              </button>
            </div>
          )}

          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleNameChange(member.id, e.target.value)}
                    disabled={editingMemberId !== member.id}
                    className={`w-full mb-2 px-4 py-2 border rounded-lg ${
                      editingMemberId === member.id
                        ? 'focus:outline-none focus:ring-2 focus:ring-[#EB5437]'
                        : 'bg-gray-200'
                    }`}
                  />
                  <input
                    type="text"
                    value={member.position}
                    onChange={(e) => handlePositionChange(member.id, e.target.value)}
                    disabled={editingMemberId !== member.id}
                    className={`w-full mb-2 px-4 py-2 border rounded-lg ${
                      editingMemberId === member.id
                        ? 'focus:outline-none focus:ring-2 focus:ring-[#EB5437]'
                        : 'bg-gray-200'
                    }`}
                  />
                  <textarea
                    value={member.description}
                    onChange={(e) => handleDescriptionChange(member.id, e.target.value)}
                    disabled={editingMemberId !== member.id}
                    className={`w-full mb-2 px-4 py-2 border rounded-lg ${
                      editingMemberId === member.id
                        ? 'focus:outline-none focus:ring-2 focus:ring-[#EB5437]'
                        : 'bg-gray-200'
                    }`}
                  />
                  {editingMemberId === member.id && (
                    <div
                      {...getRootProps()}
                      className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p className="text-sm lg:text-base">
                        Seret & letakkan gambar di sini, atau klik untuk memilih file
                      </p>
                    </div>
                  )}
                  {member.imageUrl && (
                    <div className="mb-2">
                      <p className="text-gray-700">Preview:</p>
                      <Image
                        src={editingMemberId === member.id && editImageUrl ? editImageUrl : member.imageUrl}
                        alt="Member Preview"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditMember(member.id)}
                    className={`w-full py-1.5 lg:py-2 ${
                      editingMemberId === member.id ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                    } rounded-lg hover:bg-blue-700`}
                  >
                    {editingMemberId === member.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="w-full py-1.5 lg:py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showFlow && (
          <div className="mt-10" ref={flowRef}>
            <h2 className="text-2xl font-bold text-[#202244] mb-4">Denah Struktur Organisasi OSIS</h2>
            <ReactFlowProvider>
              <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: 500 }}>
                <ReactFlow
                  nodes={nodes}
                  onNodesChange={onNodesChange}
                  fitView
                  style={{ width: '100%', height: '100%' }}
                  nodeTypes={nodeTypes}
                >
                  <Controls />
                  <Background color="#aaa" gap={16} />
                </ReactFlow>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#d93b25]"
                  onClick={saveFlowChanges}
                >
                  Simpan
                </button>
              </div>
            </ReactFlowProvider>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrganizationStructure
