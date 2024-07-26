import { CSSProperties } from 'react';

import {
    flexRender,
} from '@tanstack/react-table';

import {
    useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

export const DragAlongCell = ({ cell}) => {
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