import React, { useState, useMemo, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import {
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
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 35,
    visits: 80,
    progress: 60,
    status: 'single',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
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
          {flexRender(header.column.columnDef.header, header.getContext())}
          <button {...attributes} {...listeners}>
            🟰
          </button>
        </>
      )}
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

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

function DndTableRectFull() {
  const [columnFilters, setColumnFilters] = useState([]);
 // const FilterT = {filterFn: "includesStringSensitive", accessorKey: 'firstName',}
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
       filterFn: "includesStringSensitive",
        //...FilterT, // van chay
        header: () => (
          <div>
            First Name
            <input
              type="text"
              onChange={e =>
                
                setColumnFilters((prev) =>    
                prev
                .filter(f => f.id !== 'firstName')
                .concat({ id: 'firstName', value: e.target.value }),
                )
              }
            />
          </div>
        ),
        id: 'firstName',
        size: 150,
      },
      {
        accessorFn: row => row.lastName,
        cell: info => info.getValue(),
        header: () => (
          <div>
            Last Name
            <input
              type="text"
              onChange={e =>
                setColumnFilters(prev => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
        ),
        id: 'lastName',
        size: 150,
      },
      {
        accessorKey: 'age',
        header: () => (
          <div>
            Age
            <input
              type="number"
              onChange={e =>
                setColumnFilters(prev => ({
                  ...prev,
                  age: e.target.value,
                }))
              }
            />
          </div>
        ),
        id: 'age',
        size: 120,
      },
      {
        accessorKey: 'visits',
        header: () => (
          <div>
            Visits
            <input
              type="number"
              onChange={e =>
                setColumnFilters(prev => ({
                  ...prev,
                  visits: e.target.value,
                }))
              }
            />
          </div>
        ),
        id: 'visits',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: () => (
          <div>
            Status
            <select
              onChange={e =>
                setColumnFilters((prev) =>
                  prev
                    // .filter((f) => f.id !== id)
                    .concat({
                      id: "status",
                      value: e.target.value
                    })
                )
              }
            >
              <option value="">All</option>
              <option value="relationship">Relationship</option>
              <option value="single">Single</option>
              <option value="complicated">Complicated</option>
            </select>
          </div>
        ),
        id: 'status',
        size: 150,
      },
      {
        accessorKey: 'progress',
        header: () => (
          <div>
            Profile Progress
            <input
              type="number"
              onChange={e =>
                setColumnFilters(prev => ({
                  ...prev,
                  progress: e.target.value,
                }))
              }
            />
          </div>
        ),
        id: 'progress',
        size: 180,
      },
    ],
    []
  );

  const [data, setData] = useState(makeData);
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map(c => c.id!));

  const rerender = () => {
    console.log("columnOrder:", columnOrder)
    console.log("columnFilters:", columnFilters)
    console.log("getCoreRowModel():", getCoreRowModel())
    console.log("getFilteredRowModel():", table.getFilteredRowModel())
    console.log("table:", table)


  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnOrder, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
  });

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
      // modifiers={[restrictToHorizontalAxis]}
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
                  {headerGroup.headers.map(header => (
                    <DraggableTableHeader key={header.id} header={header} />
                  ))}
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
      </div>
    </DndContext>
  );
}

export default DndTableRectFull;
