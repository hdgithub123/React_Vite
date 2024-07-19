
import {
    flexRender,   
} from '@tanstack/react-table';


   // dau vao là columID render ra header
export const RenderHeaderByID = ({ columnID, columns }) => {
    const findHeader = (columns, id) => {
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
}