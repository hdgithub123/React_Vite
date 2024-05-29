
import RouterComponent from './components/RouteComponent/RouteComponent';
// import './App.css'


import TableComponent from './components/CreateTableFilterComponent/TableComponent';
import TableComponentNoSelect from './components/CreateTableFilterComponentNoSelect/TableComponentNoSelect';
 import PopupComponent from './components/PopupComponent/PopupComponent';
import DropdownComponent from './components/DropdownComponent/DropdownComponent';

import CheckSearchBox from './components/SeachboxComponent/CheckSearchBox';
import SearchTableDropdownEx from './components/SearchTableDropdown/SearchTableDropdownEx'
import ReactTableEx from './components/ReactTable/ReactTableEx';
//import FilteringTable from './components/ReactTable/FilteringTable/FilteringTable';
// import RowSelection from './components/ReactTable/RowSelection/RowSelection';
// import SortingTable from './components/ReactTable/SortingTable/SortingTable';
import GeneralTableEX from './components/ReactTable/GeneralTable/GeneralTableEX';
import GeneralTableTanStack from './components/TanStackTable/GeneralTableTanStack/GeneralTableTanStack';
import FiltersFaceted from './components/TanStackTable/FiltersFaceted/FiltersFaceted';

import DndTableRectFull from './components/TableReactFull/DndTable/DndTableRectFull';
import DndAndGroupTable from './components/TableReactFull/DndAndGroupTable/DndAndGroupTable';

import GroupTable from './components/TableReactFull/GroupTable/GroupTable';
function App() {


  

  return (
      <>
      <SearchTableDropdownEx></SearchTableDropdownEx>
      <p> end seach table</p>

      <GroupTable></GroupTable>

      <DndTableRectFull></DndTableRectFull>
      <p> DndAndGroupTable</p>
      <DndAndGroupTable></DndAndGroupTable>
     
      {/* <GeneralTableEX></GeneralTableEX> */}

      {/* <GeneralTableTanStack></GeneralTableTanStack>
      <FiltersFaceted></FiltersFaceted> */}
      {/* <RowSelection></RowSelection> */}
      {/* <SortingTable></SortingTable> */}
{/* 
     <ReactTableEx></ReactTableEx>
      <p> end seach table</p> */}
  
      {/* <FilteringTable></FilteringTable>
      <p> end seach FilteringTable</p> */}
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
