export function getIsAllRowsSelected(table: Table<any>) {
    // implementation is a copy from the Tanstack table implementation, except we use expanded row model to work properly with grouped rows
    const rows = table.getExpandedRowModel().rows
    const { rowSelection } = table.getState()

    let isAllRowsSelected = Boolean(
        rows.length && Object.keys(rowSelection).length
    )

    if (isAllRowsSelected) {
        if (
            rows.some(
                row => row.getCanSelect() && !rowSelection[row.id]
            )
        ) {
            isAllRowsSelected = false
        }
    }

    return isAllRowsSelected
}

export function getToggleAllRowsSelectedHandler(table: Table<any>) {
    return () => {
        const newRowSelection = { ...table.getState().rowSelection }
        const newSelected = !getIsAllRowsSelected(table)

        if (newSelected) {
            for (const row of table.getExpandedRowModel().rows) {
                if (!row.getCanSelect()) {
                    continue
                }
                newRowSelection[row.id] = true
            }
        } else {
            for (const row of table.getExpandedRowModel().rows) {
                if (!row.getCanSelect()) {
                    continue
                }
                delete newRowSelection[row.id]
            }
        }
        table.setRowSelection(newRowSelection)
    }
}