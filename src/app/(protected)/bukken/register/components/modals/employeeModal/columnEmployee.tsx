"use client"

import { ColumnDef } from "@tanstack/react-table"

export type EmployeeColumn = {
  id: string
  department_code: string,
  department_name: string,
  mail: string,
  phone: string,
}

export const initialColumns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "department_code",
    header: "物件番号",
  },
  {
    accessorKey: "department_name",
    header: "都道府県",
  },
  {
    accessorKey: "mail",
    header: "請負区分",
  },
  {
    accessorKey: "phone",
    header: 'Phone'
  },
]
