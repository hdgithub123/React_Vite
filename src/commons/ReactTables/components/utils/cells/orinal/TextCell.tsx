export const TextCell = ({ getValue, row, column, table }) => {
    return <div style={{ 
        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }}>{getValue()}</div>;
};


export const TextGroupCell = ({ getValue, row, column, table }) => {
    return <div style={{ 
        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }}>({row.subRows.length}) {getValue()}</div>;
};