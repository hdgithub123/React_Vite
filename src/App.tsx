import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserComponent from './components/UserComponent/UserComponent';

function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <>
      <div>
      <UserComponent  
        username="john_doe"
        password="password123"
        email="john@example.com"
        address="123 Main St, City, Country"
        avatar="https://th.bing.com/th/id/OIP.KdRE7KHqL-46M8nrvOX2CgAAAA?rs=1&pid=ImgDetMain"></UserComponent>

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1000)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
