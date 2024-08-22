
// import RouterComponent from './components/RouteComponent/RouteComponent';
// // import './App.css'


// import TableComponent from './components/CreateTableFilterComponent/TableComponent';
// import TableComponentNoSelect from './components/CreateTableFilterComponentNoSelect/TableComponentNoSelect';
// import DropdownComponent from './components/DropdownComponent/DropdownComponent';

 import SearchTableDropdownEx from './commons/SearchTableDropdown/SearchTableDropdownEx'
 // import ReactTableEx from './components/ReactTable/ReactTableEx';
// //import FilteringTable from './components/ReactTable/FilteringTable/FilteringTable';
//import RowSelection from './components/ReactTable/RowSelection/RowSelection';
// // import SortingTable from './components/ReactTable/SortingTable/SortingTable';
// import GeneralTableEX from './components/ReactTable/GeneralTable/GeneralTableEX';
// import GeneralTableTanStack from './components/TanStackTable/GeneralTableTanStack/GeneralTableTanStack';
// import FiltersFaceted from './components/TanStackTable/FiltersFaceted/FiltersFaceted';

// import DndTableRectFull from './components/TableReactFull/DndTable/DndTableRectFull';


//import TableComponent from './components/TableReactFull/TableUI/TableComponent';
import ReactTableExample from './commons/ReactTables/RunExample/ReactTableExample';
import {DropableSelectExample} from './components/Z_Nhap/DropableSelectExample';

//import GroupTable from './components/TableReactFull/GroupTable/GroupTable';

//import MutipleContainers from './components/TableReactFull/Nhap/MutipleContainers';
function App() {


  

  return (
      <>
      <div style={{zIndex:'5', }}>
      <SearchTableDropdownEx></SearchTableDropdownEx>
      <p> end seach table</p>
      </div>
      

      {/* <GroupTable></GroupTable> */}

      {/* <DndTableRectFull></DndTableRectFull> */}
      <p> ReactTableExample</p>
      <div style={{zIndex:'3'}}>
        <ReactTableExample></ReactTableExample>
      </div>
     

      {/* <TableComponent></TableComponent> */}
     {/* <MutipleContainers></MutipleContainers> */}
      {/* <GeneralTableEX></GeneralTableEX> */}

      {/* <GeneralTableTanStack></GeneralTableTanStack>
      <FiltersFaceted></FiltersFaceted> */}
      {/* <RowSelection></RowSelection> */}
      {/* <SortingTable></SortingTable> */}

     {/* <ReactTableEx></ReactTableEx>
      <p> end seach table</p> */}
  
      {/* <FilteringTable></FilteringTable>
      <p> end seach FilteringTable</p> */}

        {/* <h1>hello</h1>
      <RouterComponent></RouterComponent> */}
      {/* <TableComponent></TableComponent> */}
      {/* <TableComponentNoSelect></TableComponentNoSelect> */}

    {/* <DropdownComponent></DropdownComponent> */}

        {/* <DropableSelectExample></DropableSelectExample> */}


      </>

  )
}

export default App
