import { CSSProperties } from 'react';

import {
    flexRender,
} from '@tanstack/react-table';

import {
    useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import styles from './Header.module.css';
import Filter from '../../filters/Filter';

// DraggableTableHeader
export const DraggableTableHeader = ({ header }) => {
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
        boxSizing: 'border-box',

    };
    return (
        <>
            <th colSpan={header.colSpan} ref={setNodeRef} 
            style={style}
            className={
                header.column.getIsGrouped()
                    ? styles.th_header_Grouped
                    : ''
            }
            >
                {header.isPlaceholder ? null : (
                    <>
                        <div  {...attributes} {...listeners}>
                            <div
                                
                                onClick={header.column.getToggleSortingHandler()}
                                title={
                                    header.column.getCanSort()
                                        ? header.column.getNextSortingOrder() === 'asc'
                                            ? 'Sort ascending'
                                            : header.column.getNextSortingOrder() === 'desc'
                                                ? 'Sort descending'
                                                : 'Clear sort'
                                        : undefined
                                }
                            >
                                {header.column.getIsGrouped()
                                    ? `!`
                                    : ``}
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: ' 🠹',
                                    desc: ' 🠻',
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
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
                                className: `${styles.resizer} 
                                    } ${header.column.getIsResizing() ? styles.isResizing : ''
                                    }`,
                            }}
                        />
                        {/* Colum Resize end*/}
                    </>
                )}
            </th>
        </>
    );
}


export const StaticTableHeader = ({ header }) => {
    return (
        <th colSpan={header.colSpan}>
            {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
    );
};