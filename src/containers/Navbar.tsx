// 'use client'

import { cn } from '@/lib/utils'
import { getAccessToken } from '@/utils/common'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
    name: 'Đăng nhập',
    link: '/login',
    authRequired: false
  },
  {
    name: 'Quản lý',
    link: '/dashboard',
    authRequired: true
  }
]

export const Navbar = () => {
  // const [isAuth, setIsAuth] = useState<Boolean>(false)

  // useEffect(() => {
  //   setIsAuth(Boolean(getAccessToken()))
  // }, [])

  const cookieStore = cookies()
  const isAuth = Boolean(cookieStore.get('accessToken'))

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
