import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AccountContent from './AccountContent'
import { getTranslations } from 'next-intl/server';

const AccoutPages = async () => {
  const t =  await getTranslations('AccountPage');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
        <AccountContent />
      </CardHeader>
    </Card>
  )
}

export default AccoutPages
