import { useState, useEffect, useRef, useMemo } from 'react';
import React from 'react'

import {
    FilterFn,
    GroupingState,
    getGroupedRowModel,
    getExpandedRowModel,
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
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'

import styles from './ReactTableNomalArrowkey.module.css';
import { useVirtualizer, notUndefined } from "@tanstack/react-virtual";
import { DraggableTableHeader, StaticTableHeader } from '../../components/MainComponent/Header/Header';
import { DragAlongCell } from '../../components/MainComponent/Body/DragAlongCell';
import { DraggableTablefooter } from '../../components/MainComponent/Footer/Footer';
import { getSelectedData } from '../../components/MainComponent/Others/getSelectedData';
import { getDataVisibleColumn } from '../../components/MainComponent/Others/getDataVisibleColumn';
import { GlobalFilter } from '../../components/MainComponent/GlobalFilter/GlobalFilter';
import { getOneRowData } from '../../components/MainComponent/Others/getOneRowData';
import { throttle } from '../../components/utils/Others/throttle';


function ReactTableNomalArrowkey({ data, columns, columnsShow = [] , onDataChange = ()=>{}, onRowSelect = ()=>{}, onVisibleColumnDataSelect = ()=>{}, grouped = [], isGlobalFilter = false }) {
    const [dataDef, setDataDef] = useState(data);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.flatMap(c => c.columns ? c.columns.flatMap(subCol => subCol.columns ? subCol.columns.map(subSubCol => subSubCol.id!) : [subCol.id!]) : [c.id!])
    );
    const [grouping, setGrouping] = useState<GroupingState>(grouped)
    const [globalFilter, setGlobalFilter] = useState({ checkboxvalue: 'none', filterGlobalValue: '' })

    const GlobalFilterFn: FilterFn<any> = (rows, columnIds, filterValue) => {
        const valueInColumnId = String(rows.original[columnIds])
        const valueGlobalFilter = String(filterValue.filterGlobalValue)
        let checkboxCheck
        // const globalValueCheck = valueInColumnId.includes(valueGlobalFilter);
        const globalValueCheck = valueInColumnId.toLowerCase().includes(valueGlobalFilter.toLowerCase());

        // Get the selected row IDs from the table state
        const selectedRowIds = table.getState().rowSelection;
        // If filterValue is true, return selected rows
        if (filterValue.checkboxvalue === 'checked') {
            if (selectedRowIds[rows.id] === true) {
                checkboxCheck = true;
            } else {
                checkboxCheck = false;
            }
        } else if (filterValue.checkboxvalue === 'unchecked') {
            if (selectedRowIds[rows.id] !== true) {
                checkboxCheck = true;
            }
        } else {
            checkboxCheck = true;
        }

        if (checkboxCheck && globalValueCheck) {
            return true
        } else {
            return false
        }
    };

    const table = useReactTable({
        data: dataDef,
        columns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

        getSubRows: row => row.subRows,
        filterFromLeafRows: true,
        enableSubRowSelection: false, // click on subrow not auto select

        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            GlobalFilterFn, // Register the custom filter function
        },
        state: { columnOrder, columnFilters, grouping, globalFilter, },
        onColumnFiltersChange: setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'GlobalFilterFn',
        manualExpanding: false, // set bàng false thì có thể sử dụng cả useEffect để expanded
        autoResetExpanded: false, // set bang false thì tất cả các row được expanding bằng true thì không sử dụng cả useEffect
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

    const DragACell = ({ cell }) => {
        return <DragAlongCell cell={cell}></DragAlongCell>

    }

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
        setDataDef(data)
    }, [data]);

     useEffect(() => {
         // kiểm tra xem trong columnOrder mà không chứa trong columnsShow thì thực hiện lệnh table.setColumnVisibility({ key: false });
         if (columnsShow && columnsShow.length > 0) {
             const allColumnIds = columnOrder;
             const columnsShowSet = new Set(columnsShow);
             const visibility: Record<string, boolean> = {};
             allColumnIds.forEach((colId) => {
                 visibility[colId] = columnsShowSet.has(colId);
             });
             table.setColumnVisibility(visibility);
             // sắp xếp lại columnOrder theo thứ tự của columnsShow, không có trong columnsShow thì giữ nguyên
             const sortedColumnOrder = [
                 ...columnsShow,
                 ...columnOrder.filter(colId => !columnsShow.includes(colId))
             ];
 
             setColumnOrder(sortedColumnOrder);
         }
 
     }, []);


    useEffect(() => {
        if (onDataChange) {
            onDataChange(dataDef);
        }
    }, [dataDef]);

    // chi lay ra cac o column khong bi an
    useEffect(() => {
        const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table), table.getState().columnVisibility);

        if (onVisibleColumnDataSelect) {
            onVisibleColumnDataSelect(filteredUndefinedData);
        }
    }, [table.getState().rowSelection, table.getState().columnVisibility]);


    // sử dụng để expanded all
    useEffect(() => {
        table.setExpanded(true);
    }, [grouping, columnFilters]);

    const handleRowClick = (rowData) => {
        const rowClick = getOneRowData(rowData)
        if (onRowSelect) {
            onRowSelect(rowClick);
        }
    };


    // arrow key
    const [headerHeight, setHeaderHeight] = useState(0); // Chiều cao của header
    const [selectedIndex, setSelectedIndex] = useState(-1); // Lưu trạng thái hàng được chọn

    useEffect(() => {
        if (selectedIndex !== -1 && parentRef.current) {
            const listItemSelect = parentRef.current.querySelector(`tr[data-key="${selectedIndex}"]`);
            const listContainerRectTop = parentRef.current.getBoundingClientRect().top; // vi tri top tọa độ table
            // Tính toán chiều cao của header
            const theadHeight = parentRef.current.querySelector('thead')?.getBoundingClientRect().height || 0; // chiều cao của phần header
            const tfootheight = parentRef.current.querySelector('tfoot')?.getBoundingClientRect().height || 0;
            const tfootTop = parentRef.current.querySelector('tfoot')?.getBoundingClientRect().top || 0; // vị trí top của footer

            let firstKey = 1
            for (let i = 1; i < 1000; i++) {
                let firstCheck = parentRef.current.querySelector(`tbody tr:nth-child(${i})`);
                if (firstCheck) {
                    const firstCheckTop = firstCheck.getBoundingClientRect().top;// vị tri top cua dòng được chọn
                    if (firstCheckTop > listContainerRectTop + theadHeight && i > 2) {
                        firstKey = i - 1
                        break;
                    }
                } else {
                    break;
                }
            }
            const firstItem = parentRef.current.querySelector(`tbody tr:nth-child(${firstKey})`);
            const dataKey = firstItem.getAttribute('data-key');
            let listItem = null
            if (listItemSelect) {
                listItem = listItemSelect
            } else {
                listItem = firstItem
                setSelectedIndex(+dataKey);
            }
            if (listItem) {
                const listItemRectTop = listItem.getBoundingClientRect().top;// vị tri top cua dòng được chọn
                const listItemRectHeight = listItem.getBoundingClientRect().height // chiều cao của dòng được chọn
                setHeaderHeight(theadHeight);
                // Tính toán vị trí của dòng được highlight trong phần hiển thị trừ đi chiều cao của header
                const relativeTop = listItemRectTop - listContainerRectTop - headerHeight; // khoảng cách từ dòng hiện tại đến cuối header
                const relativefooter = tfootTop - listItemRectTop + listItemRectHeight - tfootheight;
                if (relativeTop < 0) {
                    parentRef.current.scrollTop = parentRef.current.scrollTop + relativeTop;
                    // parentRef.current.scrollTop = parentRef.current.scrollTop - relativefooter + tfootheight; // nếu dùng cái này thì sẽ scoll lên top
                } else {
                    if (relativefooter < tfootheight) {
                        // parentRef.current.scrollTop = parentRef.current.scrollTop + relativeTop; // nếu dùng cái này thì sẽ scoll xuống bottom
                        parentRef.current.scrollTop = parentRef.current.scrollTop - relativefooter + tfootheight;
                    }
                }

            }
        }
    }, [selectedIndex]);

    const lengthData = table.getRowModel().rows.length
    const updateSelectedIndex = useMemo(() => {
        return throttle((newIndex) => {
            setSelectedIndex(newIndex);
        }, 200);
    }, [])


    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (e.key === 'ArrowUp') {
                updateSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
            } else if (e.key === 'ArrowDown') {
                updateSelectedIndex(prevIndex => Math.min(prevIndex + 1, lengthData - 1));
            }
        } else if (e.key === 'Enter') {
            if (onRowSelect) {
                const rowEnter = getOneRowData(rows[selectedIndex])
                onRowSelect(rowEnter);
            }
        }
    };

    const handleonBlur = () => {
        setSelectedIndex(-1);
    }

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
            <div className={styles.container}>
                {/* Tạo Global Filter */}
                {isGlobalFilter === true ? (<div className={styles.globalFilter}>
                    <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} onhandleKeyDown={handleKeyDown}></GlobalFilter>
                </div>) : null}
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragEnd={handleDragEnd}
                    autoScroll={false}
                    sensors={sensors}
                >

                    <div
                        ref={parentRef}
                        className={styles.div_table_container}
                    >
                        {/* Bắt đầu render table */}
                        <table id={'React_table_id'} className={styles.table_container} onKeyDown={handleKeyDown} onBlur={handleonBlur}>
                            <thead className={styles.table_head}>
                                {table.getHeaderGroups().map((headerGroup, rowIndex) => (
                                    <tr className={styles.table_head_tr} key={headerGroup.id}>
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
                                                className={`${styles.table_body_tr} ${rows.indexOf(row) === selectedIndex ? styles.table_body_highlightkeymove : ''}`}
                                                data-key={rows.indexOf(row)}
                                                key={row.id}
                                                onDoubleClick={() => handleRowClick(row)}
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <DragACell key={cell.id} cell={cell} />
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                    <tr className={styles.table_body_td_empty}>
                                        <td></td>
                                    </tr>
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
                            {shouldRenderFooter && <tfoot className={styles.table_footer}>
                                <tr className={styles.table_footer_tr}>
                                    {/* <td className={styles.footer_checkbox}></td> */}
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
export default ReactTableNomalArrowkey;