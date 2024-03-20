import React from 'react'
import "./socket.scss"



const InputSocket= ({id}) => {
  return (
    <div 
      className='socket'
      id={id}
      data-socket="input"
      style={{
        backgroundColor: `#${7777777}`,
        top: `calc(50% - 7.5px)`,
        left: `${3}%`,
        background: `radial-gradient(circle at 50%, #272727, #272727 40%, #${777} 55%, #272727 100%)`,
        
      }}
      >     
    </div>
  )
}

export default InputSocket
