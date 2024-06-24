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

import DndAndGroupTable from './DndAndGroupTable';


function addCheckState(data){
    return data.map(item => ({
        ...item,
        select: false,
    }));
}


function DndAndGroupTableWithCheckboxFilter({data, columns}) {
  const datadef = addCheckState(data)
    const columnsdef = [
        {
            id: 'select',
            accessorKey: 'select',
            filterType: 'checkbox',
            size: 30,
            minSize: 20,
            enableSorting: false,
            header: TableHeader,
            cell: EditableCheckboxCell,
        },
        ...columns,
    ]

    const [selectedData, setSelectedData] = useState(null); // State to store the selected data from the table
    // Event handler when selecting a row in the table

    const handleRowSelect = (rowData) => {
        setSelectedData(rowData); // Update state with the selected row data
    };
    const handleRowsSelect = (rowsData) => {
        console.log("rowsData",rowsData)
    };
    
    return (
        <div>
            <div style={{ height: '500px', }}>
                <DndAndGroupTable data={datadef} columns={columnsdef} onRowSelect={handleRowSelect} onRowsSelect={handleRowsSelect}></DndAndGroupTable>
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

export default DndAndGroupTableWithCheckboxFilter;

  const EditableCheckboxCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    // When the input changes, we'll call our table meta's updateData function
    const onChangeHandler = (e) => {
        row.toggleSelected()
        const newValue = e.target.checked;
        setValue(newValue);
        table.options.meta?.updateData(row.index, column.id, newValue);
    };
  
    // If the initialValue is changed externally, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
      
    }, [initialValue]);
    
    return (
              <input
                type="checkbox"
                checked={value}
                onChange={onChangeHandler}
              />
            );
  };
  


  function TriStateCheckbox({ onChange }) {
    const [state, setState] = useState('indeterminate'); // 'unchecked', 'checked', or 'indeterminate'
    const inputRef = useRef(null);

    useEffect(() => {
        const checkbox = inputRef.current;
        if (checkbox) {
            checkbox.indeterminate = state === 'indeterminate';
        }
    }, [state]);

    useEffect(() => {
        let value;
        switch (state) {
            case 'checked':
                value = true;
                break;
            case 'unchecked':
                value = false;
                break;
            case 'indeterminate':
                value = '';
                break;
            default:
                value = true;
        }
        onChange(value);
    }, [state]);

    const handleClick = () => {
        setState(prevState => {
            switch (prevState) {
                case 'unchecked':
                    return 'checked';
                case 'checked':
                    return 'indeterminate';
                case 'indeterminate':
                    return 'unchecked';
                default:
                    return prevState;
            }
        });
    };

    return (
        <input
            type="checkbox"
            ref={inputRef}
            checked={state === 'checked'}
            onClick={handleClick}
            readOnly
        />
    );
}


  const TableHeader = ({ table }) => {
    
    const handleSelectChange = (value) => {
        if (value === true || value === false){
            updateAllRowsSelect(table,value)
            table.toggleAllRowsSelected()
        }
    };
  
    return (
    <div title="Select All/ Unselect All">
        <TriStateCheckbox
        onChange={handleSelectChange}
      />
    </div>
    );
  };

  const updateAllRowsSelect = (table, selectValue) => {
    table.getRowModel().rows.forEach(row => {
      table.options.meta?.updateData(row.index, 'select', selectValue);
    });
  };
  