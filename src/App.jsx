import { useState } from 'react'
import './App.css'
import Movies from './components/Movies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Movies></Movies>
    </>
  )
}

export default App
