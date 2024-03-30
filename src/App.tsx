import { useState } from 'react'
import RouterComponent from './components/RouteComponent/RouteComponent';
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <h1>hello</h1>
      <RouterComponent></RouterComponent>
      
      </>

  )
}

export default App
