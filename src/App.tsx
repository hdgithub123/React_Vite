import { useState } from 'react'
import './App.css'
import UserComponent from './components/UserComponent/UserComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import RouteComponent from './components/RouteComponent/RouteComponent';
import RouterComponent from './components/RouteComponent/RouteComponent';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        hello
        <RouterComponent></RouterComponent>
      </div>
    </>
  )
}

export default App
