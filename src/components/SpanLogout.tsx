'use client'

import { useLogoutMutation } from '@/services/auth'
import { getRefreshToken, handleErrorApi } from '@/utils/common'
import { useRouter } from 'next/navigation'
import React from 'react'

const SpanLogout = () => {
  const router = useRouter()
  const refreshToken = getRefreshToken() as string
  const logoutMutation = useLogoutMutation()
  const handleLogout = async() => {
    if (logoutMutation.isPending) return
    try {
      await logoutMutation.mutateAsync({
        refreshToken
      })
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error,
      })
    }
  }
  return (
    <span onClick={handleLogout} >logout</span>
  )
}

export default SpanLogout
