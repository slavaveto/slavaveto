'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeTranslations from "@/app/assets/locales/home";

import {supabase} from "@/app/assets/supabaseClient";


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



// Функция для загрузки переводов из базы данных
const loadTranslationsFromDatabase = async () => {
    const { data, error } = await supabase
        .from('home') // Название таблицы с переводами
        .select('*');

    if (error) {
        console.error('Error loading translations:', error.message);
        return {}; // Возвращаем пустой объект в случае ошибки
    }

    // Преобразуем данные в нужный формат
    const translations = supportedLanguages.reduce((acc: any, lang: string) => {
        acc[lang] = {
            home: data.reduce((langAcc: any, row: any) => {
                langAcc[row.item_id] = row[lang]; // Используем язык как ключ
                return langAcc;
            }, {}),
        };
        return acc;
    }, {});

    return translations; // Возвращаем переводы
};



/// Инициализация i18n
const initI18n = async () => {
    const resources = await loadTranslationsFromDatabase();

    i18n
        .use(initReactI18next)
        .init({
            resources, // Используем переводы из базы
            lng: defaultLanguage,
            fallbackLng: 'ru',
            interpolation: {
                escapeValue: false,
            },
        });
};

// Запускаем инициализацию
initI18n().catch((err) => console.error('Error initializing i18n:', err));

export default i18n;
