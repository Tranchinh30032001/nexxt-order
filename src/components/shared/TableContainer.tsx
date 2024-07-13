import React from 'react'

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ColumnDef, flexRender, Table } from '@tanstack/react-table';
import { FormType } from '@/app/(protected)/bukken/register/components/bukkenSchema';
import { valueProps } from './MyDialog';

type propsTable<TData> = {
  table: Table<TData>
  columns: ColumnDef<TData>[]
  field: keyof FormType,
  keyName: string,
  keyUuid: string,
  onChangeValue: (object: valueProps) => void
}

const TableContainer = <TData extends {}>({ table, columns, field, keyName, keyUuid, onChangeValue}: propsTable<TData>) => {

  return (
    <UITable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  onChangeValue({
                    uuid: (row.original as any)[keyUuid],
                    name: (row.original as any)[keyName]
                  })
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UITable>
  )
}

export default TableContainer
