import { useState } from 'react'
import RouterComponent from './components/RouteComponent/RouteComponent';
import './App.css'

import CreateTableFilterComponent from './components/CreateTableFilterComponent/CreateTableFilterComponent';
import TableComponent from './components/CreateTableFilterComponent/TableComponent';


function App() {
  const [count, setCount] = useState(0)

  

  return (
      <>
        <h1>hello</h1>
      <RouterComponent></RouterComponent>
      <TableComponent></TableComponent>
      </>

  )
}

export default App
