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
        state: { columnOrder, columnFilters, grouping, },
        onColumnFiltersChange: setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),

    });

    const rerender = () => {
        console.log("columnOrder:", columnOrder)
        console.log("columnFilters:", columnFilters)
        console.log("getCoreRowModel():", getCoreRowModel())
        console.log("getFilteredRowModel():", table.getFilteredRowModel())
        console.log("table:", table);
        console.log("grouping:", grouping);


    };

    const DraggableTableHeader = ({ header }: { header: Header<any, unknown> }) => {
        const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
            id: header.column.id,
        });
        const style: CSSProperties = {
            opacity: isDragging ? 0.8 : 1,
            cursor: isDragging ? 'move' : 'default',
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
                        <div  {...attributes} {...listeners}>

                            {header.column.getIsGrouped()
                                ? `🛑`
                                : ``}

                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        </div>

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

    // các cell được render
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
                {...{
                    key: cell.id,
                    style: {
                        style,
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

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {})
    );
    // Tạo chỗ kéo thả group
    const DropableContainerGroup = ({ children }) => {
        const { isOver, setNodeRef } = useDroppable({
            id: `DropableContainerGroupID`,

        });

        const style = {
            border: isOver ? '0.1px dashed blue' : '0.1px dashed gray',
            padding: '1px',
            marginBottom: '1px',
            background: isOver ? 'yellow' : 'white',
            width: '90%', // Set your desired width here
            height: '40px', // Set your desired height here
            justifyContent: 'left',
            alignItems: 'center',
            display: 'flex',

        };

        return (
            <div ref={setNodeRef} style={style}>
                {children}
            </div>
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over.id !== "DropableContainerGroupID") {
            if (active && over && active.id !== over.id) {
                setColumnOrder(columnOrder => {
                    const oldIndex = columnOrder.indexOf(active.id as string);
                    const newIndex = columnOrder.indexOf(over.id as string);
                    return arrayMove(columnOrder, oldIndex, newIndex);

                });
            }
        } else {

            if (active && !grouping.includes(active.id)) {
                setGrouping([...grouping, active.id]);
            }


        }

    };


    // tu lam va cham
    function customCollisionDetection({
        active,
        collisionRect,
        droppableRects,
        droppableContainers,
        pointerCoordinates,
    }: {
        active: Active;
        collisionRect: ClientRect;
        droppableRects: RectMap;
        droppableContainers: DroppableContainer[];
        pointerCoordinates: Coordinates | null;
    }) {
        // Lọc ra các container droppable là DropableContainerGroupID
        const otherContainers = droppableContainers.filter(({ id }) => id === 'DropableContainerGroupID');

        // Sử dụng thuật toán pointerWithin để kiểm tra va chạm với các container sortable
        const rectIntersectionCollisions = pointerWithin({
            active,
            collisionRect,
            droppableRects,
            droppableContainers: otherContainers,
            pointerCoordinates,
        });

        // Nếu có va chạm với các container sortable, trả về các va chạm đó
        if (rectIntersectionCollisions.length > 0) {
            return rectIntersectionCollisions;
        }

        // Lọc ra các container droppable có id bắt đầu là 'sortable'
        const sortableContainers = droppableContainers.filter(({ id }) => id !== 'DropableContainerGroupID');

        // Sử dụng thuật toán rectIntersection để kiểm tra va chạm với các container sortable   
        return closestCorners({
            active,
            collisionRect,
            droppableRects,
            droppableContainers: sortableContainers,
            pointerCoordinates,
        });
    };
    // dau vao là columID render ra header
    const RenderHeaderByID = ({ columnID, columns }) => {
        const findHeader = (columns: ColumnDef<Person>[], id: string): ColumnDef<Person> | undefined => {
            for (const column of columns) {
                if (column.id === id) {
                    return column;
                }
                if (column.columns) {
                    const found = findHeader(column.columns, id);
                    if (found) {
                        return found;
                    }
                }
            }
            return undefined;
        };

        const columnDef = findHeader(columns, columnID);
        if (columnDef) {
            return <div>{flexRender(columnDef.header, {})} <button
                {...{
                    onClick: () => setGrouping(grouping.filter(item => item !== columnID)),
                    style: {
                        cursor: 'pointer',
                    },
                }}
            >
                X
            </button>
            </div>;
        }

        return <div>Header not found</div>;
    };


    // bắt đầu render chính
    return (
        <div>
            {/* Chọn Column hiển thị */}
            <div className="inline-block border border-black shadow rounded">
                <div className="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{' '}
                        Toggle All
                    </label>
                </div>
                {table.getAllLeafColumns().map(column => {
                    return (
                        <div key={column.id} className="px-1">
                            <label>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />{' '}
                                {flexRender(column.columnDef.header, {})}
                            </label>
                        </div>
                    )
                })}
            </div>

            {/* Render các nút điều khiển */}
            <div>
                <button onClick={rerender}>
                    Regenerate
                </button>
                <button onClick={table.getToggleAllRowsExpandedHandler()}>
                    Expand/Collapse all
                </button>
            </div>

            <div>
                {/* Tạo Drop Group Area */}
                <DndContext
                    collisionDetection={customCollisionDetection}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                > 
                {/* Phần thả group column */}
                    <DropableContainerGroup >
                        {/* <h1>Thả vào đây</h1> */}
                        {grouping.map((id) => (
                            <RenderHeaderByID key={id} columnID={id} columns={columns}></RenderHeaderByID>
                        ))}
                    </DropableContainerGroup>

                    {/* Bắt đầu render table */}
                    <table>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    <SortableContext id="sortable-ContextHeaders" items={columnOrder} strategy={horizontalListSortingStrategy}>
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
                                        <DragAlongCell key={cell.id} cell={cell} />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DndContext>
            </div>
        </div>

    );
}
export default DndAndGroupTable;