import { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';
import React from 'react'

import styles from './ReactTableFull.module.css';
import {



    ColumnFiltersState,
    FilterFn,
    SortingFn,

    GroupingState,
    getPaginationRowModel,
    getGroupedRowModel,
    getExpandedRowModel,

    Cell,
    ColumnDef,
    Header,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,

    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    DndContext,
    useDroppable,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    closestCorners,
    DragEndEvent,
    useSensor,
    useSensors,

    CancelDrop,

    pointerWithin,
    rectIntersection,
    CollisionDetection,

    DragOverlay,
    DropAnimation,
    getFirstCollision,

    Modifiers,

    UniqueIdentifier,

    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
    Active,
    ClientRect,
    DroppableContainer,


} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement, restrictToWindowEdges, } from '@dnd-kit/modifiers';
import {
    useSortable,
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    verticalListSortingStrategy,
    rectSwappingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import arrow_drop_down from './source/images/arrows/pointer-down-svgrepo-com.svg';
import arrow_right from './source/images/arrows/pointer-right-svgrepo-com.svg';
import Filter from '../../components/filters/Filter';





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