import { accountApiRequest } from '@/configs/apiUrl/authApi'
import { cookies } from 'next/headers'
import React from 'react'

const DashBoardPage = async () => {

  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!

  return (
    <div>DashBoardPage</div>
  )
}

export default DashBoardPage
