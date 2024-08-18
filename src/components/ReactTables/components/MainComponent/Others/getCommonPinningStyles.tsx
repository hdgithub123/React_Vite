import { CSSProperties } from 'react'
export const getCommonPinningStyles = (column): CSSProperties => {
    const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstLeftPinnedColumn =
    isPinned === 'left' && column.getIsFirstColumn('left')

  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')
  // console.log("column.getStart('left')",column.getStart('left'))
  // console.log("column",column)
    return {
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px gray inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px gray inset'
          : undefined,
      // left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      left: isFirstLeftPinnedColumn ? `${column.getStart('left')+ 25}px` : isPinned === 'left' ? `${column.getStart('left')-9}px` : undefined,

      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      backgroundColor: 'white',
    }
  }

