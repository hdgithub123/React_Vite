import { useRef } from "react";
import { useVirtualizer, notUndefined } from "@tanstack/react-virtual";
import "./index.css";

import * as React from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

import { makeData } from './makeData';
import columns from './columns';




function VitualExample() {
  const [data, _setData] = React.useState(makeData)
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })



  const { rows } = table.getRowModel()

  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 20,
      overscan: 10,

  })



  const items = virtualizer.getVirtualItems();

  const [before, after] =
    items.length > 0
      ? [
        notUndefined(items[0]).start - virtualizer.options.scrollMargin,
        virtualizer.getTotalSize() - notUndefined(items[items.length - 1]).end
      ]
      : [0, 0];




  return (
    <div className="App">
      <div
        style={{ overflow: "auto", height: 300, overflowAnchor: "none" }}
        ref={parentRef}

      >
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "green"
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {before > 0 && (
              <tr>
                <td style={{ height: `${before}px` }}></td>
              </tr>
            )}
          {items.map((virtualRow, index) => {
                                        const row = rows[virtualRow.index]
                                        return (
                                            <tr
                                                key={row.id}
                                                onDoubleClick={() => handleRowClick(row.original)}
                                                // style={{
                                                //     height: 2,
                                                    
                                                // }}
                                            >
                                               
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <td key={cell.id}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        )
                                    })}

            {/* {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))} */}

            {after > 0 && (
              <tr>
                <td style={{ height: `${after}px` }}></td>
              </tr>
            )}

          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}
              style={{
                position: "sticky",
                top: 0,
                background: "green"
              }}
              >
                {footerGroup.headers.map(header => (
                  <th 
                  key={header.id}
                  
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}





export default VitualExample;
