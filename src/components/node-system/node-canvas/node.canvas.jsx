import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./node.canvas.scss"
import { Canvas } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { throttle } from 'lodash'
import { addNode, positionHandler, updateNodePositions } from '../node-helpers/nodeData'
import NodeMenu from '../node-menu/node.menu'
import NodeMaster from '../node-master/node.master'

const NodeCanvas = () => {
  const snapSize = 40
  const [nodePosition, setNodePosition] = useState({x: 0, y:0})
  const [nodeData, setNodeData] = useState({})
  const [isDragging, setIsDragging] = useState(false) 
  const [initialPositions, setInitialPositions] = useState({x: 0, y: 0})
  const [currentId, setCurrentId] = useState("")
  const nodeRef = useRef({});


  const handleAddNode = (x, y, name) => {
    const updated = addNode(x, y, name, snapSize, nodeData)
    setNodeData(updated)
  }

  const handleMouseDown = (event) => {
    event.preventDefault()
    const node = document.elementFromPoint(event.clientX, event.clientY)
    if (node && node.id && !node.getAttribute("data-socket")) {
      setIsDragging(true)
      const x = parseInt(node.style.left) - event.clientX + 40
      const y = parseInt(node.style.top) - event.clientY + 40
      setInitialPositions({x:x,y:y})
      setCurrentId(node.id)
    }
  }

  const handleMouseMove = useCallback(
    throttle((event) => {
      if (isDragging) {
        const tx = event.clientX - initialPositions.x
        const ty = event.clientY - initialPositions.y
        const {x, y} = positionHandler(tx, ty, snapSize)
        const currentNode = document.getElementById(currentId)
        if (currentNode) {
          currentNode.style.left = `${x}px`
          currentNode.style.top = `${y}px`
          setNodePosition({x: x, y: y})
          const updated = updateNodePositions(currentId, x, y, nodeData)
          setNodeData(updated)
        }
      }
    }, 50), [isDragging, currentId] );

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {console.log(nodeData)}, [nodeData])


  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  return (
    <>
      <div 
        className='canvas'
        onMouseDown={handleMouseDown}
        style={{
        backgroundSize: `${snapSize*2}px ${snapSize*2}px, ${snapSize}px ${snapSize}px`
      }}
      
      >
        <NodeMenu getNodeInfo={(x, y, name) => handleAddNode(x, y, name)}/>
        {Object.keys(nodeData).map((node, index) => (
          <div
            key={node+index}
            ref={(ref) => (nodeRef.current[nodeData[node].id] = ref)}
        >
            <NodeMaster node={nodeData[node]}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default NodeCanvas
