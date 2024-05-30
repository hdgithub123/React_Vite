import { useState, useMemo, CSSProperties } from 'react';
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
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const makeData = [
    {
        firstName: 'Alice',
        lastName: 'Smith',
        age: 28,
        visits: 120,
        progress: 75,
        status: 'relationship',
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 35,
        visits: 80,
        progress: 60,
        status: 'single',
    },
    {
        firstName: 'Alice',
        lastName: 'Smith',
        age: 42,
        visits: 50,
        progress: 90,
        status: 'complicated',
    },
    {
        firstName: 'David',
        lastName: 'Lee',
        age: 22,
        visits: 200,
        progress: 40,
        status: 'relationship',
    },
    {
        firstName: 'Eva',
        lastName: 'Garcia',
        age: 30,
        visits: 150,
        progress: 70,
        status: 'single',
    },
    {
        firstName: 'Frank',
        lastName: 'Wang',
        age: 50,
        visits: 30,
        progress: 85,
        status: 'relationship',
    },
    {
        firstName: 'Grace',
        lastName: 'Miller',
        age: 25,
        visits: 100,
        progress: 55,
        status: 'single',
    },
    {
        firstName: 'Henry',
        lastName: 'Clark',
        age: 38,
        visits: 70,
        progress: 78,
        status: 'complicated',
    },
    {
        firstName: 'Isabella',
        lastName: 'Martinez',
        age: 27,
        visits: 180,
        progress: 65,
        status: 'relationship',
    },
    {
        firstName: 'Jack',
        lastName: 'Taylor',
        age: 33,
        visits: 90,
        progress: 50,
        status: 'single',
    },
];




function DndAndGroupTable() {
    const [columnFilters, setColumnFilters] = useState([]);
    // const FilterT = {filterFn: "includesStringSensitive", accessorKey: 'firstName',}


    // const columns = useMemo<ColumnDef<Person>[]>(
    //     () => [
    //         {
    //             accessorKey: 'firstName',
    //             id: 'firstName',
    //             header: 'First Name',

    //             cell: info => info.getValue(),
    //         },
    //         {
    //             accessorFn: row => row.lastName,
    //             id: 'lastName',
    //             header: () => <span>Last Name</span>,
    //             cell: info => info.getValue(),
    //         },
    //         {
    //             accessorKey: 'age',
    //             id: 'age',

    //             header: () => 'Age',
    //             aggregatedCell: ({ getValue }) =>
    //                 Math.round(getValue<number>() * 100) / 100,
    //             aggregationFn: 'median',
    //         },
    //         {
    //             accessorKey: 'visits',
    //             id: 'visits',
    //             header: () => <span>Visits</span>,
    //             aggregationFn: 'sum',
    //             aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
    //         },
    //         {
    //             accessorKey: 'status',
    //             id: 'status',
    //             size: 150,
    //             header: 'Status',
    //         },
    //         {
    //             accessorKey: 'progress',
    //             id: 'progress',
    //             header: 'Profile Progress',
    //             cell: ({ getValue }) =>
    //                 Math.round(getValue<number>() * 100) / 100 + '%',
    //             aggregationFn: 'mean',
    //             aggregatedCell: ({ getValue }) =>
    //                 Math.round(getValue<number>() * 100) / 100 + '%',
    //         },


    //     ],
    //     []
    // )

    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: 'Name',

                columns: [
                    {
                        accessorKey: 'firstName',
                        header: 'First Name',
                        id: 'firstName',
                        cell: (info) => info.getValue(),
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
                                aggregationFn: 'sum',
                                aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
                            },
                            {
                                accessorKey: 'status',
                                id: 'status',
                                header: 'Status',
                            },
                            {
                                accessorKey: 'progress',
                                id: 'progress',
                                header: 'Profile Progress',
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
        ],
        []
    )


    const [data, setData] = useState(makeData);
    // const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map(c => c.id!));
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.flatMap(c => c.columns ? c.columns.flatMap(subCol => subCol.columns ? subCol.columns.map(subSubCol => subSubCol.id!) : [subCol.id!]) : [c.id!])
    );
    const [grouping, setGrouping] = useState<GroupingState>([]) 

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { columnOrder, columnFilters, grouping,},
        onColumnFiltersChange: setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
       
    });

    const rerender = () => {
        console.log("columnOrder:", columnOrder)
        console.log("columnFilters:", columnFilters)
        console.log("getCoreRowModel():", getCoreRowModel())
        console.log("getFilteredRowModel():", table.getFilteredRowModel())
        console.log("table:", table);

    };

    const DraggableTableHeader = ({ header }: { header: Header<any, unknown> }) => {
        const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
            id: header.column.id,
        });
        const style: CSSProperties = {
            opacity: isDragging ? 0.8 : 1,
            position: 'relative',
            transform: CSS.Translate.toString(transform),
            transition: 'width transform 0.2s ease-in-out',
            whiteSpace: 'nowrap',
            width: header.column.getSize(),
            zIndex: isDragging ? 1 : 0,
        };

        return (
            <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
                {header.isPlaceholder ? null : (
                    <>
                        <div>
                            {header.column.getCanGroup() ? (
                                // If the header can be grouped, let's add a toggle
                                <button
                                    {...{
                                        onClick: header.column.getToggleGroupingHandler(),
                                        style: {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    {header.column.getIsGrouped()
                                        ? `🛑(${header.column.getGroupedIndex()}) `
                                        : `👊`}
                                </button>
                            ) : null}{' '}
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </div>

                        {/* Colum DND Begin*/}
                        {header.column.getIsGrouped()
                            ? ''
                            : <button {...attributes} {...listeners}>
                                🟰
                            </button>}


                        {/* Colum DND End*/}



                        {/* Colum Resize Begin*/}
                        <div
                            {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${table.options.columnResizeDirection
                                    } ${header.column.getIsResizing() ? 'isResizing' : ''
                                    }`,
                            }}
                        />
                        {/* Colum Resize end*/}
                    </>
                )}
            </th>
        );
    };

    const StaticTableHeader = ({ header }: { header: Header<Person, unknown> }) => {
        return (
            <th colSpan={header.colSpan}>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
        );
    };


    const DragAlongCell = ({ cell }: { cell: Cell<any, unknown> }) => {
        const { isDragging, setNodeRef, transform } = useSortable({
            id: cell.column.id,
        });

        const style: CSSProperties = {
            opacity: isDragging ? 0.8 : 1,
            position: 'relative',
            transform: CSS.Translate.toString(transform),
            transition: 'width transform 0.2s ease-in-out',
            width: cell.column.getSize(),
            zIndex: isDragging ? 1 : 0,
        };

        const { row } = cell.getContext();

        return (
            <td
                ref={setNodeRef}
                style={style}
                {...{
                    key: cell.id,
                    style: {
                        background: cell.getIsGrouped()
                            ? '#0aff0082'
                            : cell.getIsAggregated()
                                ? '#ffa50078'
                                : cell.getIsPlaceholder()
                                    ? '#ff000042'
                                    : 'white',
                    },
                }}
            >
                {cell.getIsGrouped() ? (
                    // If it's a grouped cell, add an expander and row count
                    <>
                        <button
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: {
                                    cursor: row.getCanExpand() ? 'pointer' : 'normal',
                                },
                            }}
                        >
                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}{' '}
                            ({row.subRows.length})
                        </button>
                    </>
                ) : cell.getIsAggregated() ? (
                    // If the cell is aggregated, use the Aggregated renderer for cell
                    flexRender(
                        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                        cell.getContext()
                    )
                ) : cell.getIsPlaceholder() ? null : (
                    // For cells with repeated values, render null
                    // Otherwise, just render the regular cell
                    flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )
                )}
            </td>
        );
    };

    const isLeafColumn = (header: Header<Person, unknown>) => !header.subHeaders || header.subHeaders.length === 0;

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder(columnOrder => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return arrayMove(columnOrder, oldIndex, newIndex);

            });
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            //  modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="p-2">
                <div className="h-4" />
                <div className="flex flex-wrap gap-2">
                    <button onClick={rerender} className="border p-1">
                        Regenerate
                    </button>
                </div>
                <div className="h-4" />
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                                    {headerGroup.headers.map((header) =>
                                        isLeafColumn(header) ? (
                                            <DraggableTableHeader key={header.id} header={header} />
                                        ) : (
                                            <StaticTableHeader key={header.id} header={header} />
                                        )
                                    )}
                                </SortableContext>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <DragAlongCell key={cell.id} cell={cell} row={row} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DndContext>
    );
}

export default DndAndGroupTable;
