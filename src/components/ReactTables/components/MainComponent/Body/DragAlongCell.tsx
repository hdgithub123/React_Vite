import { CSSProperties } from 'react';

import {
    flexRender,
} from '@tanstack/react-table';

import {
    useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { getCommonPinningStyles } from '../Others/getCommonPinningStyles';

export const DragAlongCell = ({ cell }) => {
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

    const styleGrouped = {
        fontWeight: 'bold',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

    const styleAggregated = {
        fontWeight: 'bold',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

    const styleNormal = {
        fontWeight: 'normal',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }



    const { row } = cell.getContext();
    // const { column } = cell
    return (
        <td
            ref={setNodeRef}
            {...{
                key: cell.id,
                style: {
                    style,
                    // ...getCommonPinningStyles(column),
                    ...(
                        cell.getIsGrouped()
                            ? styleGrouped
                            : cell.getIsAggregated()
                                ? styleAggregated
                                : styleNormal
                    ),
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
                        cell.column.columnDef.groupCell ?? cell.column.columnDef.cell,
                        cell.getContext()
                    )}
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