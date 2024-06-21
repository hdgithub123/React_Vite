// useReactTableWithHiddenRows.tsx
import * as React from 'react';
import {
  TableOptions,
  TableOptionsResolved,
  RowData,
  createTable,
  useReactTable as originalUseReactTable,
} from '@tanstack/table-core';
import {
    useReactTable,
  } from '@tanstack/react-table';


import { filterHiddenRows, HiddenRowOptions } from './hiddenRows';

export type Renderable<TProps> = React.ReactNode | React.ComponentType<TProps>;

/**
 * If rendering headers, cells, or footers with custom markup, use flexRender instead of `cell.getValue()` or `cell.renderValue()`.
 */
export function flexRender<TProps extends object>(
  Comp: Renderable<TProps>,
  props: TProps
): React.ReactNode | JSX.Element {
  return !Comp ? null : isReactComponent<TProps>(Comp) ? (
    <Comp {...props} />
  ) : (
    Comp
  );
}

function isReactComponent<TProps>(
  component: unknown
): component is React.ComponentType<TProps> {
  return (
    isClassComponent(component) ||
    typeof component === 'function' ||
    isExoticComponent(component)
  );
}

function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    })()
  );
}

function isExoticComponent(component: any) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description)
  );
}

export function useReactTableWithHiddenRows<TData extends RowData>(
  options: TableOptions<TData> & HiddenRowOptions
) {
  const { hiddenRowIds = [], ...restOptions } = options;

  // Use the original hook to get the table instance
  const table = useReactTable(restOptions);

  // Override the getRowModel method to filter out hidden rows
  const originalGetRowModel = table.getRowModel;
  table.getRowModel = () => filterHiddenRows(originalGetRowModel(), hiddenRowIds);

  return table;
}
