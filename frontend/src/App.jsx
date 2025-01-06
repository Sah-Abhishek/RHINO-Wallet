import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import UnlockPage from './pages/UnlockPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Signup />
      {/* <UnlockPage /> */}
    </>
  )
}

export default App
