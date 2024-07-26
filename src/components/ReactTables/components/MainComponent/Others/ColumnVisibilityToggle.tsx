import { useState, useEffect, useRef } from 'react';

import {
    flexRender,
} from '@tanstack/react-table';

export const ColumnVisibilityToggle = ({ table }) => {
    const [showToggle, setShowToggle] = useState(false);
    const modalRef = useRef(null); // Tạo một ref cho hộp thoại modal
    const modalStyle = {
        position: 'absolute', // Đặt vị trí tương đối với nút
        zIndex: 1, // Đặt z-index để nó nằm trên các phần tử khác
        left: 0, // Đặt vị trí trái ngay dưới nút
        top: '100%', // Đặt vị trí trên ngay dưới nút
        backgroundColor: '#fff', // Đặt màu nền
        padding: '2px', // Đặt padding
        border: '1px solid #000', // Đặt viền
        borderRadius: '4px', // Đặt bán kính bo góc
        width: '150%', // Đặt chiều rộng
    };
    // Hàm xử lý sự kiện onMouseDown
    const handleMouseDown = (event) => {
        // Kiểm tra xem phần tử được nhấp có nằm trong hộp thoại modal hay không
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Nếu không, ẩn hộp thoại modal
            setShowToggle(false);
        }
    };

    // Thêm sự kiện onMouseDown vào document.body khi hộp thoại modal được hiển thị
    useEffect(() => {
        if (showToggle) {
            document.body.addEventListener('mousedown', handleMouseDown);
        }

        // Loại bỏ sự kiện onMouseDown khỏi document.body khi hộp thoại modal bị ẩn hoặc khi component bị unmount
        return () => {
            document.body.removeEventListener('mousedown', handleMouseDown);
        };
    }, [showToggle]); // Chạy lại effect này mỗi khi giá trị của showToggle thay đổi

    return (
        <div style={{ position: 'relative' }}> {/* Đặt vị trí tương đối cho div cha */}
            <button onClick={() => setShowToggle(!showToggle)}>
                Show Column
            </button>
            {showToggle &&
                <div ref={modalRef} style={modalStyle}> {/* Thêm ref vào div chứa hộp thoại modal */}
                    <div className="px-1 border-b border-black">
                        <label>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: table.getIsAllColumnsVisible(),
                                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                                }}
                            />{' '}
                            Toggle All
                        </label>
                    </div>
                    {table.getAllLeafColumns().map(column => {
                        return (
                            <div key={column.id} className="px-1">
                                <label>
                                    <input
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />{' '}
                                    {flexRender(column.columnDef.header, {})}
                                </label>
                            </div>
                        )
                    })}
                </div>}
        </div>
    );
}