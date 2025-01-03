'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supabase } from '@/app/assets/supabaseClient';

const supportedLanguages = ['ru', 'uk']; // Список поддерживаемых языков

// Функция для определения языка устройства
const getDeviceLanguage = () => {
    if (typeof window !== 'undefined' && navigator.language) {
        return navigator.language.split('-')[0]; // Убираем региональную часть (например, 'ru-RU' → 'ru')
    }
    return null;
};

// Определение языка устройства
const deviceLanguage = getDeviceLanguage();

// Получение сохранённого языка из localStorage
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

// Установка языка: сохранённый язык, язык устройства или по умолчанию
const defaultLanguage =
    (savedLanguage && supportedLanguages.includes(savedLanguage)
        ? savedLanguage
        : deviceLanguage) || 'ru'; // Гарантируем, что язык всегда строка

// Функция для загрузки переводов из базы данных
const fetchTranslations = async (language: string) => {
    try {
        const { data, error } = await supabase
            .from('home_content')
            .select('title, subtitle')
            .eq('language', language);

        if (error) throw error;

        const translations: Record<string, string> = {};
        console.log('Полученные переводы:', data);

        data.forEach((row: { title: string; subtitle: string }) => {
            translations.title = row.title;
            translations.subtitle = row.subtitle;
        });

        return translations;
    } catch (err) {
        console.error('Ошибка загрузки переводов:', err);
        return {};
    }
};

// Асинхронная инициализация i18n
const initializeI18n = async () => {
    const translations = await fetchTranslations(defaultLanguage);

    i18n.use(initReactI18next).init({
        lng: defaultLanguage,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            [defaultLanguage]: {
                translation: translations,
            },
        },
    });

    // Логируем установленные переводы
    console.log('Инициализация i18n завершена:', i18n.language, translations);
};

// Запуск инициализации
initializeI18n();

// Событие при смене языка
i18n.on('languageChanged', async (lng) => {
    const translations = await fetchTranslations(lng);
    i18n.addResources(lng, 'translation', translations);

    // Логируем смену языка
    console.log(`Язык изменён на: ${lng}`);
    console.log('Обновлённые переводы:', translations);
});

// Экспорт настроенного i18n
export default i18n;
