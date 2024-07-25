'use client'

import React, { useEffect, useState } from 'react'
import { useBoundStore } from '@/core/zustand'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { getAccessToken } from '@/utils/common'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/core/i18n/i18n.config'

const navItems = [
  {
    name: {
      en: 'Dish',
      vi: 'Món ăn'
    },
    link: '/dish'
  },
  {
    name: {
      en: 'Orders',
      vi: 'Đơn hàng'
    },
    link: '/orders'
  },
  {
    name: {
      en: 'Dashboard',
      vi: 'Quản lý'
    },
    link: '/dashboard',
    authRequired: true
  },
  {
    name: {
      en: 'Accounts',
      vi: 'Tài khoản'
    },
    link: '/accounts',
    authRequired: true
  }
]

export const Navbar = () => {
  const isAuth = useBoundStore((state) => state.isAuth)
  const setIsAuth = useBoundStore((state) => state.setIsAuth)
  const pathname = usePathname()
  const params = useParams()
  const lang = params.lang as Locale

  useEffect(() => {
    const isLogin = Boolean(getAccessToken())
    setIsAuth(isLogin)
  }, [pathname])

  return (
    <nav className='space-x-3' >
      {
        navItems.map((item, index) => {
          return (
            <Link key={index} href={item.link} prefetch={isAuth ? true : false} className={cn({
              'hidden': item.authRequired === false && isAuth || item.authRequired === true && !isAuth
            })} >
              {item.name[lang]}
            </Link>
          )
        })
      }
    </nav>
  )
}
