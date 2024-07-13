"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DepartmentColumn = {
  id: string
  department_code: string,
  prefecture: string,
  abbreviation: string,
  phone: string,
}

export const initialColumns: ColumnDef<DepartmentColumn>[] = [
  {
    accessorKey: "department_code",
    header: "物件番号",
  },
  {
    accessorKey: "prefecture",
    header: "都道府県",
  },
  {
    accessorKey: "abbreviation",
    header: "請負区分",
  },
  {
    accessorKey: "phone",
    header: 'Phone'
  },
]
