'use client'

import { i18n, Locale } from '@/core/i18n/i18n.config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LocaleSwitcher = () => {
  const pathname = usePathname()

  const redirectPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
   <ul className='flex grap-x-3' >
    {
      i18n.locales.map((locale: Locale) =>{
        return (
          <li key={locale} >
            <Link
              href={redirectPathName(locale)}
              className='rounded-md border-2 p-2'
            >
              {locale}
            </Link>
          </li>
        )
      })
    }
   </ul>
  )
}

export default LocaleSwitcher
