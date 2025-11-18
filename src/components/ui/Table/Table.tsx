/**
 * Table Component
 * Data table for operational metrics and reporting
 * Designed for oil & gas industry data visualization
 */

import React from 'react';
import {
  TableContainer,
  TableElement,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from './Table.styles';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  'data-testid'?: string;
}

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyText = 'No data available',
  size = 'md',
  striped = true,
  hoverable = true,
  className,
  'data-testid': testId,
}: TableProps<T>) => {
  const renderCell = (
    column: TableColumn<T>,
    record: T,
    index: number
  ): React.ReactNode => {
    const value = column.dataIndex
      ? record[column.dataIndex]
      : record[column.key];

    if (column.render) {
      return column.render(value, record, index);
    }

    // Convert unknown value to ReactNode
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  };

  return (
    <TableContainer className={className} data-testid={testId}>
      <TableElement size={size} striped={striped} hoverable={hoverable}>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableHeader
                key={column.key}
                width={column.width}
                align={column.align}
                sortable={column.sortable}
              >
                {column.title}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            data.map((record, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell key={column.key} align={column.align}>
                    {renderCell(column, record, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </TableElement>
    </TableContainer>
  );
};

export default Table;
