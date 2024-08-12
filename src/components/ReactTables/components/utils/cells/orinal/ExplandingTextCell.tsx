export const ExplandingTextCell = ({ row, getValue }) => {
    return (
        <div
            style={{
                paddingLeft: `${row.depth}rem`,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
                {row.getCanExpand() ? (
                    <button
                        {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: { cursor: 'pointer', background: 'none', border: 'none' },
                        }}
                    >
                        {row.getIsExpanded() ? '⮟' : '⮞'}
                    </button>
                ) : (
                    ''
                )}{' '} 
                {getValue()}
        </div>
    )
}

export const TextCellExplanding = ({ row, getValue }) => {
    return (< div
        style={{
            paddingLeft: `${row.depth * 20}px`,
            textAlign: 'left',
            whiteSpace: 'nowrap',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}> 
        {getValue()}
    </div >)
}

