import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import EN from '@/assets/locales/en/translation.json'
import VI from '@/assets/locales/vi/translation.json'

const fallbackLng = 'vi'

const resources = {
    en: {
        translation: EN,
    },
    vi: {
        translation: VI,
    },
}

const i18n = i18next.createInstance()

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n