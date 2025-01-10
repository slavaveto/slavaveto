'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeTranslations from "@/app/assets/locales/home";
import miscTranslations from "@/app/assets/locales/misc";

import aboutTranslations from "@/app/assets/locales/page_about";
import tg4gtTranslations from "@/app/assets/locales/page_tg4gt";
import supervisionTranslations from "@/app/assets/locales/page_supervision";

// Поддерживаемые языки
const supportedLanguages = ['ru', 'uk']; // Русский и Украинский

// Функция для определения языка устройства
const getDeviceLanguage = () => {
    if (typeof window !== 'undefined' && navigator.language) {
        return navigator.language.split('-')[0]; // Убираем региональную часть (например, 'ru-RU' → 'ru')
    }
    return null; // Возвращаем null, если navigator недоступен
};

// Определяем язык устройства
const deviceLanguage = getDeviceLanguage();

// Устанавливаем язык: сохранённый, язык устройства или язык по умолчанию
const defaultLanguage =
    deviceLanguage && supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'ru';

// Объединяем переводы в один ресурс
const resources = {
    ru: {
        home: homeTranslations.ru.translation,
        misc: miscTranslations.ru.translation,

        about: aboutTranslations.ru.translation,
        tg4gt: tg4gtTranslations.ru.translation,
        supervision: supervisionTranslations.ru.translation,
    },
    uk: {
        home: homeTranslations.uk.translation,
        misc: miscTranslations.uk.translation,

        about: aboutTranslations.uk.translation,
        tg4gt: tg4gtTranslations.uk.translation,
        supervision: supervisionTranslations.uk.translation,
    },


};

// Инициализация i18n
i18n
    .use(initReactI18next)
    .init({
        resources, // Используем объединённые переводы
        lng: defaultLanguage,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
    });

// Логируем текущий язык и язык устройства
if (typeof window !== 'undefined') {
    //console.log(`Язык устройства: ${deviceLanguage || 'Не удалось определить'}`);
    //console.log(`Установленный язык: ${defaultLanguage}`);
}

export default i18n;
