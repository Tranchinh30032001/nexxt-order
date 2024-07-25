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
import { Locale } from '@/core/i18n/i18n.config'
import { getDictionary } from '@/lib/dictionaries'
import AccountContent from './AccountContent'

const AccoutPages = async ({ params: { lang }} : {
   params: { lang: Locale }
}) => {
  const { page } = await getDictionary(lang)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page.accounts.title}</CardTitle>
        <CardDescription>
          {page.accounts.description}
        </CardDescription>
        <CardContent>
          <div className='flex items-center justify-between mb-5' >
            {/* <div className='max-w-[60%] w-[60%]' >
              <Input placeholder='search name' onChange={(e) => {
                tableInstance.getColumn('name')?.setFilterValue(e.target.value)
              }} />
            </div> */}
            <Button className='bg-white' >
            <CirclePlus /> {page.accounts.createAccount}
            </Button>
          </div>
          <AccountContent />
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default AccoutPages
