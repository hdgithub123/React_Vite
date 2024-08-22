
import {
    flexRender,
} from '@tanstack/react-table';

import { DropableSelectClick, DropableSelectHover } from '../../../utils/Others/DropSelect/DropableSelect'
import styles from './ColumnVisibilityToggle.module.css'


export const ColumnVisibilityToggleBasic = ({ table }) => {
    return <>
        <DropableSelectClick
            droptitle={<button style={{ maxWidth: '100px', display: 'flex' }} >Show Column</button>}
            position='bottom'
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
        </DropableSelectClick>
    </>
}