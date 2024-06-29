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


const makeData = [
    { firstName: 'Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: 'Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: 'Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: 'David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: 'Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: 'Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: 'Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: 'Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: 'Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: 'Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: 'John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: 'Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: 'Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: 'Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: 'Emma', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: 'Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: 'Liam', lastName: 'Jackson', age: 31, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: 'Noah', lastName: 'Thompson', age: 34, visits: "2025-06-01", progress: 85, status: 'complicated' },
    { firstName: 'William', lastName: 'White', age: 43, visits: "2025-07-01", progress: 90, status: 'relationship' },
    { firstName: 'Sophia', lastName: 'Harris', age: 47, visits: "2025-08-01", progress: 70, status: 'single' },
    { firstName: 'Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: 'Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: 'Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: 'David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: 'Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: 'Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: 'Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: 'Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: 'Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: 'Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: 'John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: 'Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: 'Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: 'Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: 'Emma', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: 'Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: 'Liam', lastName: 'Jackson', age: 31, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: 'Noah', lastName: 'Thompson', age: 34, visits: "2025-06-01", progress: 85, status: 'complicated' },
    { firstName: 'William', lastName: 'White', age: 43, visits: "2025-07-01", progress: 90, status: 'relationship' },
    { firstName: 'Sophia', lastName: 'Harris', age: 47, visits: "2025-08-01", progress: 70, status: 'single' },

];


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
            <div style={{ height: '500px', }}>
                {/* <DndAndGroupTable data={makeData} columns ={columns}></DndAndGroupTable> */}
                {/* <DndAndGroupTableWithCheckbox data={makeData} columns={columns} onRowSelect={handleRowSelect} onRowsSelect={handleRowsSelect}></DndAndGroupTableWithCheckbox> */}
                {/* <DndAndGroupTableWithCheckboxFilter data={makeData} columns={columns} ></DndAndGroupTableWithCheckboxFilter> */}
                <DndAndGroupTableWithCheckboxVirtual data={makeData} columns={columns} onRowSelect={handleRowSelect} onRowsSelect={handleRowsSelect}></DndAndGroupTableWithCheckboxVirtual>
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