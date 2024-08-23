import styles from './Pages.module.css';

export function Pages({ table }) {
    return <div className={styles.General}>
        <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
        >
            {'<<'}
        </button>
        <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            {'<'}
        </button>
        <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            {'>'}
        </button>
        <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
        >
            {'>>'}
        </button>
        <span className={styles.pageview}>
            <div>Page: </div>
            <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
            </strong>
        </span>
        <span className={styles.pageview}>
            | Go to page:
            <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                }}
            />
        </span>
        <select
            className={styles.pageSelect}
            value={table.getState().pagination.pageSize}
            onChange={e => {
                table.setPageSize(Number(e.target.value))
            }}
        >
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
        </select>
    </div>
}

