import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Signup />
      <Toaster
        position="top-center"
        reverseOrder={false}

      />
    </>
  )
}

export default App
