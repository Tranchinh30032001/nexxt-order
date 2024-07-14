'use client'

import React, { useEffect } from 'react'
import { useBoundStore } from '@/core/zustand'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAccessToken } from '@/utils/common'

const navItems = [
  {
    name: 'Món ăn',
    link: '/dish'
  },
  {
    name: 'Đơn hàng',
    link: '/orders'
  },
  {
    name: 'Quản lý',
    link: '/dashboard',
    authRequired: true
  },
  {
    name: 'Accounts',
    link: '/accounts',
    authRequired: true
  }
]

export const Navbar = () => {
  const isAuth = useBoundStore((state) => state.isAuth)
  const setIsAuth = useBoundStore((state) => state.setIsAuth)
  const pathname = usePathname()

  useEffect(() => {
    const isLogin = Boolean(getAccessToken())
    setIsAuth(isLogin)
  }, [pathname])

  return (
    <nav className='space-x-3' >
      {
        navItems.map((item, index) => {
          return (
            <Link key={index} href={item.link} className={cn({
              'hidden': item.authRequired === false && isAuth || item.authRequired === true && !isAuth
            })} >
              {item.name}
            </Link>
          )
        })
      }
    </nav>
  )
}
