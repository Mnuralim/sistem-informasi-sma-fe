import Image from 'next/image'
import React from 'react'
import { Handle, Position } from 'reactflow'

const CustomNode = ({ data }: any) => {
  return (
    <div className="custom-node bg-white p-4 rounded-lg shadow-md">
      {data.imageUrl && (
        <div className="mb-2">
          <Image
            width={640}
            height={640}
            src={data.imageUrl}
            alt={data.label}
            className="h-16 w-16 rounded-full mx-auto"
          />
        </div>
      )}
      <div className="text-center">
        <p className="font-bold">{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  )
}

export default CustomNode
