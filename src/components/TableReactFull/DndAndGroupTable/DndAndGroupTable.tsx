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

import arrow_drop_down from './source/images/arrows/pointer-down-svgrepo-com.svg';
import arrow_right from './source/images/arrows/pointer-right-svgrepo-com.svg';



function DndAndGroupTable({data, columns}) {
    const [columnFilters, setColumnFilters] = useState([]);
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
        manualExpanding: false, // set bàng false thì có thể sử dụng cả useEffect để expanded
        autoResetExpanded: false, // set bang false thì tất cả các row được expanding bằng true thì không sử dụng cả useEffect
        // getPaginationRowModel: getPaginationRowModel(),

    });

    const rerender = () => {
        console.log("columnOrder:", columnOrder)
        console.log("columnFilters:", columnFilters)
        console.log("getCoreRowModel():", getCoreRowModel())
        console.log("getFilteredRowModel():", table.getFilteredRowModel())
        console.log("table:", table);
        console.log("grouping:", grouping);
        console.log("table grouping:", table.getHeaderGroups());
       table.setExpanded(true) // Mở tất cả các cột
        //table.setExpanded({}) // đóng tất cả các cột

    };


    // các cell được render
// các cell được render đang phải để bên trong hàm thì mới kéo thả trơn tru được vì nó cần phải được render lại cell
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
                        {/* {row.getIsExpanded() ? '👇' : '👉'}{' '} */}
                        {row.getIsExpanded() ? <img src={arrow_drop_down} style={{ width: '10px', height: '10px' }}/> : <img src={arrow_right} style={{ width: '10px', height: '10px' }}/>}{' '}
                    </button>
                    {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}{' '}
                        ({row.subRows.length})
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
    const isLeafColumn = (header: Header<Person, unknown>) => !header.subHeaders || header.subHeaders.length === 0;

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {})
    );


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



    // sử dụng để expanded all
    useEffect(() => {
        table.setExpanded(true);
    }, [ grouping, columnFilters]);
    
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
                        {grouping.length > 0 ? (
                        grouping.map((id) => (
                            <RenderHeaderByID key={id} columnID={id} columns={columns} />
                        ))
                        ) : (
                        <div style={{ padding: '10px', fontSize: '14px', color: '#999' }}>
                            Drag header to group
                        </div>
                        )}
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
                        {table.getRowModel().rows.length > 0 ? (
                            <tbody>
                            {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <DragAlongCell key={cell.id} cell={cell} />
                            ))}
                            </tr>
                            ))}
                        </tbody>
                        ) : (
                            <tbody>
                            <tr>
                                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                                    No data available
                                </td>
                            </tr>
                            </tbody>
                        )}
                    </table>
                </DndContext>
            </div>
        </div>

    );
}
export default DndAndGroupTable;




// DraggableTableHeader
const DraggableTableHeader =({ header }: { header: Header<any, unknown> }) => {
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
                        {/* Filter colum*/}
                        
                        {header.column.getCanFilter() ? (
                          <div>
                           <Filter column={header.column}></Filter>
                          </div>
                        ) : null}

                        {/* Colum Resize Begin*/}
                        <div
                            {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer 
                                    } ${header.column.getIsResizing() ? 'isResizing' : ''
                                    }`,
                            }}
                        />
                        {/* Colum Resize end*/}
                    </>
                )}
            </th>
        );
    }




const StaticTableHeader = ({ header }: { header: Header<Person, unknown> }) => {
    return (
        <th colSpan={header.colSpan}>
            {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
    );
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


// ví dụ filter
function Filter({ column }) {
    const filterType = column.columnDef.filterType

    function handelOnChange(e) {
        column.setFilterValue(e.target.value) //ok đưa giá trị vào ô filter value
        column.columnDef.filterFn = filterType // ok để chỉ định filterFn
    }
    return (
        <input
            type="text"
            value={column.getFilterValue() || ''}
            onChange={handelOnChange}
            placeholder='Search...'
        />
    )
}

// function Filter({ column }) {
//     const filterType = column.columnDef.filterType
//     const [textfilter, setTextfilter] = React.useState(column.getFilterValue())
//     function handelOnChange(e) {
        
//         column.setFilterValue(textfilter) //ok đưa giá trị vào ô filter value
//         column.columnDef.filterFn = filterType // ok để chỉ định filterFn
//         setTextfilter(e.target.value)
//         console.log("columnf",column.getFilterValue())
//         console.log("column",column)
//     }
//     return (
//         <input
//             type="text"
//             value={textfilter || ''}
//             onChange={handelOnChange}
//             placeholder='Search...'
//         />


//     )
// }