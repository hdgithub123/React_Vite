import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'
import styles from './ReactTableExample.module.css';

import { formatDate } from './components/utils/cells/orinal/fomatCell';
import EditableCell from './components/utils/cells/edit/EditableCell'



import {makeData} from './makeData';
import columns from './columns';

import ReactTableNomal from './Tables/ReactTableBase/ReactTableNomal/ReactTableNomal';
//import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect/ReactTableSelect';
import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect_mau/ReactTableSelect_mau';
import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
import ReactTableFull from './Tables/ReactTableFull/ReactTableFull';
import ReactTableBasic from './Tables/ReactTableBasic/ReactTableBasic';
import ReactTable_mau from './Tables/ReactTable_mau/ReactTable_mau';

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

    const handleonVisibleColumnDataSelect =(rowData) => {
        setDataChange(rowData);
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
            <div className={styles.parent}>
                
                
                {/* <div className={styles.div3}>
                  
                    <ReactTableFull 
                    data={makeData} 
                    columns={columns} 
                    onRowSelect={handleRowSelect} 
                    onRowsSelect={handleRowsSelect}
                    onDataChange={handleDataChange}
                    onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                    //grouped={['firstName','age']}
                    >
                    </ReactTableFull>
                </div> */}
                
                {/* <div className={styles.div4}>
                    <h1>ReactTableBasic</h1>
                    <ReactTableBasic 
                    data={makeData} 
                    columns={columns} 
                    onRowSelect={handleRowSelect} 
                    onRowsSelect={handleRowsSelect}
                    onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                    >
                    </ReactTableBasic>
                </div> */}
                
                <div className={styles.div5}>
                  
                  <ReactTable_mau 
                  data={makeData} 
                  columns={columns} 
                  onRowSelect={handleRowSelect} 
                  onRowsSelect={handleRowsSelect}
                  onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                  //grouped={['firstName','age']}
                  >
                  </ReactTable_mau>
              </div>


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