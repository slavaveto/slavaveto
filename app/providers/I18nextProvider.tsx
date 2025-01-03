'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from "@/app/assets/locales"; // Импортируем переводы

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

// Устанавливаем язык: язык устройства или язык по умолчанию
const defaultLanguage =
    deviceLanguage && supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'ru';

// Инициализация i18n
i18n
    .use(initReactI18next)
    .init({
        resources, // Используем импортированные переводы
        lng: defaultLanguage,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
    });

// Логируем текущий язык и язык устройства
// Логируем текущий язык и язык устройства
if (typeof window !== 'undefined') {
    console.log(`Язык устройства: ${deviceLanguage || 'Не удалось определить'}`);
    console.log(`Установленный язык: ${defaultLanguage}`);
}


export default i18n;
