

import {
    closestCorners,
    pointerWithin,
    Active,
    ClientRect,
    DroppableContainer,
} from '@dnd-kit/core';

// tu lam va cham
export function customCollisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers,
    pointerCoordinates,
}: {
    active: Active;
    collisionRect: ClientRect;
    droppableRects: RectMap;
    droppableContainers: DroppableContainer[];
    pointerCoordinates: Coordinates | null;
}) {
    // Lọc ra các container droppable là DropableContainerGroupID
    const otherContainers = droppableContainers.filter(({ id }) => id === 'DropableContainerGroupID');

    // Sử dụng thuật toán pointerWithin để kiểm tra va chạm với các container sortable
    const rectIntersectionCollisions = pointerWithin({
        active,
        collisionRect,
        droppableRects,
        droppableContainers: otherContainers,
        pointerCoordinates,
    });

    // Nếu có va chạm với các container sortable, trả về các va chạm đó
    if (rectIntersectionCollisions.length > 0) {
        return rectIntersectionCollisions;
    }

    // Lọc ra các container droppable có id bắt đầu là 'sortable'
    const sortableContainers = droppableContainers.filter(({ id }) => id !== 'DropableContainerGroupID');

    // Sử dụng thuật toán rectIntersection để kiểm tra va chạm với các container sortable   
    return closestCorners({
        active,
        collisionRect,
        droppableRects,
        droppableContainers: sortableContainers,
        pointerCoordinates,
    });
};