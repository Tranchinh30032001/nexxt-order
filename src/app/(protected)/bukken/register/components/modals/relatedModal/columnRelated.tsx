"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type RelatedModal = {
  id: string
  bukken_class_name: string,
  bukken_name: string,
  parent_bukken_name: string,
  bukken_num: string,
}

export const initialColumns: ColumnDef<RelatedModal>[] = [
  {
    id: "bukken_class_name",
    accessorKey: "bukken_class_name",
    header: "物件番号",
  },
  {
    accessorKey: "bukken_name",
    header: "都道府県",
  },
  {
    accessorKey: "parent_bukken_name",
    header: "請負区分",
  },
  {
    accessorKey: "bukken_num",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        </Button>
      )
    },
  },
]
