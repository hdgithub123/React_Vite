import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'

import {



    GroupingState,
    getPaginationRowModel,
    getGroupedRowModel,
    getExpandedRowModel,

    Cell,
    ColumnDef,
    Header,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
} from '@tanstack/react-table';

import {
    DndContext,
    useDroppable,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    closestCorners,
    DragEndEvent,
    useSensor,
    useSensors,

    CancelDrop,

    pointerWithin,
    rectIntersection,
    CollisionDetection,

    DragOverlay,
    DropAnimation,
    getFirstCollision,

    Modifiers,

    UniqueIdentifier,

    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
    Active,
    ClientRect,
    DroppableContainer,


} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement, restrictToWindowEdges, } from '@dnd-kit/modifiers';
import {
    useSortable,
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    verticalListSortingStrategy,
    rectSwappingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import EditableCell from './components/cells/edit/EditableCell'



import {makeData} from './makeData';
import columns from './columns';

import ReactTableNomal from './Tables/ReactTableBase/ReactTableNomal';
import ReactTableSelect from './Tables/ReactTableBase/ReactTableSelect';
import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
import ReactTableFull from './Tables/ReactTableFull/ReactTableFull';

function ReactTableExample() {
    const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table
    const [selectedMoreData, setSelectedMoreData] = useState(null); // State to store the selected data from the table
    // Event handler when selecting a row in the table
    const handleRowSelect = (rowData) => {
        setSelectedData(rowData); // Update state with the selected row data
    };

    const handleRowsSelect = (rowData) => {
        setSelectedMoreData(rowData); // Update state with the selected row data
    };
    const btnclick= ()=>{
        console.log("selectedMoreData",selectedMoreData)
        console.log("makeData",makeData)
    }
  
    return (
        <div>
            <div>
                <button onClick={btnclick}> kich here</button>
            </div>
            <div style={{ height: '70vh', width: '100%' }}>
                <ReactTableNomal data={makeData} columns ={columns} 
                onRowSelect={handleRowSelect} ></ReactTableNomal>

                {/* <h1>ReactTableSelect</h1>
                <ReactTableSelect data={makeData} 
                columns={columns} onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}>
                </ReactTableSelect> */}

                {/* <h1>ReactTableFull</h1>
                <ReactTableFull 
                data={makeData} 
                columns={columns} 
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}>
                </ReactTableFull> */}
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
                    <p>visits: {selectedData.visits}</p>
                    <p>progress: {selectedData.progress}</p>
                    <p>status: {selectedData.status}</p>
                </div>
            )}
        </div>

    )

}

export default ReactTableExample;