import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'
import './DndAndGroupTable.css';
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

const makeData = [
    { firstName: 'Alice', lastName: 'Smith', age: 28, visits: 120, progress: 75, status: 'relationship' },
    { firstName: 'Alice', lastName: 'Johnson', age: 35, visits: 80, progress: 60, status: 'single' },
    { firstName: 'Alice', lastName: 'Smith', age: 42, visits: 50, progress: 90, status: 'complicated' },
    { firstName: 'David', lastName: 'Lee', age: 22, visits: 200, progress: 40, status: 'relationship' },
    { firstName: 'Eva', lastName: 'Garcia', age: 30, visits: 150, progress: 70, status: 'single' },
    { firstName: 'Frank', lastName: 'Wang', age: 50, visits: 30, progress: 85, status: 'relationship' },
    { firstName: 'Grace', lastName: 'Miller', age: 25, visits: 100, progress: 55, status: 'single' },
    { firstName: 'Henry', lastName: 'Clark', age: 38, visits: 70, progress: 78, status: 'complicated' },
    { firstName: 'Isabella', lastName: 'Martinez', age: 27, visits: 180, progress: 65, status: 'relationship' },
    { firstName: 'Jack', lastName: 'Taylor', age: 33, visits: 90, progress: 50, status: 'single' },
    { firstName: 'John', lastName: 'Doe', age: 26, visits: 130, progress: 80, status: 'relationship' },
    { firstName: 'Jane', lastName: 'Doe', age: 29, visits: 75, progress: 55, status: 'complicated' },
    { firstName: 'Sarah', lastName: 'Connor', age: 32, visits: 105, progress: 60, status: 'single' },
    { firstName: 'Tom', lastName: 'Hanks', age: 45, visits: 95, progress: 70, status: 'relationship' },
    { firstName: 'Emma', lastName: 'Stone', age: 27, visits: 150, progress: 85, status: 'single' },
    { firstName: 'Olivia', lastName: 'Brown', age: 31, visits: 160, progress: 75, status: 'relationship' },
    { firstName: 'Liam', lastName: 'Wilson', age: 24, visits: 170, progress: 90, status: 'complicated' },
    { firstName: 'Noah', lastName: 'Moore', age: 40, visits: 60, progress: 50, status: 'single' },
    { firstName: 'William', lastName: 'Taylor', age: 36, visits: 110, progress: 65, status: 'relationship' },
];

const columns = 
 [
        {
            accessorKey: 'firstName',
            id: 'firstName',
            header: 'First Name',
            filterType: 'text',
            cell: info => info.getValue(),
        },
        {
            accessorFn: row => row.lastName,
            id: 'lastName',
            filterType: 'text',
            header: () => <span>Last Name</span>,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'age',
            id: 'age',
            filterType: 'text',
            header: () => 'Age',
            aggregatedCell: ({ getValue }) =>
                Math.round(getValue<number>() * 100) / 100,
            aggregationFn: 'median',
        },
        {
            accessorKey: 'visits',
            id: 'visits',
            filterType: 'text',
            header: () => <span>Visits</span>,
            aggregationFn: 'sum',
            aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
        },
        {
            accessorKey: 'status',
            id: 'status',
            filterType: 'text',
            size: 150,
            header: 'Status',
        },
        {
            accessorKey: 'progress',
            id: 'progress',
            filterType: 'text',
            header: 'Profile Progress',
            cell: ({ getValue }) =>
                Math.round(getValue<number>() * 100) / 100 + '%',
            aggregationFn: 'mean',
            aggregatedCell: ({ getValue }) =>
                Math.round(getValue<number>() * 100) / 100 + '%',
        },


    ]


// const columns = [
//     {
//         header: 'Name',
//         columns: [
//             {
//                 accessorKey: 'firstName',
//                 header: 'First Name',
//                 id: 'firstName',
//                 filterType: 'includesStringSensitive',
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
//                 filterType: 'includesStringSensitive',
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
//                 filterType: 'includesString',
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
//                         filterType: 'includesStringSensitive',
//                         aggregationFn: 'sum',
//                         aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
//                     },
//                     {
//                         accessorKey: 'status',
//                         id: 'status',
//                         header: 'Status',
//                         filterType: 'includesStringSensitive',
//                     },
//                     {
//                         accessorKey: 'progress',
//                         id: 'progress',
//                         header: 'Profile Progress',
//                         filterType: 'includesStringSensitive',
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

function DndAndGroupTableEX(){
        return(
            <DndAndGroupTable data={makeData} columns ={columns}></DndAndGroupTable>

        )

}

export default DndAndGroupTableEX;