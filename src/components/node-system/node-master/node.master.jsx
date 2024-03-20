import React, { } from 'react'
import "./node.master.scss"
import Cube from '../nodes/cube/cube'


const NodeMaster = ({node, deleteNode}) => {

  return (
    <div 
      className='node-container'
      onContextMenu={() => deleteNode(node.id)}
      id={node.id}
      style={{
        width: `${node.size.x}px`, 
        height: `${node.size.y}px`,
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
    >
      {node.name === "Cube" ? ( 
        <Cube node={node}/>
      ) :  null}
    </div>
  )
}

export default NodeMaster
