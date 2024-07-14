import { Button } from "@/components/ui/button"
import { AccountType } from "@/schema/account"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"

export const initialColumns: ColumnDef<AccountType>[] = [
  {
  header: "ID",
  cell: ({ row }) => row.index,
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => (
      <Image src={row.getValue('avatar')}  alt={'avatar'} width={100} height={100} />
    ),
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    )
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
]
