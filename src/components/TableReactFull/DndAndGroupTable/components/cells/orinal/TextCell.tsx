export const TextCell = ({ getValue, row, column, table }) => {
    return <div style={{ 
        textAlign: 'Left',
        // whiteSpace: 'nowrap',
        // maxWidth: '50px',
        // textOverflow: 'ellipsis',
    }}>{getValue()}</div>;
};