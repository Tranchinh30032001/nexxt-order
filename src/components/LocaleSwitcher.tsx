'use client'

import React, { startTransition, useTransition } from 'react'

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
import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18n'

const LocaleSwitcher = () => {
  const locale = useLocale()
  const t = useTranslations('Language')

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
          <SelectLabel>{t('language')}</SelectLabel>
          { locales.map((cur) => {
            return (
              <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur })}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher
