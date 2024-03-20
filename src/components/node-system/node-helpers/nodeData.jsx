import {v4 as uuid4} from "uuid"


export const positionHandler = (x, y, snapSize) => { 
  const sx = Math.floor(x / snapSize) * snapSize + 5
  const sy = Math.floor(y / snapSize) * snapSize + 5
  return {x: sx, y: sy}
}

export const addNode = (x, y, name, snap, nodes) => {
  const id = name + ":" + uuid4().split("-").pop()
  const newNode = {
    id, 
    name, 
    position: {x, y}, 
    size: getNodeSize(name, snap)
  }

  const updatedNodes = {...nodes}
  updatedNodes[id] = newNode
  return updatedNodes
}

export const deleteNode = (id, nodes)=> {
  if (!nodes[id]) return undefined
  const { [id]: __, ...updatedNodes} = nodes
  return updatedNodes
}

const getNodeSize = (name, snap) => {
  const nodeSizes = {
    osc: {x: snap * 2 - 10, y: snap * 2 - 10}
  }
  return nodeSizes[name] || {x: snap * 2 - 10, y: snap * 2 - 10}
}

export const updateNodePositions = (id, x, y, nodes) => {
  const updatedNodes = JSON.parse(JSON.stringify(nodes))
  updatedNodes[id].position.x = x
  updatedNodes[id].position.y = y
  return updatedNodes
}