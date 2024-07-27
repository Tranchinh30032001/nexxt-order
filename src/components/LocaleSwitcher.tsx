'use client'

import React, { startTransition } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Locale, setUserLocale } from '@/lib/locale'
import { useLocale } from 'next-intl'

const LocaleSwitcher = () => {
  const locale = useLocale()

  const onSelectChange = (value: string) => {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="vi">VI</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher
