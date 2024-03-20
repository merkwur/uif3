import { useState } from 'react'
import './App.scss'
import NodeCanvas from './components/node-system/node-canvas/node.canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NodeCanvas />
    </>
  )
}

export default App
