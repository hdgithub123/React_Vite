
import RouterComponent from './components/RouteComponent/RouteComponent';
import './App.css'


import TableComponent from './components/CreateTableFilterComponent/TableComponent';
import TableComponentNoSelect from './components/CreateTableFilterComponentNoSelect/TableComponentNoSelect';
 import PopupComponent from './components/PopupComponent/PopupComponent';
import DropdownComponent from './components/DropdownComponent/DropdownComponent';

import CheckSearchBox from './components/SeachboxComponent/CheckSearchBox';
import SearchTableDropdownEx from './components/SearchTableDropdown/SearchTableDropdownEx'
import SearchTableDropdownEx2 from './components/SearchTableDropdownEx/SearchTableDropdownEx'

function App() {


  

  return (
      <>
      <SearchTableDropdownEx></SearchTableDropdownEx>
      <p> end seach table</p>

      <SearchTableDropdownEx2></SearchTableDropdownEx2>
      <p> end seach table</p>
      
      {/* <CheckSearchBox></CheckSearchBox> */}
        <h1>hello</h1>
      <RouterComponent></RouterComponent>
      {/* <TableComponent></TableComponent> */}
      {/* <TableComponentNoSelect></TableComponentNoSelect> */}
      <PopupComponent></PopupComponent>

    <DropdownComponent></DropdownComponent>

   
      <h1>ket thuc dong cuoi</h1>
      <p> seach table</p>

      </>

  )
}

export default App
