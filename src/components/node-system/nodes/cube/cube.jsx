import React from 'react'

const Cube = ({node}) => {
  return (
    <div 
      className='node-wrapper'
    >
      <div className='header'>
        {node.name}
      </div>
    </div>
  )
}

export default Cube
