import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'
import styles from './ReactTableExample.module.css';

import { formatDate } from '../components/utils/Others/fomatCell';
import EditableCell from '../components/utils/cells/edit/EditableCell'



import { makeData, makeDataphhu, generateRandomObjectiveArray, makeDatarandom } from './makeData';
import { columns, columns2 } from './columns';

// import ReactTableNomal from './Tables/ReactTableBase/ReactTableNomal/ReactTableNomal';
// //import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect/ReactTableSelect';
// import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect_mau/ReactTableSelect_mau';
// import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
// import ReactTableFull from '../Tables/ReactTableFull/ReactTableFull';
// import ReactTableBasic from '../Tables/ReactTableBasic/ReactTableBasic';
// import ReactTable_mau from '../Tables/ReactTable_mau/ReactTable_mau';
// import ReactTablePages from '../Tables/ReactTablePages/ReactTablePages';
// import ReactTableBasicArrowkey from '../Tables/ReactTableBasicArrowkey/ReactTableBasicArrowkey';
// import ReactTableFullArrowkey from '../Tables/ReactTableFullArrowkey/ReactTableFullArrowkey';
// import ReactTableNomalArrowkey from '../Tables/ReactTableNomalArrowkey/ReactTableNomalArrowkey';
// import SearchDropDown from '../Tables/SearchDropDown/SearchDropDown';
import {
    ReactTableBasic,
    ReactTableBasicArrowkey,
    ReactTableFull,
    ReactTableFullArrowkey,
    ReactTableNomalArrowkey,
    ReactTablePages,
    SearchDropDown,
} from '../../../index'


function ReactTableExample() {
    const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table
    const [selectedMoreData, setSelectedMoreData] = useState(null); // State to store the selected data from the table
    const [dataChange, setDataChange] = useState(null); // State to store the selected data from the table
    const [Data, setData] = useState(makeData);
    const [cl, setcl] = useState(columns);
    // Event handler when selecting a row in the table
    const handleRowSelect = (rowData) => {
        setSelectedData(rowData); // Update state with the selected row data
    };

    const handleRowsSelect = (rowData) => {
        console.log("rowData",rowData)
        setSelectedMoreData(rowData); // Update state with the selected row data
    };

    const handleonVisibleColumnDataSelect = (rowData) => {
        setDataChange(rowData);
    };

    const handleDataChange = (rowData) => {
        setDataChange(rowData);
    };
    // var d3 = new Date();
    // console.log("time:-1",d3.getTime())
    const [random, setRandom] = useState(1);
    const btnclick = () => {
        console.log("selectedMoreData", selectedMoreData)
        setData(makeData)
        // console.log("makeData",makeData)
        // console.log("dataChange",dataChange)
    }

    const btnclick2 = () => {
        // setData(generateRandomObjectiveArray(500))
        if (random === 1) {
            setData(makeDatarandom);
            setRandom(2);
        } else if (random === 2) {
            setData(makeData);
            setRandom(0);
        } else {
            setData(makeDataphhu);
            setRandom(1);
        }

        // console.log("Data",Data)
        // var d = new Date();
        // console.log("time:0",d.getTime())
        // setcl(columns2)
        // console.log("Data",Data)
    }

    return (
        <div>
            <div>
                <button onClick={btnclick}> kich here</button>
                <button onClick={btnclick2}> test data vs colum refresh</button>
            </div>
            <div className={styles.parent}>


                <div className={styles.div3} style={{ width: '800px', maxHeight: '1000px' }}>

                    <ReactTableFull
                        data={Data}
                        columns={columns}
                        columnsShow={['firstName', 'age', 'lastName','progress', 'status']}  
                        onRowSelect={handleRowSelect}
                        onRowsSelect={handleRowsSelect}
                        onDataChange={handleDataChange}
                        exportFile={{ name: 'day la file cua toi.xlsx', sheetName: 'My Sheet', title: "mỳile", description: 'mo ta day nay' }}
                        onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                        //grouped={['firstName','age']}
                        isGlobalFilter={true}
                    >
                    </ReactTableFull>
                </div>

                {/* <div className={styles.div3}>
                  
                  <ReactTableBasicArrowkey 
                  data={Data} 
                  columns={columns} 
                  onRowSelect={handleRowSelect} 
                  onRowsSelect={handleRowsSelect}
                  onDataChange={handleDataChange}
                  exportFile= {{name:'day la file cua toi.xlsx', sheetName:'My Sheet' , title :"mỳile", description:'mo ta day nay'}}
                  onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                  //grouped={['firstName','age']}
                  isGlobalFilter = {true}
                  >
                  </ReactTableBasicArrowkey>
              </div> */}

                {/* <div className={styles.div3}>
                  
                  <ReactTableNomalArrowkey 
                  data={Data} 
                  columns={columns} 
                  onRowSelect={handleRowSelect} 
                  onDataChange={handleDataChange}
                  onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                  //grouped={['firstName','age']}
                  isGlobalFilter = {true}
                  >
                  </ReactTableNomalArrowkey>
              </div> */}


                {/* <div className={styles.SearchDropDown}>
                  <SearchDropDown 
                  data={Data} 
                  columns={columns} 
                  columnsShow={['firstName', 'lastName','progress', 'status']} 
                  onRowSelect={handleRowSelect} 
                //   grouped={['firstName','age']}
                  columnDisplay={'firstName'}
                  cssStyleTextFilter={{fontSize: '20px'}}
                  cssStyleTable = {{ width:'800px', maxHeight: '300px' }} // đưa maxHeight vào các dòng có thể co dãn
                  >
                  </SearchDropDown>
              </div> */}




                {/* <div className={styles.div4}>
                    <h1>ReactTableBasic</h1>
                    <ReactTableBasic 
                    data={makeData} 
                    columns={columns}
                    //columnsShow={['firstName', 'age', 'lastName','progress', 'status']} 
                    onRowSelect={handleRowSelect} 
                    onRowsSelect={handleRowsSelect}
                    onDataChange={handleDataChange}
                    exportFile= {{name:'day la file cua toi.xlsx', sheetName:'My Sheet' , title :"mỳile", description:'mo ta day nay'}}
                    onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                    isGlobalFilter = {true}
                    >
                    </ReactTableBasic>
                </div> */}

                {/* <div className={styles.div5}>
                    <ReactTablePages
                        data={Data}
                        columns={cl}
                        columnsShow={['firstName', 'age', 'lastName','progress', 'status']}
                        onRowSelect={handleRowSelect}
                        onRowsSelect={handleRowsSelect}
                        onDataChange={handleDataChange}
                        onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                        exportFile={{ name: 'day la file cua toi.xlsx', sheetName: 'My Sheet', title: "mỳile", description: 'mo ta day nay' }}
                        //grouped={['firstName','age']}
                        isGlobalFilter={true}
                    >
                    </ReactTablePages>
                </div> */}

                {/* <div className={styles.div5}>
                    <ReactTableFullArrowkey
                        data={Data}
                        columns={cl}
                        columnsShow={['firstName', 'age', 'lastName','progress', 'status']}
                        onRowSelect={handleRowSelect}
                        onRowsSelect={handleRowsSelect}
                        onDataChange={handleDataChange}
                        onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                        exportFile={{ name: 'day la file cua toi.xlsx', sheetName: 'My Sheet', title: "mỳile", description: 'mo ta day nay' }}
                        //grouped={['firstName','age']}
                        isGlobalFilter={true}
                    >
                    </ReactTableFullArrowkey>
                </div> */}


                {/* 
              <div className={styles.div5}>
                    <ReactTable_mau
                        data={Data}
                        columns={cl}
                        onRowSelect={handleRowSelect}
                        onRowsSelect={handleRowsSelect}
                        onDataChange={handleDataChange}
                        onVisibleColumnDataSelect={handleonVisibleColumnDataSelect}
                        //exportFile={{ name: 'day la file cua toi.xlsx', sheetName: 'My Sheet', title: "mỳile", description: 'mo ta day nay' }}
                        //grouped={['firstName','age']}
                        isGlobalFilter={true}
                    >
                    </ReactTable_mau>
                </div> */}


            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {selectedData && (
                <div style={{ display: 'flex', }}>
                    <h2>Selected Data</h2>
                    <p> ID: {selectedData.firstName}</p>
                    <p> Name: {selectedData.lastName}</p>
                    <p> Age: {selectedData.age}</p>
                    <p> visits: {formatDate(selectedData.visits)}</p>
                    <p> progress: {selectedData.progress}</p>
                    <p> status: {selectedData.status}</p>
                    <p> type of row: {selectedData._typeofRow}</p>
                </div>
            )}
        </div>

    )

}

export default ReactTableExample;