
import RouterComponent from './components/RouteComponent/RouteComponent';
import './App.css'


import TableComponent from './components/CreateTableFilterComponent/TableComponent';
import TableComponentNoSelect from './components/CreateTableFilterComponentNoSelect/TableComponentNoSelect';
 import PopupComponent from './components/PopupComponent/PopupComponent';
import DropdownComponent from './components/DropdownComponent/DropdownComponent';
function App() {


  

  return (
      <>
        <h1>hello</h1>
      <RouterComponent></RouterComponent>
      {/* <TableComponent></TableComponent> */}
      {/* <TableComponentNoSelect></TableComponentNoSelect> */}
      <PopupComponent></PopupComponent>

    <DropdownComponent></DropdownComponent>
      <h1>ket thuc dong cuoi</h1>

      </>

  )
}

export default App
