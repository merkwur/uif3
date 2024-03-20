import React, { useEffect, useRef, useState } from 'react'
import "./node.menu.scss"
import { nodeList } from '../node-helpers/nodeList'
import { positionHandler } from '../node-helpers/nodeData'


const NodeMenu= ({getNodeInfo}) => {
  const nodes = Object.keys(nodeList)
  const [isDragging, setIsDragging] = useState(false)
  const [hollowObjectPosition, setHollowObjectPosition] = useState({x: 0, y: 0})  
  const [selectedNode, setSelectedNode] = useState("")
  let dragPreview = useRef(null)


  const handleMouseDown = (event) => {
    setIsDragging(true)
    const px = event.clientX
    const py = event.clientY
    const selected = document.elementsFromPoint(px, py)[0].getAttribute("data-name") 
    setSelectedNode(selected)
    const {x, y} = positionHandler(px, py, 40)
    
    dragPreview.current = document.createElement("div")
    dragPreview.current.style.position = "absolute"
    dragPreview.current.style.zIndex = "10000"
    dragPreview.current.style.width = `${40*2-10}px`
    dragPreview.current.style.height = `${40*2-10}px`
    dragPreview.current.style.top = `${y}px`
    dragPreview.current.style.left = `${x}px`
    dragPreview.current.style.border = `1px solid #77777777`
    dragPreview.current.style.backgroundColor = "#0707007"
    dragPreview.current.style.backgroundSize = "cover"
    dragPreview.current.style.pointerEvents = "none"
    
    const canvas = document.getElementsByClassName("canvas")
    canvas[0].appendChild(dragPreview.current)
    console.log(`clicked on ${x} ${y}`)
  }

  const handleMouseMove = (event) => {
    if (isDragging) {
      const px = event.clientX
      const py = event.clientY
      const {x, y} = positionHandler(px, py, 40)
      setHollowObjectPosition({x: x, y: y})

    }
  }

  useEffect(() => {
    if (dragPreview.current) {
      dragPreview.current.style.left = `${hollowObjectPosition.x}px`
      dragPreview.current.style.top = `${hollowObjectPosition.y}px`
    }
  }, [hollowObjectPosition])


  const handleMouseUp = (event) => {
    
    const px = event.clientX
    const py = event.clientY
    const {x, y} = positionHandler(px, py, 40)

    setIsDragging(false)

    getNodeInfo(x, y, selectedNode)

    if (dragPreview.current) {
      const canvas = document.getElementsByClassName("canvas")
      canvas[0].removeChild(dragPreview.current)
      dragPreview.current = null
    }
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    };
  }, [isDragging]);

  return (
    <div className='node-menu-wrapper'>
      <div className='node-menu'>
        <div className='node-parent-list'>
          {nodes.map((node, index) => (
            <div 
              className='node-parents'
              key={node+index}
              style={{height: `${100/nodes.length}%`}}
            >    
              {node}
            </div>
          ))}
        </div>
        <div className='node-menu-content'>
          {nodeList.primitives.map((n, i) => (
            <div 
              className='node-snap'
              onMouseDown={handleMouseDown}
              key={n+i}
              data-name={n}
            >
                {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NodeMenu
