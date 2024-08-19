import {
    flexRender,
} from '@tanstack/react-table';

import styles from './RenderHeaderByID.module.css';





export const RenderHeaderByID = ({ columnID, columns, setGrouping, grouping }) => {
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
        return <div className={styles.styleHeaderByID}>
        <div className={styles.styleHeaderText}>
            {flexRender(columnDef.header, {})} 
        </div>
        <button
            className={styles.styleclosebutton}
            {...{
                onClick: () => setGrouping(grouping.filter(item => item !== columnID)),
                
            }}
        >
            X
        </button>
        </div>;
    }

    return <div>Header not found</div>;
}