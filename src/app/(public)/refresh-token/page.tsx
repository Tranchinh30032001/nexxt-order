'use client'

import { authApiRequest } from '@/configs/apiUrl/authApi'
import { setAccessToken, setRefreshToken } from '@/utils/common'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const RefreshTokenPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const destinationUrl = searchParams.get('redirect') as string
  const flagRefreshToken = useRef<boolean | Promise<any>>(false)

  const refreshToken = async() => {
    try {
      const  { payload } = await authApiRequest.refreshToken()
      const { accessToken, refreshToken } = payload.data
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      if(destinationUrl) {
        router.push(destinationUrl)
        return
      }
      router.push('/dashboard')
    } catch (error) {
      location.href = '/login?forceLogout=true'
    }
  }
  useEffect(() => {
    if (!flagRefreshToken.current) {
      flagRefreshToken.current = refreshToken().then(() => {
        flagRefreshToken.current = false
      })
    }
  }, [])

  return (
    <>
      refreshToken
    </>
  )
}

export default RefreshTokenPage
