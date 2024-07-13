import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { CirclePlus } from 'lucide-react'

const AccoutPages = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Quản lý tài khoản nhân viên
        </CardDescription>
        <CardContent>
          <div className='flex items-center justify-between' >
            <div className='max-w-[60%] w-[60%]' >
              <Input className='fil' />
            </div>
            <Button className='bg-white' >
            <CirclePlus /> Tạo tài khoản
            </Button>
          </div>
          <div>
            <Table>
              <TableHeader>

              </TableHeader>
            </Table>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default AccoutPages
