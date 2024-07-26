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

import DndAndGroupTable from './DndAndGroupTable';
import DndAndGroupTableWithCheckbox from './DndAndGroupTableWithCheckbox';
import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
import ReactTableFull from './Tables/ReactTableFull/ReactTableFull';
import VitualExample from './VitualExample';

function DndAndGroupTableEX() {
    const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table
    const [selectedMoreData, setSelectedMoreData] = useState(null); // State to store the selected data from the table
    // Event handler when selecting a row in the table
    const handleRowSelect = (rowData) => {
        setSelectedData(rowData); // Update state with the selected row data
    };

    const handleRowsSelect = (rowData) => {
        setSelectedMoreData(rowData); // Update state with the selected row data
        console.log("selectedMoreData",selectedMoreData)
    };
    const btnclick= ()=>{
        console.log("selectedMoreData",selectedMoreData)
    }
  
    return (
        <div>
            <div>
                <button onClick={btnclick}> kich here</button>
            </div>
            <div style={{ height: '500px', }}>
                {/* <VitualExample></VitualExample> */}
                {/* <DndAndGroupTable data={makeData} columns ={columns}></DndAndGroupTable> */}
                {/* <DndAndGroupTableWithCheckbox data={makeData} 
                columns={columns} onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}>
                </DndAndGroupTableWithCheckbox> */}
                {/* <DndAndGroupTableWithCheckboxFilter data={makeData} columns={columns} ></DndAndGroupTableWithCheckboxFilter> */}
                {/* <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                <h1>ds</h1>
                
                
                 */}
                <ReactTableFull 
                data={makeData} 
                columns={columns} 
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}>
                </ReactTableFull>
            </div>

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

export default DndAndGroupTableEX;