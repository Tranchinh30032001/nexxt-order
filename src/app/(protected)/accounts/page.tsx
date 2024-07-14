'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from '@/components/ui/input'
import { CirclePlus } from 'lucide-react'
import TableContainer from '@/components/shared/TableContainer'
import { initialColumns } from './utils/columnData'
import useCustomTable from '@/hooks/useCustomTable'
import { useGetAccounts } from '@/services/accounts'

const AccoutPages = () => {
  const { data } = useGetAccounts()
  const { tableInstance, columns } = useCustomTable({ initialColumns, initialData: data ?? [], enableSorting: true })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Quản lý tài khoản nhân viên
        </CardDescription>
        <CardContent>
          <div className='flex items-center justify-between mb-5' >
            <div className='max-w-[60%] w-[60%]' >
              <Input placeholder='search name' onChange={(e) => {
                tableInstance.getColumn('name')?.setFilterValue(e.target.value)
              }} />
            </div>
            <Button className='bg-white' >
            <CirclePlus /> Tạo tài khoản
            </Button>
          </div>
          <TableContainer columns={columns} table={tableInstance} />
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default AccoutPages
