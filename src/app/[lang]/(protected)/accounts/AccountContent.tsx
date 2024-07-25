'use client'

import React, { useEffect, useState } from 'react'

import { initialColumns } from './utils/columnData'
import { useGetAccounts } from '@/services/accounts'
import useCustomTable from '@/hooks/useCustomTable'
import TableContainer from '@/components/shared/TableContainer'
import { useParams } from 'next/navigation'
import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/core/i18n/i18n.config'

type I18nAccounts = {
  createAccount: string,
  description: string,
  title: string
}

const AccountContent = () => {
  const { data } = useGetAccounts()
  const { tableInstance, columns } = useCustomTable({ initialColumns, initialData: data ?? [], enableSorting: true })

  return (
    <TableContainer columns={columns} table={tableInstance} />
  )
}

export default AccountContent
