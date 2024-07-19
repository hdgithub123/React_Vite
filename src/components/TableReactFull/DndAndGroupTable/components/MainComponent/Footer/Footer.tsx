
import { CSSProperties } from 'react';

import {
    flexRender,
} from '@tanstack/react-table';

import {
    useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

// DraggableTablefooter
export const DraggableTablefooter = ({ header }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
        id: header.column.id,
    });
    const style: CSSProperties = {
        borderTop: '2px solid gray',
        borderBottom: '2px solid gray',
        fontWeight: 'bold',
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
        <td colSpan={header.colSpan} ref={setNodeRef} style={style}>
            {header.isPlaceholder ? null : (
                <>
                    <div  {...attributes} {...listeners}>

                        {flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                        )}

                    </div>

                </>
            )}
        </td>
    );
}