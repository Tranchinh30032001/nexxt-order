// import 'server-only'

import type { Locale } from '@/core/i18n/i18n.config'
import EN from '@/core/i18n/dictionaries/en.json'
import VI from '@/core/i18n/dictionaries/vn.json'

// const dictionatires = {
//   en: () => import('@/core/i18n/dictionaries/en.json').then(module => module.default),
//   vi: () => import('@/core/i18n/dictionaries/vn.json').then(module => module.default),
// }
// export const getDictionary = async (lang: Locale) => dictionatires[lang]()

const dictionatires = {
  en: EN,
  vi: VI,
}

export const getDictionary = async (lang: Locale) => dictionatires[lang]
