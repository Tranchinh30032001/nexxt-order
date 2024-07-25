import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest } from 'next/server'


export let defaultLocale = 'en'
export let supportedLocales = ['en', 'vi']

type NegotiatorHeader = {
  [key: string]: string
}

export function getLocale (request: NextRequest) {
    const negotiatorHeader: NegotiatorHeader = {}
    request.headers.forEach((value, key) => { (negotiatorHeader[key] = value) })
    const languages = new Negotiator({ headers: negotiatorHeader }).languages()
    const locale = matchLocale(languages, supportedLocales, defaultLocale)

    return locale
  }
