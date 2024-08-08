
import {
    flexRender,
} from '@tanstack/react-table';

import { DropableSelectHover } from '../../../utils/Others/DropSelect/DropableSelect'
import styles from './ColumnVisibilityToggle.module.css'


export const ColumnVisibilityToggle = ({ table }) => {
    return <>
        <DropableSelectHover
            droptitle={<div style={{ width: '100%', display: 'flex' }} >Show Column</div>}
            position='right'
        >
            <div className={styles.child}> {/* Thêm ref vào div chứa hộp thoại modal */}
                <div className={styles.child_item}>
                    <input
                        {...{
                            type: 'checkbox',
                            checked: table.getIsAllColumnsVisible(),
                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                        }}
                    />
                    <div> Toggle All </div>
                </div>
                {table.getAllLeafColumns().map(column => {
                    return (
                        <div key={column.id} className={styles.child_item}>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: column.getIsVisible(),
                                    onChange: column.getToggleVisibilityHandler(),
                                }}
                            />
                            {flexRender(column.columnDef.header, {})}
                        </div>
                    )
                })}
            </div>
        </DropableSelectHover>
    </>
}