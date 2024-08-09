'use client'
import Image from 'next/image'
import React from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'

const CustomNode = ({ data }: { data: { label: string; photo: string; name: string } }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white shadow-lg p-4 rounded-lg border w-52 border-gray-300 transition-transform transform hover:scale-105">
      <Image width={64} height={64} src={data.photo} alt={data.label} className="w-16 h-16 rounded-full mb-2" />
      <strong className="text-[#202244] text-lg">{data.label}</strong>
      <p className="text-gray-600">{data.name}</p>
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Ketua OSIS', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 350, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Wakil Ketua OSIS', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 200, y: 100 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Sekretaris', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 500, y: 100 },
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Bendahara', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 350, y: 200 },
  },
  {
    id: '5',
    type: 'custom',
    data: { label: 'Seksi Bidang 1', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 50, y: 300 },
  },
  {
    id: '6',
    type: 'custom',
    data: { label: 'Seksi Bidang 2', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 200, y: 300 },
  },
  {
    id: '7',
    type: 'custom',
    data: { label: 'Seksi Bidang 3', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 500, y: 300 },
  },
  {
    id: '8',
    type: 'custom',
    data: { label: 'Seksi Bidang 4', name: 'Michael Brown', photo: '/img/principal.jpeg' },
    position: { x: 650, y: 300 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e4-6', source: '4', target: '6', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e4-7', source: '4', target: '7', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
  { id: 'e4-8', source: '4', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#EB5437' } },
]

const OsisStructure: React.FC = () => {
  return (
    <div className="h-[800px] w-full bg-white">
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          zoomOnScroll={false}
          panOnScroll={false}
          panOnDrag={false}
          elementsSelectable={false}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}

export default OsisStructure
