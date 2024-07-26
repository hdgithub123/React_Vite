import { useState, useEffect,useRef, CSSProperties } from 'react';
import React from 'react'

import {
    FilterFn,
    GroupingState,
    getGroupedRowModel,
    getExpandedRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    useSortable,
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import styles from './ReactTableFull.module.css';
import { useVirtualizer, notUndefined } from "@tanstack/react-virtual";
import { DraggableTableHeader, StaticTableHeader } from '../../components/MainComponent/Header/Header';
import { DraggableTablefooter } from '../../components/MainComponent/Footer/Footer';
import { customCollisionDetection } from '../../components/MainComponent/Others/customCollisionDetection';
import { DropableContainerGroup } from '../../components/MainComponent/Others/DropableContainerGroup';
import { ColumnVisibilityToggle } from '../../components/MainComponent/Others/ColumnVisibilityToggle';
import { RenderHeaderByID } from '../../components/MainComponent/Others/RenderHeaderByID';
import { IndeterminateCheckbox } from '../../components/MainComponent/Others/IndeterminateCheckbox';
import { TriStateCheckbox } from '../../components/MainComponent/Others/TriStateCheckbox';


function ReactTableFull({ data, columns, onRowSelect, onRowsSelect }) {
    const [dataDef, setDataDef] = useState(data);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.flatMap(c => c.columns ? c.columns.flatMap(subCol => subCol.columns ? subCol.columns.map(subSubCol => subSubCol.id!) : [subCol.id!]) : [c.id!])
    );
    const [grouping, setGrouping] = useState<GroupingState>([])

    const selectedFilter: FilterFn<any> = (rows, columnIds, filterValue) => {
        // Get the selected row IDs from the table state
        const selectedRowIds = table.getState().rowSelection;
        // If filterValue is true, return selected rows
        if (filterValue === 'checked') {
            if (selectedRowIds[rows.id] === true) {
                return true;
            } else {
                return false;
            }
        } else if (filterValue === 'unchecked') {
            if (selectedRowIds[rows.id] !== true) {
                return true;
            }
            return false;
        } else {
            return true;
        }

    };

    const table = useReactTable({
        data: dataDef,
        columns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            selectedFilter, // Register the custom filter function
        },
        state: { columnOrder, columnFilters, grouping, },
        onColumnFiltersChange: setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        globalFilterFn: 'selectedFilter',
        manualExpanding: false, // set bàng false thì có thể sử dụng cả useEffect để expanded
        autoResetExpanded: false, // set bang false thì tất cả các row được expanding bằng true thì không sử dụng cả useEffect
        // getPaginationRowModel: getPaginationRowModel(),
        meta: {
            updateData: (rowIndex, columnId, value) =>
                setDataDef((prev) =>
                    prev.map((row, index) =>
                        index === rowIndex
                            ? {
                                ...prev[rowIndex],
                                [columnId]: value,
                            }
                            : row
                    )
                ),
        },

    });

    const isLeafColumn = (header) => !header.subHeaders || header.subHeaders.length === 0;
    const leafHeaderGroupIndex = table.getHeaderGroups().length - 1;
    const leafHeaderGroup = table.getHeaderGroups()[leafHeaderGroupIndex];
    const shouldRenderFooter = leafHeaderGroup.headers.some(header => header.column.columnDef.footer);
    const countLeafColumns = (columns) => {
        return columns.reduce((count, column) => {
            if (column.columns) {
                return count + countLeafColumns(column.columns);
            }
            return count + 1;
        }, 0);
    };


    const DragAlongCell = ({ cell }) => {
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
                        // background: cell.getIsGrouped()
                        //     ? '#ddd'
                        //     : cell.getIsAggregated()
                        //         ? '#ddd'
                        //         : cell.getIsPlaceholder()
                        //             ? 'white'
                        //             : null,
    
                        fontWeight: cell.getIsGrouped()
                            ? 'bold'
                            : cell.getIsAggregated()
                                ? 'bold'
                                : 'normal',
    
                    },
                }}
            >
                {cell.getIsGrouped() ? (
                    // If it's a grouped cell, add an expander and row count
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: {
                                    cursor: row.getCanExpand() ? 'pointer' : 'normal',
                                    border: 'none',
                                    background: 'none',
                                },
                            }}
                        >
                            {row.getIsExpanded() ? '⮛' : '⮚'}{' '}
                        </button>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}{' '}
                        ({row.subRows.length})
                    </div>
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


    useEffect(() => {
        const selectedRowIndices = Object.keys(table.getState().rowSelection).map(Number);
        const selectedData = selectedRowIndices.map(index => data[index]);
        if (onRowsSelect) {
            onRowsSelect(selectedData);
        }
    }, [table.getState().rowSelection]);


    // sử dụng để expanded all
    useEffect(() => {
        table.setExpanded(true);
    }, [grouping, columnFilters]);

    const handleRowClick = (rowData) => {
        if (onRowSelect) {
            onRowSelect(rowData);
        }
    };

    const handleTriStateCheckboxSelectChange = (value) => {
        if (value === true) {
            table.setGlobalFilter('checked')
        } else if (value === false) {
            table.setGlobalFilter('unchecked')
        } else {
            table.setGlobalFilter('none')
        }
    };
    // bắt đầu render Virtual

    const { rows } = table.getRowModel()

    const parentRef = React.useRef<HTMLDivElement>(null)

    const rowHeights = useRef({});

    const virtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (index) => rowHeights.current[index] || 35, // Default to 35 if height is not measured
        overscan: 10,
        measureElement: (el) => {
            if (el) {
                const index = Number(el.dataset.index);
                const height = el.getBoundingClientRect().height;
                rowHeights.current[index] = height;
            }
        },
    });

    const items = virtualizer.getVirtualItems();


    const [before, after] =
        items.length > 0
            ? [
                notUndefined(items[0]).start - virtualizer.options.scrollMargin,
                virtualizer.getTotalSize() - notUndefined(items[items.length - 1]).end
            ]
            : [0, 0];



    // bắt đầu render chính
    return (
        <div className={styles.general_table}>
            {/* Render các nút điều khiển */}
            <div className={styles.botton_container}>
                {/* Chọn Column hiển thị */}
                <ColumnVisibilityToggle table={table}></ColumnVisibilityToggle>
                <button onClick={table.getToggleAllRowsExpandedHandler()}>
                    Expand/Collapse all
                </button>
            </div>

            <div className={styles.container}>
                {/* Tạo Drop Group Area */}
                <DndContext
                    collisionDetection={customCollisionDetection}
                    onDragEnd={handleDragEnd}
                    autoScroll = {false}
                    sensors={sensors}
                >
                    <div className={styles.Dropable_Container_Group}>
                        {/* Phần thả group column */}
                        <DropableContainerGroup >
                            {/* <h1>Thả vào đây</h1> */}
                            {grouping.length > 0 ? (
                                grouping.map((id) => (
                                    <RenderHeaderByID key={id} columnID={id} columns={columns} setGrouping={setGrouping} grouping={grouping} />
                                ))
                            ) : (
                                <div style={{ padding: '10px', fontSize: '14px', color: '#999' }}>
                                    Drag header to group
                                </div>
                            )}
                        </DropableContainerGroup>
                    </div>
                    <div
                        ref={parentRef}
                        className={styles.div_table_container}
                    >

                        {/* Bắt đầu render table */}
                        <table className={styles.table_container}>
                            <thead className={styles.table_head}>
                                {table.getHeaderGroups().map((headerGroup, rowIndex) => (
                                    <tr className={styles.table_head_tr} key={headerGroup.id}>
                                        {rowIndex === leafHeaderGroupIndex
                                            ?
                                            (<th className={styles.table_head_tr_th_checkbox}>
                                                <div title="Select All/ Unselect All">
                                                    <IndeterminateCheckbox
                                                        {...{
                                                            checked: table.getIsAllRowsSelected(),
                                                            indeterminate: table.getIsSomeRowsSelected(),
                                                            onChange: table.getToggleAllRowsSelectedHandler(),
                                                        }}
                                                    />
                                                </div>
                                                <div title="Filter Select">
                                                    <TriStateCheckbox onChange={handleTriStateCheckboxSelectChange}></TriStateCheckbox>
                                                </div>
                                            </th>) : (
                                                <th></th>
                                            )
                                        }
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
                                <tbody className={styles.table_body}>
                                    {before > 0 && (
                                        <tr className={styles.table_body_tr}>
                                            <td style={{ height: `${before}px` }}></td>
                                        </tr>
                                    )}
                                    {items.map((virtualRow, index) => {
                                        const row = rows[virtualRow.index]
                                        return (
                                            <tr
                                                className={styles.table_body_tr}
                                                key={row.id}
                                                onDoubleClick={() => handleRowClick(row.original)}
                                            >
                                                <td>
                                                    <IndeterminateCheckbox
                                                        {...{
                                                            checked: row.getIsSelected(),
                                                            disabled: !row.getCanSelect(),
                                                            indeterminate: row.getIsSomeSelected(),
                                                            onChange: row.getToggleSelectedHandler(),
                                                        }}
                                                    />
                                                </td>
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <DragAlongCell key={cell.id} cell={cell} />
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}

                                    {after > 0 && (
                                        <tr className={styles.table_body_tr}>
                                            <td style={{ height: `${after}px` }}></td>
                                        </tr>
                                    )}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr className={styles.table_body}>
                                        <td></td>
                                        <td colSpan={countLeafColumns(columns)} style={{ textAlign: 'center' }}>
                                            No data available
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {shouldRenderFooter && <tfoot className={styles.foot_container}>
                                <tr>
                                    <td className={styles.footer_checkbox}></td>
                                    {table.getHeaderGroups()[leafHeaderGroupIndex].headers.map(header => (
                                        <DraggableTablefooter key={header.id} header={header} />
                                    ))}
                                </tr>
                            </tfoot>}
                        </table>

                    </div>
                </DndContext>
            </div>
        </div>

    );
}
export default ReactTableFull;


