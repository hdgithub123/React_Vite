import {
    useDroppable,
} from '@dnd-kit/core';

// Tạo chỗ kéo thả group
export const DropableContainerGroup = ({ children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `DropableContainerGroupID`,

    });

    const style = {
        border: isOver ? '0.1px dashed blue' : '0.1px dashed gray',
        padding: '1px',
        marginBottom: '1px',
        background: isOver ? 'yellow' : 'white',
        width: 'calc(100% - 2px)',
        height: '40px', // Set your desired height here
        justifyContent: 'left',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '4px', // Đặt bán kính bo góc

    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
};
