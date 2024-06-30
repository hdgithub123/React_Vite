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

import EditableCell from './components/cells/EditableCell'
import { SumFooter, AverageFooter, CountFooter } from './components/Footer/FooterColumn'


import {makeData} from './makeData';



// const columns = 
//  [
//         {
//             accessorKey: 'firstName',
//             id: 'firstName',
//             header: 'First Name',
//             footer: info => `Count: ${calculateRowCount(info.table)}`,
//             filterType: 'text',
//             cell: info => info.getValue(),
//         },
//         {
//             accessorFn: row => row.lastName,
//             id: 'lastName',
//             filterType: 'text',
//             header: () => <span>Last Name</span>,
//             cell: info => info.getValue(),
//         },
//         {
//             accessorKey: 'age',
//             id: 'age',
//             filterType: 'number',
//             header: () => 'Age',
//             footer: (info) =>`Average: ${calculateColumnAverage(info.column, info.table)}`,
//             aggregatedCell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100,
//             aggregationFn: 'median',
//         },
//         {
//             accessorKey: 'visits',
//             id: 'visits',
//             filterType: 'date',
//             header: () => <span>Visits</span>,
//             aggregationFn: 'sum',
//             aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
//         },
//         {
//             accessorKey: 'status',
//             id: 'status',
//             filterType: 'range',
//             size: 150,
//             header: 'Status',
//         },
//         {
//             accessorKey: 'progress',
//             id: 'progress',
//             filterType: 'number',
//             header: 'Profile Progress',
//             cell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100 + '%',
//             aggregationFn: 'mean',
//             aggregatedCell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100 + '%',
//         },


// ]


const columns = [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                footer: info => `Count: ${CountFooter(info.table)}`,
                cell: EditableCell,
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'text',
                cell: (info) => info.getValue(),
            },
        ],
    },
    {
        header: 'Info',
        columns: [
            {
                accessorKey: 'age',
                id: 'age',
                header: () => 'Age',
                footer: (info) => `Sum: ${SumFooter(info.column, info.table)}`,
                filterType: 'number',
                aggregatedCell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'median',
            },
            {
                header: 'More Info',

                columns: [
                    {
                        accessorKey: 'visits',
                        id: 'visits',
                        header: () => <span>Visits</span>,
                        filterType: 'date',
                        aggregationFn: 'sum',
                        aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
                    },
                    {
                        accessorKey: 'status',
                        id: 'status',
                        header: 'Status',
                        filterType: 'range',
                    },
                    {
                        accessorKey: 'progress',
                        id: 'progress',
                        header: 'Profile Progress',
                        filterType: 'number',
                        footer: (info) => `Average: ${AverageFooter(info.column, info.table)}`,
                        cell: ({ getValue }) =>
                            Math.round(getValue<number>() * 100) / 100 + '%',
                        aggregationFn: 'mean',
                        aggregatedCell: ({ getValue }) =>
                            Math.round(getValue<number>() * 100) / 100 + '%',
                    },
                ],
            },
        ],
    },
]

// khong co footer
// const columns = [
//     {
//         header: 'Name',
//         columns: [
//             {
//                 accessorKey: 'firstName',
//                 header: 'First Name',
//                 id: 'firstName',
//                 filterType: 'text',
//                 cell: (info) => info.getValue(),
//                 /**
//                  * override the value used for row grouping
//                  * (otherwise, defaults to the value derived from accessorKey / accessorFn)
//                  */
//                 getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
//             },
//             {
//                 accessorFn: (row) => row.lastName,
//                 id: 'lastName',
//                 header: () => <span>Last Name</span>,
//                 filterType: 'text',
//                 cell: (info) => info.getValue(),
//             },
//         ],
//     },
//     {
//         header: 'Info',

//         columns: [
//             {
//                 accessorKey: 'age',
//                 id: 'age',
//                 header: () => 'Age',
//                 filterType: 'number',
//                 aggregatedCell: ({ getValue }) =>
//                     Math.round(getValue<number>() * 100) / 100,
//                 aggregationFn: 'median',
//             },
//             {
//                 header: 'More Info',

//                 columns: [
//                     {
//                         accessorKey: 'visits',
//                         id: 'visits',
//                         header: () => <span>Visits</span>,
//                         filterType: 'date',
//                         aggregationFn: 'sum',
//                         aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
//                     },
//                     {
//                         accessorKey: 'status',
//                         id: 'status',
//                         header: 'Status',
//                         filterType: 'range',
//                     },
//                     {
//                         accessorKey: 'progress',
//                         id: 'progress',
//                         header: 'Profile Progress',
//                         filterType: 'number',
//                         cell: ({ getValue }) =>
//                             Math.round(getValue<number>() * 100) / 100 + '%',
//                         aggregationFn: 'mean',
//                         aggregatedCell: ({ getValue }) =>
//                             Math.round(getValue<number>() * 100) / 100 + '%',
//                     },
//                 ],
//             },
//         ],
//     },
// ]

import DndAndGroupTable from './DndAndGroupTable';
import DndAndGroupTableWithCheckbox from './DndAndGroupTableWithCheckbox';
import DndAndGroupTableWithCheckboxFilter from './DndAndGroupTableWithCheckboxFilter';
import DndAndGroupTableWithCheckboxVirtual from './DndAndGroupTableWithCheckboxVirtual';
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
    };
    // console.log("selectedMoreData",selectedMoreData)
    return (
        <div>
            <div style={{ height: '300px', }}>
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
                <DndAndGroupTableWithCheckboxVirtual 
                data={makeData} 
                columns={columns} 
                onRowSelect={handleRowSelect} 
                onRowsSelect={handleRowsSelect}>
                </DndAndGroupTableWithCheckboxVirtual>
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