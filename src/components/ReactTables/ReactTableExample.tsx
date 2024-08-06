import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'

import { formatDate } from './components/cells/orinal/fomatCell';
import EditableCell from './components/cells/edit/EditableCell'



import {makeData} from './makeData';
import columns from './columns';

import ReactTableNomal from './Tables/ReactTableBase/ReactTableNomal/ReactTableNomal';
//import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect/ReactTableSelect';
import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect_mau/ReactTableSelect_mau';
import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
import ReactTableFull from './Tables/ReactTableFull/ReactTableFull';
import ReactTableBasic from './Tables/ReactTableBasic/ReactTableBasic';

function ReactTableExample() {
    const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table
    const [selectedMoreData, setSelectedMoreData] = useState(null); // State to store the selected data from the table
    const [dataChange, setDataChange] = useState(null); // State to store the selected data from the table
    // Event handler when selecting a row in the table
    const handleRowSelect = (rowData) => {
        setSelectedData(rowData); // Update state with the selected row data
    };

    const handleRowsSelect = (rowData) => {
        setSelectedMoreData(rowData); // Update state with the selected row data
    };

    const handleDataChange =(rowData) => {
        setDataChange(rowData);
    };
    const btnclick= ()=>{
        console.log("selectedMoreData",selectedMoreData)
        console.log("makeData",makeData)
        console.log("dataChange",dataChange)
    }
  
    return (
        <div>
            <div>
                <button onClick={btnclick}> kich here</button>
            </div>
            <div style={{ height: '70vh', width: '100%' }}>
                {/* <ReactTableNomal data={makeData} columns ={columns} 
                onRowSelect={handleRowSelect} ></ReactTableNomal> */}

                {/* <h1>ReactTableSelect</h1>
                <ReactTableSelect data={makeData} 
                columns={columns} 
                onDataChange = {handleDataChange}
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}
                // grouped={['firstName','age']}
                >
                </ReactTableSelect> */}

                <h1>ReactTableFull</h1>
                <ReactTableFull 
                data={makeData} 
                columns={columns} 
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}
                grouped={['firstName','age']}
                >
                </ReactTableFull>
                
                {/* <h1>ReactTableBasic</h1>
                <ReactTableBasic 
                data={makeData} 
                columns={columns} 
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}
                >
                </ReactTableBasic> */}



            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {selectedData && (
                <div style={{ display: 'flex', }}>
                    <h2>Selected Data</h2>
                    <p>ID: {selectedData.firstName}</p>
                    <p>Name: {selectedData.lastName}</p>
                    <p>Age: {selectedData.age}</p>
                    <p>visits: {formatDate(selectedData.visits)}</p>
                    <p>progress: {selectedData.progress}</p>
                    <p>status: {selectedData.status}</p>
                </div>
            )}
        </div>

    )

}

export default ReactTableExample;