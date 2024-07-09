'use client'

import React, { useEffect } from 'react'
import { useBoundStore } from '@/core/zustand'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Cookies from 'js-cookie'

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
  }
]

export const Navbar = () => {
  const isAuth = useBoundStore((state) => state.isAuth)
  const setIsAuth = useBoundStore((state) => state.setIsAuth)

  useEffect(() => {
    const isLogin = Boolean(Cookies.get('isLogin')!)
    setIsAuth(isLogin)
  }, [])

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
